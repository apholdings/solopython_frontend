'use client';

import Button from '@/components/Button';
import CartContext from '@/context/cartContext';
import PaymentMethodContext from '@/context/paymentMethodContext';
import Link from 'next/link';
import { useContext } from 'react';

export default function OrderSummary() {
  const { items, totalPrice, maticCost, totalCompareCost, taxEstimate, shippingEstimate } =
    useContext(CartContext);

  const { value, cardDetails } = useContext(PaymentMethodContext);
  const handlePayment = async () => {
    if (value.value === 'credit') {
      console.log('Credit Payment');
    }
    if (value.value === 'polygon') {
      console.log('Polygon Payment');
    }
  };

  return (
    <section
      aria-labelledby="summary-heading"
      className=" rounded-lg  px-4 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <p id="summary-heading" className="text-lg font-medium dark:text-dark-txt text-gray-900">
        Order summary
      </p>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm dark:text-dark-txt-secondary text-gray-600">SubTotal</dt>
          <dd className="text-sm font-medium dark:text-dark-txt text-gray-900">
            ${totalCompareCost}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-dark-border pt-4">
          <dt className="flex items-center text-sm dark:text-dark-txt-secondary text-gray-600">
            <span>Shipping estimate</span>
          </dt>
          <dd className="text-sm font-medium dark:text-dark-txt text-gray-900">
            ${shippingEstimate}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-dark-border pt-4">
          <dt className="flex text-sm dark:text-dark-txt-secondary text-gray-600">
            <span>Tax estimate</span>
          </dt>
          <dd className="text-sm font-medium dark:text-dark-txt text-gray-900">${taxEstimate}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-dark-border pt-4">
          <dt className="text-base font-medium dark:text-dark-txt text-gray-900">Order total</dt>
          <dd className="text-base font-medium dark:text-dark-txt text-gray-900">${totalPrice}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-dark-border pt-4">
          <dt className="text-base font-medium dark:text-dark-txt text-gray-900" />
          <dd className="text-base font-medium dark:text-dark-txt text-gray-900">
            MATIC {maticCost}
          </dd>
        </div>
      </dl>

      {value?.value === 'polygon' && (
        <div className="mt-6">
          {items && items.length > 0 ? (
            <Button
              onClick={() => {
                handlePayment();
              }}
              type="button"
            >
              Checkout
            </Button>
          ) : (
            <Button disabled type="button">
              Checkout
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
