import useAlertBox from './useAlertBox';
import { useTranslation } from 'react-i18next';

function useResponseMessage() {
  const { t } = useTranslation();
  const { handleShowAlertBox } = useAlertBox();

  function checkErrorCode(errorCode: number, errorMessage: string) {
    switch (errorCode) {
      case 400:
        handleShowAlertBox(t('Invalid file type'), 'error');
        break;
      case 40001:
        handleShowAlertBox(errorMessage, 'error');
        break;
      case 40102:
        handleShowAlertBox(t('請重新登入'), 'error');
        break;
      case 40003:
        handleShowAlertBox(t('The tokenAddress is invalid'), 'error');
        break;
      case 40004:
        handleShowAlertBox(errorMessage, 'error');
        break;
      case 40301:
        handleShowAlertBox(t('提供無效的參數(不存在的id等, 無效的合約地址等)'), 'error');
        break;
      case 40302:
        handleShowAlertBox(t('無權限操作(操作非自己的訂單)'), 'error');
        break;
      case 40304:
        handleShowAlertBox(t('給予的參數無法驗證(簽章與地址不匹配等)'), 'error');
        break;
      case 40305:
        handleShowAlertBox(t('Usage count exceed'), 'error');
        break;
      case 40309:
        handleShowAlertBox(t('This event name has been used'), 'error');
        break;
      case 40361:
        handleShowAlertBox(t('File size too large'), 'error');
        break;
      case 40362:
        handleShowAlertBox(t('Invalid file type'), 'error');
        break;
      default:
        handleShowAlertBox(t('error'), 'error');
        break;
    }
  }

  // 什麼都不提示
  const handleGetAPISuccess = (res: any) => {
    if (!res) return false;
    const successRes = (res && res.data && res.data.code === 200) || (res && res.data && res.data.msg === 'OK');
    if (successRes) return true;
  };

  // 只顯示 error 的錯誤提示
  const handleGetAPIShowError = (res: any) => {
    const successRes = handleGetAPISuccess(res);
    if (successRes) {
      return true;
    } else {
      const errorCode = Number(res.response.data.code);
      const errorMessage = res.response.data.msg;
      checkErrorCode(errorCode, errorMessage);
      return false;
    }
  };

  // 成功或是錯誤都顯示提示
  const handleShowInfoMessage = (res: any) => {
    if (!res) {
      handleShowAlertBox(t('Error'), 'error');
      return false;
    }

    const successRes = handleGetAPISuccess(res);
    if (successRes) {
      handleShowAlertBox('Success!');
      return true;
    } else {
      if (res.response) {
        const errorCode = Number(res.response.data.code);
        const errorMessage = res.response.data.msg;
        checkErrorCode(errorCode, errorMessage);
        return false;
      }
    }
  };

  return { handleGetAPISuccess, handleGetAPIShowError, handleShowInfoMessage };
}

export default useResponseMessage;
