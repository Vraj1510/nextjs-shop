import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { createOrder, updateGameQuantity } from './../../../libs/apis';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

import sanityClient from '@/libs/sanity';
import { Game, GameSubset } from '@/models/game';

export async function POST(req: Request) {
  const { cartItems, userEmail } = await req.json();
  const origin = req.headers.get('origin');

  const updatedItems: GameSubset[] = (await fetchAndCalculateItemPricesAndQuantity(
    cartItems,
  )) as GameSubset[];
  // return NextResponse.json(updatedItems, { status: 200 });

  // Try to uncomment and use the Stripe checkout code if needed
  try {
    let totalprice = 0; // Initialize totalprice correctly

    updatedItems.forEach((item) => {
      totalprice += parseInt((item.price * 100).toString()) * item.quantity;
    });
    const session = await stripe.checkout.sessions.create({
      // line_items: updatedItems.map((item) => ({
      //   quantity: item.quantity,
      //   adjustable_quantity: {
      //     enabled: true,
      //     maximum: item.maxQuantity,
      //     minimum: 1,
      //   },
      //   price_data: {
      //     currency: 'usd',
      //     product_data: {
      //       name: item.name,
      //       images: [item.images[0].url],
      //     },
      //     unit_amount: parseInt((item.price * 100).toString()),
      //   },
      // })),
      line_items: updatedItems.map((item) => {
        const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
          quantity: item.quantity,
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item.images[0].url],
            },
            unit_amount: parseInt((item.price * 100).toString()),
          },
        };

        // Add adjustable_quantity only if maxQuantity is greater than 1
        if (item.maxQuantity > 1) {
          lineItem.adjustable_quantity = {
            enabled: true,
            maximum: item.maxQuantity,
            minimum: 1,
          };
        }

        return lineItem;
      }),
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      mode: 'payment',
      success_url: `${origin}/?success=true`,
      phone_number_collection: { enabled: true },
    });

    await updateGameQuantity(updatedItems);

    await createOrder(updatedItems, userEmail, totalprice);

    return NextResponse.json(session, {
      status: 200,
      statusText: 'payment successful',
    });
  } catch (error: any) {
    console.log('ERROR ', error);
    return new NextResponse(error, { status: 500 });
  }
}

async function fetchAndCalculateItemPricesAndQuantity(cartItems: Game[]) {
  const query = `*[_type == "game" && _id in $itemIds] {
    _id,
    name,
    price,
    quantity,
    images
  }`;

  try {
    const itemIds = cartItems.map((item) => item._id);

    // Correctly pass the parameters to the fetch function
    const sanityItems: GameSubset[] = await sanityClient.fetch(query, { itemIds });

    console.log(sanityItems);

    const updatedItems: GameSubset[] = sanityItems.map((item) => ({
      ...item,
      maxQuantity: item.quantity,
    }));

    if (checkQuantitiesAgainstSanity(cartItems, updatedItems)) {
      return new NextResponse('Quantity has been updated, please update your cart', {
        status: 500,
      });
    }

    // Calculate prices
    const calculatedItemPrices: GameSubset[] = updatedItems.map((item) => {
      const cartItem = cartItems.find((cartItem) => cartItem._id === item._id);

      return {
        _id: item._id,
        name: item.name,
        images: item.images,
        quantity: cartItem?.quantity as number,
        maxQuantity: item.quantity,
        price: item.price,
      };
    });

    return calculatedItemPrices;
  } catch (error) {
    console.error('Error fetching items from Sanity:', error);
    return new NextResponse('Error fetching items from Sanity', { status: 500 });
  }
}

function checkQuantitiesAgainstSanity(cartItems: Game[], sanityItems: GameSubset[]) {
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const sanityItem = sanityItems.find((item) => item._id === cartItem._id);

    if (sanityItem && cartItem.quantity > sanityItem.quantity) {
      return true;
    }
  }

  return false;
}
