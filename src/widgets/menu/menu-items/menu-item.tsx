import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import Link from 'next/link';

import { MenuItemCard } from '@entities/menu-item/menu-item-card';
import { useGetAllMenuItemsQuery } from '@entities/menu-item/menu-items';

export function MenuItemWidget() {
  const { data: menuItems } = useGetAllMenuItemsQuery();

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        href="/dashboard/menu/create-menu"
        LinkComponent={Link}
      >
        ДОБАВИТЬ БЛЮДО
      </Button>
      <Box marginTop={4}>
        {menuItems?.map((menuItem) => (
          <MenuItemCard key={menuItem.id} {...menuItem}></MenuItemCard>
        ))}
      </Box>
    </>
  );
}
