import PaymentMethodContext from '@/context/paymentMethodContext';
import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

export default function PaymentMethodContextProvider({ children }: Props) {
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [value, setValue] = useState(null);
  const [status, setStatus] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardName: null,
    cardNumber: null,
    expirationDate: null,
    cvc: null,
  });

  return (
    <PaymentMethodContext.Provider
      value={{
        name,
        setName,
        image,
        setImage,
        value,
        setValue,
        cardDetails,
        setCardDetails,
        status,
        setStatus,
      }}
    >
      {children}
    </PaymentMethodContext.Provider>
  );
}
