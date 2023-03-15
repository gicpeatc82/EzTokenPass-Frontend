import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/reducers/loadingReducer';
import { setAlertBox } from '../redux/reducers/alertBoxReducer';
import { UseAlertBoxState } from './types';

export default function useAlertBox(): UseAlertBoxState {
  const dispatch = useDispatch();

  const handleShowLoadingBox = (isShow: boolean) => {
    dispatch(setLoading(isShow));
  };

  const handleShowAlertBox = (text: string, bgColor?: string) => {
    dispatch(setLoading(false));
    dispatch(
      setAlertBox({
        open: true,
        alertBGColor: bgColor || 'success',
        alertText: text || '',
      })
    );
  };

  return {
    handleShowLoadingBox,
    handleShowAlertBox,
  };
}
