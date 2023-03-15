import '../styles/globals.css';
import '../styles/banner.css';
import 'react-datepicker/dist/react-datepicker.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import theme from '../src/utils/theme';
import { ThemeProvider } from '@mui/material/styles';
import '../src/utils/i18n';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { hooks as metaMaskHooks, metaMask } from '../src/components/connect/connectors/metaMask';
import { hooks as networkHooks, network } from '../src/components/connect/connectors/network';
import { hooks as walletConnectHooks, walletConnect } from '../src/components/connect/connectors/walletConnect';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  const connectors: [MetaMask | WalletConnect | CoinbaseWallet | Network, Web3ReactHooks][] = [
    [metaMask, metaMaskHooks],
    [walletConnect, walletConnectHooks],
    // [coinbaseWallet, coinbaseWalletHooks],
    [network, networkHooks],
  ];

  return (
    <>
      <GoogleAnalytics trackPageViews gaMeasurementId={process.env.NEXT_PUBLIC_GTAG} />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Web3ReactProvider connectors={connectors}>
            <RecoilRoot>
              <Component {...pageProps} />
            </RecoilRoot>
          </Web3ReactProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
