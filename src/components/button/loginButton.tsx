import { styled, Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { handleLogin } from '../../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';
import type {} from 'redux-thunk/extend-redux'; // 避免 TypeScript 報錯
import { ButtonProps } from '@mui/material/Button';
import { NextRouter, useRouter } from 'next/router';

interface Props extends ButtonProps {
  text: string;
  theme?: Theme;
}

const GButton = styled(Button)((props: Props) => ({
  position: 'relative',
  backgroundColor: '#fff',
  border: '1px solid #d5d5d5',
  color: '#585858',
  fontSize: '1.85rem',
  textTransform: 'capitalize',
  borderRadius: '10px',
  marginBottom: '40px',
  width: '100%',
  maxWidth: 600,
  '&:hover': {
    backgroundColor: '#eb3d3d',
    border: '1px solid #eb3d3d',
    color: '#fff',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '30%',
    transform: 'translateY(-50%)',
    background: `center / contain no-repeat url(/image/social/${props.text}.png)`,
    width: 30,
    height: 30,
  },
  '&:hover::before': {
    background: `center / contain no-repeat url(/image/social/${props.text}-click.png)`,
  },
  [props.theme!.breakpoints.down('md')]: {
    marginBottom: '26px',
    fontSize: '1.25rem',
    '&::before': {
      left: '10%',
    },
  },
}));

export default function LoginButton({ text }: { text: string }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLoginClick = (router: NextRouter, text: string) => {
    dispatch(handleLogin(router, text));
  };

  return (
    <GButton variant="outlined" text={text} onClick={() => handleLoginClick(router, text)}>
      {text}
    </GButton>
  );
}
