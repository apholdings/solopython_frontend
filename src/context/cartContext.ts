import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  totalCost: 0,
  totalCostEthereum: 0,
  maticCost: 0,
  totalCompareCost: 0,
  taxEstimate: 0,
  shippingEstimate: 0,
  coupon: null,
  referrer: null,
  setCartItems: (items: ICartItem[]) => {},
  setTotalItems: (total: number) => {},
  setTotalPrice: (price: number) => {},
  setTotalCost: (cost: number) => {},
  setTotalCostEthereum: (cost: number) => {},
  setMaticCost: (cost: number) => {},
  setTotalCompareCost: (cost: number) => {},
  setTaxEstimate: (tax: number) => {},
  setShippingEstimate: (shipping: number) => {},
  setCoupon: (coupon: string) => {},
  setReferrer: (referrer: string) => {},
});

export default CartContext;
