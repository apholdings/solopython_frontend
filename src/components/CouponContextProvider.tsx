import CouponContext from '@/context/couponContext';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

export default function CouponContextProvider({ children }: Props) {
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [user, setUser] = useState(null);
  const [fixedPriceCoupon, setFixedPriceCoupon] = useState(null);
  const [percentageCoupon, setPercentageCoupon] = useState(null);
  const [contentType, setContentType] = useState(null);
  const [objectId, setObjectId] = useState(null);
  const [uses, setUses] = useState(null);

  return (
    <CouponContext.Provider
      value={{
        id,
        name,
        user,
        fixedPriceCoupon,
        percentageCoupon,
        contentType,
        objectId,
        uses,
        setId,
        setName,
        setUser,
        setFixedPriceCoupon,
        setPercentageCoupon,
        setContentType,
        setObjectId,
        setUses,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}
