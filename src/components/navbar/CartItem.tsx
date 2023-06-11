'use client';

import CartContext from '@/context/cartContext';
import { fetchCartTotal } from '@/utils/api/fetchCartTotal';
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
      const resCartTotal = await fetchCartTotal(res.cart);

      setTotalPrice(resCartTotal.finalPrice);
      setTotalCost(resCartTotal.total_cost);
      setTotalCostEthereum(resCartTotal.total_cost_ethereum);
      setMaticCost(resCartTotal.maticCost);
      setTotalCompareCost(resCartTotal.total_compare_cost);
      setTaxEstimate(resCartTotal.tax_estimate);
      setShippingEstimate(resCartTotal.shipping_estimate);
    } else {
      let cart = [];

      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      // Filter out the item to be removed
      const newCart = cart.filter((item) => item?.course.id !== id);

      // Store updated cart back in localStorage
      localStorage.setItem('cart', JSON.stringify(newCart));
      setCartItems(newCart);
      setTotalItems(newCart.length);
      const resCartTotal = await fetchCartTotal(newCart);

      setTotalPrice(resCartTotal.finalPrice);
      setTotalCost(resCartTotal.total_cost);
      setTotalCostEthereum(resCartTotal.total_cost_ethereum);
      setMaticCost(resCartTotal.maticCost);
      setTotalCompareCost(resCartTotal.total_compare_cost);
      setTaxEstimate(resCartTotal.tax_estimate);
      setShippingEstimate(resCartTotal.shipping_estimate);
    }
  };

  return (
    <li className="flex py-6">
      <div className="flex-shrink-0">
        <img
          src={item?.course?.thumbnail}
          alt=""
          className="h-9 w-auto rounded-md object-cover object-center  sm:w-auto"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col sm:ml-6">
        <div>
          <div className="flex justify-between">
            <h4 className="text-sm">
              <Link
                href={`/courses/${item?.course?.slug}`}
                className="font-semibold text-gray-700 hover:text-gray-800"
              >
                {item?.course?.title}
              </Link>
            </h4>
            <p className="ml-4 text-sm font-medium text-gray-900">
              S/{' '}
              {discountedPrice ? (
                <span>
                  <del>{item?.course?.price}</del> {discountedPrice.toFixed(2)}
                </span>
              ) : (
                item?.course?.price
              )}
            </p>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-500">{item?.course?.category}</p>
          <p className="mt-1 text-sm text-gray-500">{item?.course?.short_description}</p>
        </div>

        <div className="mt-4 flex flex-1 items-end justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            {item?.course?.best_seller ? (
              <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                Best Seller
              </span>
            ) : (
              <div />
            )}

            {/* <span>
                        {tier.inStock ? 'In stock' : `Will ship in ${product.leadTime}`}
                      </span> */}
          </div>
          <div className="ml-4">
            <button
              onClick={() => {
                handleRemoveItem(item?.course?.id, 'Course');
              }}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
