import { ChainId, ChainNameState } from '../hooks/types';

export enum AxiosMethod {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
}
export interface LocaleState {
  locale: 'en' | 'zh' | 'jp';
}

export interface EventsListByCountryAttr {
  country: string;
  locale: string;
  offset: number;
  limit: number;
}

export interface EventsListByCityAttr {
  city: string;
  locale: string;
  offset: number;
  limit: number;
}

export enum WalletType {
  Freeport = 'Freeport',
  Web = 'Web',
  App = 'App',
}

export enum AddressType {
  evm = 'evm',
  ton = 'ton',
}

export enum TonWallet {
  OpenMask = 'OpenMask',
  TonHub = 'TonHub',
  TonKeeper = 'TonKeeper',
}

export interface addBindUserNewAddressAttr {
  signature: string;
  message: string;
  address: string;
  walletType: WalletType;
  addressType?: AddressType.evm | AddressType.ton;
  signMethod?: TonWallet.OpenMask | TonWallet.TonHub | TonWallet.TonKeeper;
  walletInfo?: any;
}

export interface ImportNFTAttr {
  tokenId: string;
  tokenAddress: string;
  chain: ChainNameState['chain'];
  tokenType: ChainId;
}
