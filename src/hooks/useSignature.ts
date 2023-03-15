import { addBindUserNewAddressAttr } from '../api/types';
import { UseSignatureState } from './types';
import { addBindUserNewAddress } from '../api/userAPI';
import useResponseMessage from './useResponseMessage';

function useSignature(): UseSignatureState {
  const { handleShowInfoMessage } = useResponseMessage();

  const bindUserNewAddress: UseSignatureState['bindUserNewAddress'] = async (data: addBindUserNewAddressAttr) => {
    const res = await addBindUserNewAddress(data);
    const successRes = handleShowInfoMessage(res);
    if (successRes) window.location.reload(); // 綁定成功
  };

  return {
    bindUserNewAddress,
  };
}

export default useSignature;
