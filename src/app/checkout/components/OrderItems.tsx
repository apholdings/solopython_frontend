'use client';

import CartItem from '@/components/navbar/CartItem';
import CartContext from '@/context/cartContext';
import { fetchClearCart } from '@/utils/api/clearCart';
import { fetchCartItems } from '@/utils/api/fetchCartItems';
import { fetchCartTotal } from '@/utils/api/fetchCartTotal';
import { useSession } from 'next-auth/react';
import { useContext, useEffect } from 'react';

export default function OrderItems() {
  const { data: session } = useSession();

  const {
    items,
    totalItems,
    totalPrice,
    totalCost,
    totalCostEthereum,
    maticCost,
    totalCompareCost,
    taxEstimate,
    shippingEstimate,
    setCartItems,
    setTotalItems,
    setTotalPrice,
    setTotalCost,
    setTotalCostEthereum,
    setMaticCost,
    setTotalCompareCost,
    setTaxEstimate,
    setShippingEstimate,
  } = useContext(CartContext);

  const handleClearCart = async () => {
    if (session?.user) {
      await fetchClearCart(session);
    } else {
      // Remove cart items from local storage for anonymous users
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cart');
      localStorage.removeItem('totalItems');
    }
    setCartItems([]);
    setTotalItems(0);
    setTotalPrice(0);
    setTotalCost(0);
    setTotalCostEthereum(0);
    setMaticCost(0);
    setTotalCompareCost(0);
    setTaxEstimate(0);
    setShippingEstimate(0);
  };

  useEffect(() => {
    if (session) {
      fetchCartItems(session)
        .then((cartItems) => {
          setCartItems(cartItems.cart);
          setTotalItems(cartItems.total_items);
        })
        .catch((error) => console.error('Error fetching cart items:', error));
    }
  }, [session, setCartItems, setTotalItems]);

  useEffect(() => {
    if (items.length > 0) {
      fetchCartTotal(items)
        .then((cartTotal) => {
          setTotalPrice(cartTotal.finalPrice);
          setTotalCost(cartTotal.total_cost);
          setTotalCostEthereum(cartTotal.total_cost_ethereum);
          setMaticCost(cartTotal.maticCost);
          setTotalCompareCost(cartTotal.total_compare_cost);
          setTaxEstimate(cartTotal.tax_estimate);
          setShippingEstimate(cartTotal.shipping_estimate);
        })
        .catch((error) => console.error('Error fetching cart items:', error));
    }
  }, [
    items,
    setTotalPrice,
    setTotalCost,
    setTotalCostEthereum,
    setMaticCost,
    setTotalCompareCost,
    setTaxEstimate,
    setShippingEstimate,
  ]);

  return (
    <>
      {items.length > 0 ? (
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {items.map((item, idx) => (
              <CartItem item={item} key={idx} />
            ))}
          </ul>
        </div>
      ) : (
        <div className="my-4 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 dark:text-dark-txt"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
            No hay productos
          </p>
        </div>
      )}
    </>
  );
}
