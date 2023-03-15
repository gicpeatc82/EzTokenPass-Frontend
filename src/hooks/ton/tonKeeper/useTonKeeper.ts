import { useCallback, useEffect, useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Wallet } from '@tonconnect/sdk';
import { addReturnStrategy, getConnector } from './state/connector';
import { isDesktop, isMobile, openLink } from './state/utils';
import { walletsListQuery } from './state/wallets-list';
import { SignatureWalletMessage } from '../../../data/signatureWalletData';
import { useSlicedAddress } from './hooks/useSlicedAddress';
import { useTonWalletConnectionError } from './hooks/useTonWalletConnectionError';
import useAlertBox from '../../useAlertBox';
import useTonKeeperSignature from './useTonKeeperSignature';

function useTonKeeper() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [modalUniversalLink, setModalUniversalLink] = useState('');

  const { handleShowAlertBox } = useAlertBox();
  const { handleBindTonKeeper } = useTonKeeperSignature();

  const connector = getConnector();
  const walletsList = useRecoilValueLoadable(walletsListQuery);

  const onConnectErrorCallback = useCallback(() => {
    setModalUniversalLink('');
    handleShowAlertBox('Connection was rejected, please approve connection to the dApp in your wallet.', 'error');
  }, []);
  useTonWalletConnectionError(onConnectErrorCallback);

  const handleTonKeeperButtonClick = useCallback(async () => {
    // Use loading screen/UI instead (while wallets list is loading)
    if (!(walletsList.state === 'hasValue')) {
      setTimeout(handleTonKeeperButtonClick, 200);
    }

    if (!isDesktop() && walletsList.contents.embeddedWallet) {
      connector.connect(
        { jsBridgeKey: walletsList.contents.embeddedWallet.jsBridgeKey },
        { tonProof: SignatureWalletMessage }
      );
      return;
    }

    const tonkeeperConnectionSource = {
      universalLink: walletsList.contents.walletsList[0].universalLink,
      bridgeUrl: walletsList.contents.walletsList[0].bridgeUrl,
    };

    const universalLink = connector.connect(tonkeeperConnectionSource, { tonProof: SignatureWalletMessage });
    connector.onStatusChange((wallet: Wallet | null) => {
      setWallet(wallet);
      if (wallet?.connectItems?.tonProof) handleBindTonKeeper(wallet);
    }, console.error);

    if (isMobile()) {
      openLink(addReturnStrategy(universalLink, 'none'), '_blank');
    } else {
      setModalUniversalLink(universalLink);
    }
  }, [walletsList]);
  const address = useSlicedAddress(wallet?.account.address, wallet?.account.chain);

  useEffect(() => {
    if (modalUniversalLink && wallet) {
      setModalUniversalLink('');
    }
  }, [modalUniversalLink, wallet]);

  return {
    address,
    wallet,
    modalUniversalLink,
    setModalUniversalLink,
    handleTonKeeperButtonClick,
  };
}

export default useTonKeeper;
