import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  IconButton,
  Avatar,
  Popover,
  MenuItem as MenuItemMui,
  ListItemText,
} from '@mui/material';

import { popMenu } from '../constants/popMenu';

const MenuPopover = ({ children, sx, ...other }) => {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      paperProps={{ sx }}
      {...other}
    >
      {children}
    </Popover>
  );
};

const PopMenu = () => {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const Close = () => setOpen(false);

  return (
    <Box>
      <IconButton size="small" sx={{ ml: 2 }} onClick={() => setOpen(true)} ref={menuRef}>
        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
      </IconButton>
      <MenuPopover
        open={open}
        onClose={Close}
        anchorEl={menuRef.current}
        sx={{
          marginTop: 2.5,
          marginLeft: 0.5,
          overflow: 'inherit',
          boxShadow: '1px, 1px, 2px, 2px rgb(0 0 0 / 20%)',
          width: 320,
        }}
      >
        {popMenu.map((item) => (
          <MenuItemMui
            key={item.title}
            to={item.path}
            component={RouterLink}
            onClick={() => setOpen(false)}
            sx={{ py: 1, px: 2.5 }}
          >
            <ListItemText disableTypography>{item.title}</ListItemText>
          </MenuItemMui>
        ))}
      </MenuPopover>
    </Box>
  );
};
export default PopMenu;
