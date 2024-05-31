'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from './storeHook';
import { Game } from '@/models/game';

interface CartTotals {
  totalPrice: number;
  totalQuantity: number;
}

const useCartTotals = (): CartTotals => {
  const [totals, setTotals] = useState<CartTotals>({
    totalPrice: 0,
    totalQuantity: 0,
  });

  const { cartItems } = useAppSelector((state) => state.cart);

  useEffect(() => {
    const calculateCartTotals = (): void => {
      let totalPrice = 0;
      let totalQuantity = 0;

      cartItems.forEach((item:Game) => {
        totalPrice += Number((item.price * item.quantity).toFixed(2));
        totalQuantity += item.quantity;
      });

      setTotals({ totalPrice, totalQuantity });
    };

    calculateCartTotals();
  }, [cartItems]);

  return totals;
};

export default useCartTotals;
