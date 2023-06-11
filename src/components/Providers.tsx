'use client';

import { ReactNode, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@/styles/toastStyles.css';
import CartContextProvider from './CartContextProvider';
import CouponContextProvider from './CouponContextProvider';
import PaymentMethodContextProvider from './PaymentMethodContextProvider';
import Web3ContextProvider from './Web3ContextProvider';

import SubscriptionContextProvider from './SubscriptionContextProvider';

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <CouponContextProvider>
          <PaymentMethodContextProvider>
            <Web3ContextProvider>
              <SubscriptionContextProvider>
                {children}
                <ToastContainer className="bottom-0" position="bottom-right" />
              </SubscriptionContextProvider>
            </Web3ContextProvider>
          </PaymentMethodContextProvider>
        </CouponContextProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}
