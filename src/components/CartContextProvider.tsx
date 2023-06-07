'use client';

import { ReactNode, useEffect, useState } from 'react';
import CartContext from '@/context/cartContext';

interface Props {
  children: ReactNode;
}

export default function CartContextProvider({ children }: Props) {
  const [items, setCartItems] = useState<ICartItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalCostEthereum, setTotalCostEthereum] = useState<number>(0);
  const [maticCost, setMaticCost] = useState<number>(0);
  const [totalCompareCost, setTotalCompareCost] = useState<number>(0);
  const [taxEstimate, setTaxEstimate] = useState<number>(0);
  const [shippingEstimate, setShippingEstimate] = useState<number>(0);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [referrer, setReferrer] = useState<string | null>(null);

  useEffect(() => {
    // This useEffect will only run once, when the component is first mounted,
    // because its dependency array is empty.
    const localCartData = localStorage.getItem('cart');
    const localTotalItemsData = localStorage.getItem('totalItems');
    setCartItems(localCartData ? JSON.parse(localCartData) : []);
    setTotalItems(localTotalItemsData ? JSON.parse(localTotalItemsData) : 0);
  }, []);

  useEffect(() => {
    // This useEffect will run whenever 'items' or 'totalItems' changes.
    localStorage.setItem('cart', JSON.stringify(items));
    localStorage.setItem('totalItems', JSON.stringify(totalItems));
  }, [items, totalItems]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        totalCost,
        totalCostEthereum,
        maticCost,
        totalCompareCost,
        taxEstimate,
        shippingEstimate,
        coupon,
        referrer,
        setCartItems,
        setTotalItems,
        setTotalPrice,
        setTotalCost,
        setTotalCostEthereum,
        setMaticCost,
        setTotalCompareCost,
        setTaxEstimate,
        setShippingEstimate,
        setCoupon,
        setReferrer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
