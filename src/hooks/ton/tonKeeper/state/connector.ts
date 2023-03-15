import { TonConnect } from '@tonconnect/sdk';

export const dappMetadata = {
  manifestUrl: 'https://freeportmeta.com/ton/tonkeeper.json',
};

export function getConnector() {
  return new TonConnect(dappMetadata);
}

export function addReturnStrategy(url: string, returnStrategy: 'back' | 'none'): string {
  const link = new URL(url);
  link.searchParams.append('ret', returnStrategy);
  return link.toString();
}
