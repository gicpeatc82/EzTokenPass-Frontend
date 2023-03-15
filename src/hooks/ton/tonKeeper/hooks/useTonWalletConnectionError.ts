import { UserRejectsError } from '@tonconnect/sdk';
import { useCallback, useEffect } from 'react';
import { getConnector } from '../state/connector';

export function useTonWalletConnectionError(callback: () => void) {
  const connector = getConnector();

  const errorsHandler = useCallback(
    (error: unknown) => {
      if (typeof error === 'object' && error instanceof UserRejectsError) {
        callback();
      }
    },
    [callback]
  );
  /* eslint-disable-next-line */
  const emptyCallback = useCallback(() => {}, []);

  useEffect(() => connector.onStatusChange(emptyCallback, errorsHandler), [emptyCallback, errorsHandler]);
}
