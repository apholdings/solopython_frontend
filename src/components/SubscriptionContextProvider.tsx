'use client';

import { ReactNode, useEffect, useState } from 'react';
import SubscriptionContext from '@/context/subscriptionContext';
import { ISubscription } from '@/interfaces/tiers/Subscription';

interface Props {
  children: ReactNode;
}

export default function SubscriptionContextProvider({ children }: Props) {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        setSubscriptions,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}
