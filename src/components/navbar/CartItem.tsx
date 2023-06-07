'use client';

import CartContext from '@/context/cartContext';
import { removeFromCart } from '@/utils/api/removeFromCart';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext } from 'react';

export default function CartItem({ item }) {
  const { data: session } = useSession();

  let discountedPrice;

  if (item?.coupon?.fixed_price_coupon) {
    discountedPrice = item?.course?.price - item?.coupon?.fixed_price_coupon.discount_price;
  }

  if (item?.coupon?.percentage_coupon) {
    const discount =
      (item?.coupon?.percentage_coupon.discount_percentage / 100) * item?.course?.price;
    discountedPrice = item?.course?.price - discount;
  }

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

  const handleRemoveItem = async (id, type) => {
    if (session?.user) {
      const res = await removeFromCart(session, id, type);
      setCartItems(res.cart);
      setTotalItems(res.total_items);
    } else {
      let cart = [];

      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      // Filter out the item to be removed
      const newCart = cart.filter((item) => item.course.id !== id);

      // Store updated cart back in localStorage
      localStorage.setItem('cart', JSON.stringify(newCart));
      setCartItems(newCart);
      setTotalItems(newCart.length);
    }
  };

  return (
    <li key={item.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.course.thumbnail}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={item.course.slug}>{item.course.title}</Link>
            </h3>
            <p className="ml-4">
              ${' '}
              {discountedPrice ? (
                <span>
                  <del>{item?.course?.price}</del> {discountedPrice.toFixed(2)}
                </span>
              ) : (
                item?.course?.price
              )}
            </p>
          </div>
          {item?.coupon && <p className="mt-1 text-sm text-gray-500">Coupon: {item.coupon.name}</p>}
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          {/* <p className="text-gray-500">Qty {item.quantity}</p> */}

          <div className="flex">
            <button
              type="button"
              onClick={() => {
                handleRemoveItem(item.course.id, 'Course');
              }}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
