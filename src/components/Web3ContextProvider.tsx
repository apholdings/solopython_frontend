'use client';

import { ReactNode, useState, useEffect } from 'react';
import Web3 from 'web3';
import Web3Context from '@/context/web3Context';

interface Props {
  children: ReactNode;
}

export default function Web3ContextProvider({ children }: Props) {
  const [web3, setWeb3] = useState<Web3 | null>(null);

  // Initialize from localStorage or default to '1' and 'ETH'
  const [networkId, setNetworkId] = useState<string | null>(
    () => localStorage.getItem('networkId') || '1',
  );
  const [nativeToken, setNativeToken] = useState<string | null>(
    () => localStorage.getItem('nativeToken') || 'ETH',
  );

  const [nativeBalance, setNativeBalance] = useState<string | null>(null);

  useEffect(() => {
    // Initialize web3 with the appropriate network
    const initializeWeb3 = async () => {
      let web3Instance;

      if (networkId === '1') {
        // Ethereum Mainnet
        web3Instance = new Web3(process.env.NEXT_PUBLIC_APP_ETHEREUM_RPC_URL);
      } else if (networkId === '137') {
        // Polygon Mainnet
        web3Instance = new Web3(process.env.NEXT_PUBLIC_APP_POLYGON_RPC_URL);
      } else {
        console.log('Unsupported network!');
        return;
      }

      setWeb3(web3Instance);
    };

    initializeWeb3();
  }, [networkId]);

  useEffect(() => {
    // Update native token when networkId changes
    if (networkId === '1') {
      setNativeToken('ETH');
    }
    if (networkId === '137') {
      setNativeToken('MATIC');
    }
  }, [networkId]);

  useEffect(() => {
    // This useEffect will run whenever 'networkId' or 'nativeToken' changes.
    localStorage.setItem('networkId', networkId);
    localStorage.setItem('nativeToken', nativeToken);
  }, [networkId, nativeToken]);

  return (
    <Web3Context.Provider
      value={{
        web3,
        setWeb3,
        networkId,
        setNetworkId,
        nativeBalance,
        setNativeBalance,
        nativeToken,
        setNativeToken,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
