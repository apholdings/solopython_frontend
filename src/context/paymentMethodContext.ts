import React from 'react';

const PaymentMethodContext = React.createContext({
  name: null,
  image: null,
  value: null,
  status: null,
  cardDetails: {
    cardName: null,
    cardNumber: null,
    expirationDate: null,
    cvc: null,
  },
  setName: (name: string) => {},
  setImage: (image: string) => {},
  setValue: (value: string) => {},
  setStatus: (status: boolean) => {},
  setCardDetails: (details: object) => {},
});

export default PaymentMethodContext;
