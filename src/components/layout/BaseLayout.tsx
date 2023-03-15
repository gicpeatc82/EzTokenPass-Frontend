import Meta from './Meta';
import { TFunction } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectAlertBox } from '../../redux/reducers/alertBoxReducer';
import { selectLoading } from '../../redux/reducers/loadingReducer';
import AlertFaceBox from '../popupBox/AlertFaceBox';
import LoadingCircleBox from '../popupBox/LoadingCircleBox';
import CssBaseline from '@mui/material/CssBaseline';

interface PropsPage {
  children: JSX.Element[] | JSX.Element;
  t: TFunction;
}

const BaseLayout = ({ t, children }: PropsPage) => {
  const isAlertBox = useSelector(selectAlertBox);
  const isLoading = useSelector(selectLoading);

  return (
    <>
      <CssBaseline />
      <AlertFaceBox t={t} isAlertBox={isAlertBox} />
      <LoadingCircleBox open={isLoading} />
      <Meta />

      {children}
    </>
  );
};

export default BaseLayout;
