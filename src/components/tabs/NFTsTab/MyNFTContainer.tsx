import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Card, CardMedia, Paper, Theme, Typography, useMediaQuery } from '@mui/material';
import ImportMyNFTBox from './ImportMyNFTBox';
import AddNFTButton from './AddNFTButton';
import { handleSetAddress } from '../../../utils/walletAddress';

const myNFTContainerStyle = () => ({
  container: { margin: '0 auto', justifyContent: 'space-between' },
  containerSpacing: { xs: 2, sm: 4, md: 6 },
  paper: { display: 'flex', justifyContent: 'space-between' },
  cardText: { display: { xs: 'none', md: 'flex' } },
  cardTokenId: { maxWidth: 100 },
  gridAdd: { display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: 280 },
  grid: { display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 280 },
  avatar: { width: { xs: 70, sm: 120, md: 185 }, height: { xs: 70, sm: 120, md: 185 }, borderRadius: '10px' },
  stationSymbolsGrid: { maxWidth: 280 },
  stationSymbolsBox: { width: { xs: 70, sm: 120, md: 185 }, height: { xs: 70, sm: 120, md: 185 } },
});

export default function MyNFTContainer({ nftList }: { nftList: any[] | null }) {
  const { t } = useTranslation();
  const classes = myNFTContainerStyle();
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const cardMediaHeight = () => {
    if (md) return 185;
    if (sm) return 120;
    if (xs) return 70;
  };

  return (
    <Grid container spacing={classes.containerSpacing} columns={12} maxWidth="lg" sx={classes.container}>
      <Grid xs={4} md={4} lg={3} sx={classes.gridAdd}>
        <ImportMyNFTBox buttonComponent={<AddNFTButton text={t('Import My NFT')} />} />
      </Grid>
      {nftList && nftList.length === 0 && <Typography>{t('You do not have any NFTs.')}</Typography>}
      {nftList &&
        nftList.map((_, index) => (
          <Grid key={index} xs={4} md={4} lg={3} sx={classes.grid}>
            <Card>
              <CardMedia component="img" height={Number(cardMediaHeight)} image={_} alt={_} />
              <Paper sx={classes.paper}>
                <Typography variant="body2" color="text.secondary" sx={classes.cardText}>
                  Token ID
                </Typography>

                <Typography component="div" variant="body2" color="text.secondary" sx={classes.cardTokenId}>
                  {handleSetAddress(_)}
                </Typography>
              </Paper>
            </Card>
          </Grid>
        ))}

      {Array.from(Array(3)).map((_, index) => (
        <Grid key={index} xs={4} md={4} lg={3} sx={classes.stationSymbolsGrid}>
          <Box sx={classes.stationSymbolsBox} />
        </Grid>
      ))}
    </Grid>
  );
}
