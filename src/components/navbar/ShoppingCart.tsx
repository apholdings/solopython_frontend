'use client';

import { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import CartContext from '@/context/cartContext';
import { fetchCartItems } from '@/utils/api/fetchCartItems';
import Link from 'next/link';
import { removeFromCart } from '@/utils/api/removeFromCart';
import { fetchCartTotal } from '@/utils/api/fetchCartTotal';
import Button from '../Button';
import { fetchClearCart } from '@/utils/api/clearCart';
import CartItem from './CartItem';
import TierCartItem from './TierCartItem';

export default function ShoppingCart() {
  const [open, setOpen] = useState(false);
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
  }, []);

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
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="
        rounded-full
        hover:bg-gray-50
        border
        border-gray-100
        py-2 px-3.5
        text-sm
        font-bold
        flex
        relative
        "
      >
        <ShoppingCartIcon className="h-6 w-auto text-gray-400" />

        {totalItems > 0 && (
          <div
            className="
              absolute
              top-0
              right-0
              h-6
              w-6
              bg-red-600
              rounded-full
              flex
              items-center
              justify-center
              text-white
              text-xs
            "
          >
            {totalItems}
          </div>
        )}
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>

                          <div className="ml-3 flex h-7 items-center space-x-2">
                            {items?.length > 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm('Are you sure you want to clear your cart?')) {
                                    handleClearCart();
                                  }
                                }}
                                className="cursor-pointer text-sm font-medium dark:text-dark-accent text-iris-500 hover:text-iris-600"
                              >
                                Clear cart
                              </button>
                            )}
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {items.map((item, idx) => {
                                if (item.tier) {
                                  return <TierCartItem item={item} key={idx} />;
                                } else if (item.course) {
                                  return <CartItem item={item} key={idx} />;
                                }
                                // Add more conditions for other item types if needed
                                return null;
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>S/ {totalPrice}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Link
                            href="/checkout"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
                          >
                            Checkout
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or
                            <button
                              type="button"
                              className=" ml-1 font-medium text-blue-600 hover:text-blue-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
