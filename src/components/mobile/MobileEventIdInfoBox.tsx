import { TFunction } from 'react-i18next';
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MyLeftTitle from '../member/MyLeftTitle';
import Image from 'next/image';
import CopyTextButton from '../button/CopyTextButton';
import MyWalletButton from '../popupBox/MyWalletButton';
import { urlLoader } from '../../utils/myLoader';
import { noBannerImg } from '../../data/imgData';
import { handleSetAddress } from '../../utils/walletAddress';
import moment from 'moment';
import { chainCoinMenuData } from '../../data/navData';
import { EventPageData } from '../../../pages/event/[eventId]';

function EventTitleBox({ text }: { text: string }) {
  return (
    <Typography component="div" variant="h3" sx={{ fontSize: { xs: '1.6rem', md: '1.8rem' }, mt: { xs: 2, md: 0 } }}>
      {text}
    </Typography>
  );
}

function EventCopyAndWalletBox({ t, address }: { t: TFunction; address: string }) {
  return (
    <>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography>{t('Pass by NFT')}</Typography>
          <Typography color="font.main">{handleSetAddress(address)}</Typography>
        </Box>
        <CopyTextButton copyText={address} successCopyMessage={t('copied!')} buttonText={t('copy address')} />
      </Box>
      <Divider />
    </>
  );
}

function EventAvatarBox({
  organizationName,
  name,
  avatarImg,
}: {
  organizationName: string;
  name: string;
  avatarImg: string | null;
}) {
  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Avatar src={avatarImg ? avatarImg : ''} sx={{ mr: 2, width: 60, height: 60 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography>{organizationName}</Typography>
          <Typography variant="h6">{name}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

function EventListInfo({ text, imgSrc }: { text: string; imgSrc: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2, pl: 3 }}>
      <Box sx={{ width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={imgSrc} alt="" />
      </Box>
      <Typography color="font.main" sx={{ ml: 2, wordBreak: 'break-word' }}>
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
        p: '4px 16px',
        maxHeight: '45px',
      }}
    >
      <Image src={img} alt={text} width={20} height={20} />
      <Typography component="div" sx={{ fontSize: '1rem', pl: 1 }}>
        {text}
      </Typography>
    </Box>
  );
}

export default function MobileEventIdInfoBox({ t, data, userBoundAddress, userEventNFTsAmount }: EventPageData) {
  const endTimeDisplay = data.endTime !== 0 ? ` - ${moment(data.endTime * 1000).format('YYYY/MM/DD')}` : '';

  return (
    <>
      <Box sx={{ bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative', width: '100%', height: '60vw' }}>
          <Box sx={{ position: 'absolute', zIndex: 2, top: '8%', right: '3%' }}>
            {chainCoinMenuData.map((chainData) =>
              chainData.name.toUpperCase() === data.chain.toUpperCase() ? (
                <EventChainBox key={chainData.name} text={chainData.name} img={chainData.img} />
              ) : null
            )}
          </Box>
          <Image
            loader={urlLoader}
            src={data.bannerURL ? data.bannerURL : noBannerImg}
            alt={data.eventName}
            objectFit="cover"
            layout="fill"
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </Box>
      </Box>
      <Box sx={{ bgcolor: '#fff', p: { xs: 1, md: 3 } }}>
        <Grid container spacing={2} maxWidth="lg" sx={{ display: 'flex', margin: '0 auto' }}>
          <Grid xs={12}>
            <EventTitleBox text={data.eventName} />
          </Grid>
          <Grid xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', width: '100%', mb: 3 }}>
              <MyLeftTitle title={t('Condition')} />
              <ConditionList title={t('Token Type')} value={data.tokenType} />
              <ConditionList
                title={t('Usage Count')}
                value={Number(data.usageCount) === 0 ? t('unlimited') : data.usageCount}
              />
              <Box sx={{ mb: 2 }} />
              {userBoundAddress && (
                <MyWalletButton
                  t={t}
                  userBoundAddress={userBoundAddress}
                  userEventNFTsAmount={userEventNFTsAmount}
                  buttonComponent={
                    <Button variant="outlined" color="font" fullWidth size="large">
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '23px', mr: 2 }}
                      >
                        <img src="/image/icon/icon-user1.png" alt="user" />
                      </Box>
                      {t('check my wallet')}
                    </Button>
                  }
                />
              )}
            </Box>
            <EventCopyAndWalletBox t={t} address={data.tokenAddress} />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          maxWidth="lg"
          sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto', pb: 10 }}
        >
          <Grid xs={12} sx={{ mb: 3 }}>
            <EventAvatarBox organizationName={t('owner')} name={data.ownerName} avatarImg={data.bannerURL} />
          </Grid>
          <Grid xs={12} sx={{ mb: 3 }}>
            <MyLeftTitle title={t('Event Information')} />
            {[
              {
                text: `${moment(data.startTime * 1000).format('YYYY/MM/DD')}${endTimeDisplay}`,
                imgSrc: '/image/icon/date-green.svg',
              },
              {
                text: `${data.country} ${data.city} ${data.physicalAddress}`,
                imgSrc: '/image/icon/location-green.svg',
              },
              { text: data.chain, imgSrc: '/image/icon/ticket-green.svg' },
            ].map((data) => (
              <EventListInfo key={data.imgSrc} text={data.text} imgSrc={data.imgSrc} />
            ))}
          </Grid>

          <Grid xs={12}>
            <Divider sx={{ mt: 3, mb: 3 }} />
            <MyLeftTitle title={t('Event Description')} />
          </Grid>
          <Grid xs={12} md={10}>
            <Box sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, pl: 3, wordBreak: 'break-word' }}>
              {data.description}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
