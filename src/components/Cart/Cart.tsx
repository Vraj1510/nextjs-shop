'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { removeItemFromCart, toggleCart } from '@/redux/features/cartSlice';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Game } from '@/models/game';
import { RiCloseLine } from 'react-icons/ri';
import useCartTotals from '@/hooks/useCartTotal';
import { getStripe } from '@/libs/loadStripe';
import axios from 'axios';
import { useSession } from 'next-auth/react';
const Cart: FC = () => {
  const dispatch = useAppDispatch();
  const { showCart, cartItems } = useAppSelector((state) => state.cart);
  const handleRemoveItem = (id: string) => dispatch(removeItemFromCart({ _id: id }));
  const [renderComponent, setRenderComponent] = useState(false);
const { data: session } = useSession();
  const { totalPrice } = useCartTotals();
  const checkOutHandler = async () => {
    const stripe = await getStripe();

    const { data } = await axios.post('/api/stripe', {
      cartItems,
      userEmail: session?.user?.email,
    });

    if (!data) return;

    localStorage.removeItem('cart');

    stripe.redirectToCheckout({ sessionId: data.id });
  };
  useEffect(() => {
    setRenderComponent(true);
  }, []);
  if (!renderComponent) return <></>;
  return (
    <div className={`${classNames.container} ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className={classNames.header}>
        <h2 className={classNames.title}>Shopping Cart</h2>
        <button
          className={classNames.closeBtn}
          onClick={() => {
            dispatch(toggleCart());
          }}
        >
          x
        </button>
      </div>
      <div className={classNames.itemContainer}>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item: Game) => (
            <div key={item._id} className={cartItemClassNames.container}>
              <Image width={100} height={100} src={item.images[0].url} alt={item.name}></Image>
              <div className={cartItemClassNames.details}>
                <h3 className={cartItemClassNames.name}>{item.name}</h3>
                <p className={cartItemClassNames.price}>${item.price.toFixed(2)}</p>
              </div>
              <div className={cartItemClassNames.quantityContainer}>
                <span className={cartItemClassNames.quantity}>{item.quantity}</span>
                <button
                  onClick={() => {
                    handleRemoveItem(item._id);
                  }}
                  className={cartItemClassNames.removeButton}
                >
                  <RiCloseLine></RiCloseLine>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your Cart Is Empty</p>
        )}
      </div>
      <div className={classNames.subtotalContainer}>
        <span className={classNames.subtotalText}>SubTotal</span>
        <span className={classNames.subtotalPrice}>$ {totalPrice}</span>
      </div>
      <div
        onClick={() => {
          checkOutHandler();
        }}
        className={classNames.checkoutBtn}
      >
        Checkout
      </div>
    </div>
  );
};
const classNames = {
  container:
    'fixed top-0 right-0 z-50 h-screen w-4/5 md:w-1/3 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
  header: 'px-4 py-2 bg-gray-200 flex items-center justify-between',
  title: 'text-lg font-semibold',
  closeBtn: 'text-gray-600 text-2xl hover:text-gray-800',
  itemContainer: 'p-4 flex flex-col items-center',
  subtotalContainer: 'px-4 mx-2 rounded-md py-3 bg-gray-200 flex items-center justify-between',
  subtotalText: 'text-gray-600',
  subtotalPrice: 'font-semibold',
  checkoutBtn: 'text-center text-xl mx-16 hover:cursor-pointer rounded-md py-2 bg-blue-500 text-white mt-4',
};

const cartItemClassNames = {
  container: 'flex items-center w-full py-2 border-b',
  image: 'w-12 h-12 object-cover mr-4',
  details: 'flex-1 ml-2',
  name: 'text-sm md:text-base font-medium',
  price: 'text-gray-600',
  quantityContainer: 'flex items-center',
  quantity: 'px-2',
  removeButton: 'w-6 h-6 bg-gray-200 text-gray-600 flex items-center justify-center rounded ml-2',
};

export default Cart;
