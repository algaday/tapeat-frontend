'use client';

import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { IconButton, Stack, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';

import { StyledBox } from './navigation-list.styles';

const navigations = [
  {
    name: 'Меню',
    link: '/frito',
    icon: <RestaurantMenuRoundedIcon />,
  },
  {
    name: 'Корзина',
    link: '/frito/cart',
    icon: <AddShoppingCartOutlinedIcon />,
  },
  { name: 'Отзывы', link: '#', icon: <SmsOutlinedIcon /> },
  { name: 'Обратная связь', link: '#', icon: <PhoneInTalkOutlinedIcon /> },
  { name: 'Контакты', link: '#', icon: <PhoneAndroidOutlinedIcon /> },
];

type Props = {
  toggleDrawer: () => void;
};

export function NavigationList(props: Props) {
  return (
    <StyledBox role="presentation" onClick={props.toggleDrawer}>
      <Stack
        marginBottom={2}
        paddingX={2}
        direction="row"
        justifyContent="space-between"
        alignContent="center"
      >
        <Typography variant="h4">Frito</Typography>
        <IconButton onClick={props.toggleDrawer}>
          <CloseOutlinedIcon />
        </IconButton>
      </Stack>
      <List>
        {navigations.map((navigation) => (
          <ListItem key={navigation.name} disablePadding>
            <ListItemButton href={navigation.link} LinkComponent={Link}>
              <ListItemIcon>{navigation.icon}</ListItemIcon>
              <ListItemText primary={navigation.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledBox>
  );
}
