import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MyMemberTitle from '../member/MyMemberTitle';
import Image from 'next/image';
import CopyTextButton from '../button/CopyTextButton';
import MyWalletButton from '../popupBox/MyWalletButton';
import { urlLoader } from '../../utils/myLoader';
import { noBannerImg } from '../../data/imgData';
import { handleSetAddress } from '../../utils/walletAddress';
import { chainCoinMenuData } from '../../data/navData';
import moment from 'moment';
import { EventPageData } from '../../../pages/event/[eventId]';

function EventTitleBox({ text }: { text: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        m: { xs: 0, md: 2 },
      }}
    >
      <Typography
        component="div"
        variant="h3"
        sx={{ fontSize: { xs: '1.25rem', md: '1.4rem', lg: '2rem' }, mt: { xs: 2, md: 0 } }}
      >
        {text}
      </Typography>
    </Box>
  );
}

function EventChainBox({ text, img }: { text: string; img: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        bgcolor: '#F0F0F0',
        borderRadius: '20px',
        overflow: 'hidden',
        p: '8px 32px',
        maxHeight: '45px',
      }}
    >
      <Image src={img} alt={text} width={30} height={30} />
      <Typography component="div" sx={{ fontSize: { md: '1.325rem', lg: '1.5rem' }, mt: { xs: 2, md: 0 }, pl: 1 }}>
        {text}
      </Typography>
    </Box>
  );
}

function EventInfoBox({ t, data, userBoundAddress, userEventNFTsAmount }: EventPageData) {
  return (
    <Box sx={{ ml: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Avatar src={data.ownerPhotoURL ? data.ownerPhotoURL : noBannerImg} sx={{ mr: 2, width: 60, height: 60 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography>{t('owner')}</Typography>
          <Typography variant="h6">{data.ownerName}</Typography>
        </Box>
      </Box>
      <Divider sx={{ mt: 4, mb: 4 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', width: '100%' }}>
        <MyMemberTitle title={t('Condition')} />
        <ConditionList title={t('Token Type')} value={data.tokenType} />
        <ConditionList
          title={t('Usage Count')}
          value={Number(data.usageCount) === 0 ? t('unlimited') : data.usageCount}
        />
        <Box sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'start' }}>
          {userBoundAddress && (
            <MyWalletButton
              t={t}
              userBoundAddress={userBoundAddress}
              userEventNFTsAmount={userEventNFTsAmount}
              buttonComponent={
                <Button variant="outlined" color="font" sx={{ width: 230 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '23px', mr: 2 }}>
                    <img src="/image/icon/icon-user1.png" alt="user" />
                  </Box>
                  {t('check my wallet')}
                </Button>
              }
            />
          )}
        </Box>
      </Box>
      <Divider sx={{ mt: 4, mb: 4 }} />
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography>{t('Pass by NFT')}</Typography>
          <Typography color="font.main">{handleSetAddress(data.tokenAddress)}</Typography>
        </Box>
        <CopyTextButton copyText={data.tokenAddress} successCopyMessage={t('copied!')} />
      </Box>
    </Box>
  );
}

function EventListInfo({ text, imgSrc }: { text: string | number; imgSrc: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
      <Box sx={{ width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={imgSrc} alt="" />
      </Box>
      <Typography color="font.main" fontSize={18} sx={{ ml: 2 }}>
        {text}
      </Typography>
    </Box>
  );
}

function ConditionList({ title, value }: { title: string; value: string | number }) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        pl: 8,
        width: '100%',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '32px',
          width: 8,
          height: 8,
          bgcolor: '#959595',
          borderRadius: '5px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      ></Box>
      <Typography>{title}</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
}

export default function WebEventIdInfoBox({ t, data, userBoundAddress, userEventNFTsAmount }: EventPageData) {
  const endTimeDisplay = data.endTime !== 0 ? ` - ${moment(data.endTime * 1000).format('YYYY/MM/DD')}` : '';
  return (
    <>
      <Box sx={{ bgcolor: '#fff', p: { xs: 2, md: 4 } }}>
        <Grid container spacing={2} maxWidth="lg" sx={{ display: 'flex', margin: '0 auto' }}>
          <Grid xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <EventTitleBox text={data.eventName} />
            <>
              {chainCoinMenuData.map((chainData) =>
                chainData.name.toUpperCase() === data.chain.toUpperCase() ? (
                  <EventChainBox key={chainData.name} text={chainData.name} img={chainData.img} />
                ) : null
              )}
            </>
          </Grid>
          <Grid xs={6} sx={{ mb: 4 }}>
            <Image
              loader={urlLoader}
              src={data.bannerURL ? data.bannerURL : noBannerImg}
              alt={data.eventName}
              width={635}
              height={400}
              objectFit="cover"
            />
          </Grid>
          <Grid xs={6} sx={{ mb: 4 }}>
            <EventInfoBox
              t={t}
              data={data}
              userBoundAddress={userBoundAddress}
              userEventNFTsAmount={userEventNFTsAmount}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ bgcolor: '#fff', p: { xs: 2, md: 4 }, mt: 2 }}>
        <Grid container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto', pb: 10 }}>
          <Grid xs={12}>
            <MyMemberTitle title={t('Event Information')} />
          </Grid>

          <Grid xs={12} md={10}>
            {[
              {
                text: `${moment(data.startTime * 1000).format('YYYY/MM/DD')}${endTimeDisplay}`,
                imgSrc: '/image/icon/date-green.svg',
              },
              {
                text: `${data.country ? data.country : ''} ${data.city ? data.city : ''} ${
                  data.physicalAddress ? data.physicalAddress : ''
                }`,
                imgSrc: '/image/icon/location-green.svg',
              },
              { text: data.chain, imgSrc: '/image/icon/ticket-green.svg' },
            ].map((data) => (
              <EventListInfo key={data.imgSrc} text={data.text} imgSrc={data.imgSrc} />
            ))}
          </Grid>

          <Grid xs={12}>
            <Divider sx={{ mt: 4, mb: 4 }} />
            <MyMemberTitle title={t('Event Description')} />
          </Grid>
          <Grid xs={12} md={10}>
            <Typography
              component="div"
              variant="body1"
              sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, ml: { xs: 0, md: 3 } }}
            >
              {data.description}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
