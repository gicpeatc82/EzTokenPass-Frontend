import { Box } from '@mui/material';
import { SvgIcon } from '@mui/material';
function SquareImgBox({ WH, imgSrc, icon }: { WH: string | number; imgSrc?: string; icon?: JSX.Element }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: WH, height: WH }}>
      {icon && <SvgIcon>{icon}</SvgIcon>}
      {imgSrc && <img src={imgSrc} alt="" width="100%" />}
    </Box>
  );
}

export default SquareImgBox;
