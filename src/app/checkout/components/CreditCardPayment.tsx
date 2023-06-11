'use client';

import { ToastSuccess } from '@/components/toast/ToastSuccess';
import CartContext from '@/context/cartContext';
import PaymentMethodContext from '@/context/paymentMethodContext';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import StatusBrick from './StatusBrick';
import { fetchCartTotal } from '@/utils/api/fetchCartTotal';

export default function CreditCardPayment() {
  const router = useRouter();

  const [paymentId, setPaymentId] = useState<string>('');

  const { data: session } = useSession();

  const {
    items,
    totalPrice,
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

  const { value, status, setStatus } = useContext(PaymentMethodContext);

  initMercadoPago(`${process.env.NEXT_PUBLIC_APP_MERCADOPAGO_PUBLIC_KEY}`);

  const initialization = {
    amount: totalPrice,
  };

  const onSubmit = async (formData) => {
    const cart = localStorage.getItem('cart');

    // Ensure we have cart data and parse it. If no cart data, use an empty array or object as default.
    const cartData = cart ? JSON.parse(cart) : [];

    // Append cartData to formData
    formData.cart = cartData;
    const body = JSON.stringify(formData);

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/payments/mercado_pago/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${session?.user?.accessToken}`,
      },
      body,
    });

    if (res.status === 200) {
      const data = await res.json();

      setStatus(true);
      localStorage.removeItem('cart');
      localStorage.removeItem('totalItems');

      setCartItems(data.results);
      setTotalItems(data.results.length);

      ToastSuccess('Payment Successful!');

      window.scrollTo(0, 0);

      setTimeout(() => {
        router.push('/library');
      }, 6000);
    }
  };

  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };

  const onReady = async () => {
    /*
      Callback llamado cuando Brick está listo.
      Aquí puedes ocultar cargamentos de su sitio, por ejemplo.
    */
  };

  useEffect(() => {
    return () => {
      setStatus(false);
    };
  }, [setStatus]);

  return (
    <div>
      {value?.value === 'credit' && status === false ? (
        <CardPayment
          initialization={initialization}
          onSubmit={onSubmit}
          onReady={onReady}
          onError={onError}
        />
      ) : (
        <StatusBrick />
      )}
    </div>
  );
}
