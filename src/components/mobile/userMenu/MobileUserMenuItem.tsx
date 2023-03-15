import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { userMenuData } from '../../../data/navData';
import MobileUserTopNavbar from './MobileUserTopNavbar';
import MobileUserBottomNavbar from './MobileUserBottomNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogOut, selectUserInfo } from '../../../redux/reducers/userReducer';
import { Avatar } from '@mui/material';
import { HiOutlineLogout } from 'react-icons/hi';
import Link from 'next/link';

export default function MobileUserMenuItem({
  open,
  handleToggleDrawer,
}: {
  open: boolean;
  handleToggleDrawer: (open: boolean) => void;
}) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  const UserList = () => (
    <Box
      sx={{ width: '100vw' }}
      role="presentation"
      onClick={() => handleToggleDrawer(false)}
      onKeyDown={() => handleToggleDrawer(false)}
    >
      <MobileUserTopNavbar />
      <List>
        <ListItem onClick={(e) => e.stopPropagation()} sx={{ pl: 3 }}>
          <ListItemIcon>
            <Avatar src={userInfo.photoURL} />
          </ListItemIcon>
          <ListItemText primary={userInfo.displayName} />
          <ListItemButton
            onClick={() => dispatch(handleLogOut())}
            sx={{ fontSize: 20, color: '#919191', justifyContent: 'end' }}
          >
            <HiOutlineLogout />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {userMenuData &&
          userMenuData.map((data) => (
            <Link href={data.link} key={data.name}>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <Box sx={{ width: 20, height: 20 }}>
                      <img src={data.img} alt={data.name} width="100%" />
                    </Box>
                  </ListItemIcon>
                  <ListItemText primary={data.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
      </List>
      <Box sx={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <MobileUserBottomNavbar />
      </Box>
    </Box>
  );

  return (
    <>
      {userInfo ? (
        <>
          <SwipeableDrawer
            anchor={'right'}
            open={open}
            onClose={() => handleToggleDrawer(false)}
            onOpen={() => handleToggleDrawer(true)}
          >
            <UserList />
          </SwipeableDrawer>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
