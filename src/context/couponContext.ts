import React from 'react';

const CouponContext = React.createContext({
  id: null,
  name: null,
  user: null,
  fixedPriceCoupon: null,
  percentageCoupon: null,
  contentType: null,
  objectId: null,
  uses: null,
  setId: (id: string) => {},
  setName: (name: string) => {},
  setUser: (user: any) => {},
  setFixedPriceCoupon: (fixedPriceCoupon: any) => {},
  setPercentageCoupon: (percentageCoupon: any) => {},
  setContentType: (contentType: string) => {},
  setObjectId: (objectId: string) => {},
  setUses: (uses: number) => {},
});

export default CouponContext;
