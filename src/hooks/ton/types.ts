import { TonhubConnector } from 'ton-x';
import { Wallet } from '@tonconnect/sdk';

export interface TonhubWalletConfig {
  address: string;
  endpoint: string;
  walletType: string;
  walletConfig: string;
  walletSig: string;
  appPublicKey: string;
}

export interface ConnectionStateAttr {
  type: 'online';
  session: string;
  seed: string;
  walletConfig: TonhubWalletConfig;
}

export interface UseTonhubSignatureState {
  handleBindTonhub: (connectionState: ConnectionStateAttr, connector: TonhubConnector) => void;
}

export interface UseOpenMaskSignatureState {
  handleBindOpenMaskAddress: () => void;
}

export interface TonKeeperWallet extends Wallet {
  connectItems?: {
    tonProof?: {
      name: 'ton_proof';
      proof: {
        timestamp: number;
        domain: {
          lengthBytes: number;
          value: string;
        };
        payload: string;
        signature: string;
      };
    };
  };
}

export interface UseTonKeeperSignatureState {
  handleBindTonKeeper: (wallet: Wallet) => void;
}
