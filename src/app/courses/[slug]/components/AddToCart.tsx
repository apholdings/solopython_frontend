'use client';

import { useContext } from 'react';
import CartContext from '@/context/cartContext';
import { useSession } from 'next-auth/react';
import { addToCart } from '@/utils/api/addToCart';
import CouponContext from '@/context/couponContext';

export default function AddToCart({ course }) {
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

  // const courseExistsInCart = items && items.some((u) => u.course && u.course.includes(course?.id));

  async function handleAddToCart(e) {
    e.preventDefault();

    if (session?.user) {
      try {
        const res = await addToCart(
          session,
          course?.id,
          'Course',
          coupon, // Create Coupon Context
          null,
          null,
          null,
          null,
          null,
          null,
          null, // Create Referrer Context
        );

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
      const exists = cart.find((item) => item.course.id === course?.id);
      if (!exists) {
        const newItem = {
          course: {
            id: course?.id,
            title: course?.title,
            slug: course?.slug,
            short_description: course?.short_description,
            price: course?.price,
            thumbnail: course?.images[0].file,
          },
          type: 'Course',
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
      className="bg-blue-500 w-full mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Add to Cart
    </button>
  );
}
