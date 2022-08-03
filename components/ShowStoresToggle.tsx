import { ActionIcon } from '@mantine/core';
import { IconShoppingCart, IconShoppingCartOff } from '@tabler/icons';
import { forwardRef } from 'react';

interface ShowStoresToggleProps {
  showStores: boolean;
  toggleShowStores: () => void;
}

const ShowStoresToggle = forwardRef<HTMLButtonElement, ShowStoresToggleProps>(
  ({ showStores, toggleShowStores, ...props }, ref) => (
    <ActionIcon
      onClick={toggleShowStores}
      size="lg"
      radius="xl"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: showStores ? theme.colors.green[6] : theme.colors.gray[4],
      })}
      ref={ref}
      {...props}
    >
      {showStores ? <IconShoppingCart size={18} /> : <IconShoppingCartOff size={18} />}
    </ActionIcon>
  )
);

export default ShowStoresToggle;
