import { ISubscription } from '@/interfaces/tiers/Subscription';
import React from 'react';

interface ISubscriptionContext {
  subscriptions: ISubscription[];
  setSubscriptions: (items: ISubscription[]) => void;
}

const SubscriptionContext = React.createContext<ISubscriptionContext>({
  subscriptions: [],
  setSubscriptions: (items: ISubscription[]) => {},
});

export default SubscriptionContext;
