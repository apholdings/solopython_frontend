// web3Context.ts
import { createContext } from 'react';
import Web3 from 'web3';

interface Web3ContextInterface {
  web3: Web3 | null;
  networkId: string | null;
  nativeBalance: string | null;
  nativeToken: string | null;
  setWeb3: (web3: Web3) => void;
  setNetworkId: (networkId: string) => void;
  setNativeBalance: (balance: string) => void;
  setNativeToken: (token: string) => void;
}

const Web3Context = createContext<Web3ContextInterface>({
  web3: null,
  networkId: null,
  nativeBalance: null,
  nativeToken: null,
  setWeb3: (web3: Web3) => {},
  setNetworkId: (networkId: string) => {},
  setNativeBalance: (balance: string) => {},
  setNativeToken: (token: string) => {},
});

export default Web3Context;
