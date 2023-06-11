'use client';

import CartContext from '@/context/cartContext';
import CouponContext from '@/context/couponContext';
import { ITier } from '@/interfaces/tiers/Tier';
import { addToCart } from '@/utils/api/addToCart';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface ComponentProps {
  tier: ITier;
}

export default function AddToCart({ tier }: ComponentProps) {
  const { data: session } = useSession();

  const { items, totalItems, setCartItems, setTotalItems } = useContext(CartContext);
  const { id, name, user, fixedPriceCoupon, percentageCoupon, contentType, objectId, uses } =
    useContext(CouponContext);

  const coupon = {
    id,
    name,
    fixedPriceCoupon,
    percentageCoupon,
    uses,
    objectId,
    contentType,
  };

  async function handleAddToCart(e) {
    e.preventDefault();

    if (session?.user) {
      try {
        const res = await addToCart(
          session,
          tier?.id,
          'Tier',
          coupon, // Create Coupon Context
          null,
          null,
          null,
          null,
          null,
          null,
          null, // Create Referrer Context
        );

        console.log(res);

        setCartItems(res.cart);
        setTotalItems(res.total_items);
        // Update the context with the new cart data here
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      let cart = [];

      // Retrieve cart from localStorage
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      // Add course to cart if it's not already there
      const exists = cart.find((item: any) => item.tier.id === tier?.id);
      if (!exists) {
        const newItem = {
          tier: {
            id: tier?.id,
            title: tier?.title,
            slug: tier?.slug,
            short_description: tier?.description,
            price: tier?.transaction_amount,
            thumbnail: tier?.thumbnail,
          },
          type: 'Tier',
          coupon,
          referrer: '',
        };
        cart.push(newItem);
      }

      // Store updated cart back in localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      setCartItems(cart);
      setTotalItems(cart.length);
    }
  }

  return (
    <button
      onClick={(e) => {
        handleAddToCart(e);
      }}
      className={classNames(
        tier.mostPopular
          ? 'bg-blue-500 hover:bg-blue-600 text-white border-2 border-blue-500 hover:border-blue-500'
          : 'border-2 border-gray-900',
        'transition duration-300 ease-in-out scale-100 hover:scale-105 w-full mt-6 block rounded-lg py-3 px-3 text-center text-lg font-circular-bold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
      )}
    >
      Start for Free
    </button>
  );
}
