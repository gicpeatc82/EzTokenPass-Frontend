import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector } from '@web3-react/core';
import { URLS } from '../../../data/chains';
import { dev } from '../../../data/node_envData';

export const [coinbaseWallet, hooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: dev ? URLS[1][0] : URLS[1][0],
        appName: 'web3-react',
      },
    })
);
