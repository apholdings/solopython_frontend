'use client';

import CouponContext from '@/context/couponContext';
import { ICourseDetail } from '@/interfaces/courses/CourseDetail';
import { useContext } from 'react';

interface PageProps {
  course: ICourseDetail;
}

export default function CoursePrice({ course }: PageProps) {
  const { id, name, user, fixedPriceCoupon, percentageCoupon, contentType, objectId, uses } =
    useContext(CouponContext);

  let discountedPrice;

  if (fixedPriceCoupon) {
    discountedPrice = course.price - fixedPriceCoupon.discount_price;
  }

  if (percentageCoupon) {
    const discount = (percentageCoupon.discount_percentage / 100) * course.price;
    discountedPrice = course.price - discount;
  }

  return (
    <p className=" items-center">
      Price:{' '}
      {discountedPrice ? (
        <span>
          <del>{course?.price}</del> {discountedPrice.toFixed(2)}
        </span>
      ) : (
        course?.price
      )}
      {name && (
        <span className="ml-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          {name}
        </span>
      )}
    </p>
  );
}
