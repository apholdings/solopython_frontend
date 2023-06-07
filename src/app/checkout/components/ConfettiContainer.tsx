'use client';

import Confetti from 'react-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { useWindowSize } from 'react-use';
import { ReactNode, useContext, useState } from 'react';
import PaymentMethodContext from '@/context/paymentMethodContext';

interface PageProps {
  children: ReactNode;
}

export default function ConfettiContainer({ children }: PageProps) {
  const { status, setStatus } = useContext(PaymentMethodContext);

  const { width, height } = useWindowSize();

  return (
    <div>
      {status && (
        <AnimatePresence>
          <motion.div
            className="absolute top-0 left-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
          >
            {width && height && <Confetti width={width - 15} height={height} />}
          </motion.div>
        </AnimatePresence>
      )}
      {children}
    </div>
  );
}
