import { useEffect, useCallback } from 'react';
import useAlertBox from '../../../hooks/useAlertBox';
import { getMyAuthToken } from '../../../utils/localStorage';

interface UserMainBoxProps {
  children: JSX.Element;
  handleGetUserBoundAddress: () => void;
}

export default function UserMainBox({ children, handleGetUserBoundAddress }: UserMainBoxProps) {
  const { handleShowLoadingBox } = useAlertBox();
  const token = getMyAuthToken();

  const handleGetUserBoundAddressRef = useCallback(handleGetUserBoundAddress, []);

  useEffect(() => {
    if (token) {
      handleShowLoadingBox(true);
      handleGetUserBoundAddressRef();
      setTimeout(() => {
        handleShowLoadingBox(false);
      }, 1300);
    }
  }, [handleGetUserBoundAddressRef, token]);

  return <>{children}</>;
}
