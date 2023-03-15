import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { TFunction } from 'react-i18next';
import { getParameterByName } from '../../utils/queryString';
import MyMemberTitle from '../member/MyMemberTitle';
import SelectTokenRadioList from '../select/SelectTokenRadioList';
import { UseUserState, UseVerifyQrCodeState } from '../../hooks/types';
import useAlertBox from '../../hooks/useAlertBox';
import useUser from '../../hooks/useUser';

export default function SelectTokenBox({
  t,
  verifyQrCode,
  userBoundAddress,
}: {
  t: TFunction;
  verifyQrCode: UseVerifyQrCodeState;
  userBoundAddress: UseUserState['userBoundAddress'];
}): JSX.Element {
  const {
    userSpecificEventTokenList,
    userSpecificEventTokenListTotalPage,
    handleGetSpecificEventNFTsByUserWallet,
    handleCheckBoundAddress,
  } = verifyQrCode;
  const { handleShowAlertBox } = useAlertBox();

  const eventId = getParameterByName('eventId');
  const eventHash = getParameterByName('hash');
  const userHasNoToken = userSpecificEventTokenList && userSpecificEventTokenList.length === 0;

  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = limit * (page - 1);
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (eventId && userBoundAddress) handleGetSpecificEventNFTsByUserWallet(eventId, offset, limit);
  }, [eventId, userBoundAddress, page]);

  useEffect(() => {
    if (userHasNoToken) handleShowAlertBox(t('You do not have the necessary NFT.'), 'warning');
  }, [userSpecificEventTokenList]);

  return (
    <>
      {userHasNoToken ? (
        <></>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#f9f9f9',
            borderRadius: '15px',
            flexDirection: 'column',
            pb: 4,
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              bgcolor: '#fff',
              textTransform: 'capitalize',
              pt: 2,
            }}
          >
            <MyMemberTitle title={t('Ticket the token to pass?')} />
          </Box>

          <Box
            sx={{
              width: '100%',
              minWidth: '300px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              mt: 4,
            }}
          >
            <SelectTokenRadioList
              t={t}
              dataList={userSpecificEventTokenList}
              userBoundAddress={userBoundAddress}
              eventId={eventId}
              eventHash={eventHash}
              handleCheckBoundAddress={handleCheckBoundAddress}
              page={page}
              handleChangePage={handleChangePage}
              totalPage={userSpecificEventTokenListTotalPage}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
