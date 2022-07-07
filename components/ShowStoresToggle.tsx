import { ActionIcon } from '@mantine/core';
import { IconShoppingCart, IconShoppingCartOff } from '@tabler/icons';

interface ShowStoresToggleProps {
  showStores: boolean;
  toggleShowStores: () => void;
}

export default function ShowStoresToggle({ showStores, toggleShowStores }: ShowStoresToggleProps) {
  return (
    <ActionIcon
      onClick={toggleShowStores}
      size="lg"
      radius="xl"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: showStores ? theme.colors.green[6] : theme.colors.gray[4],
      })}
    >
      {showStores ? <IconShoppingCart size={18} /> : <IconShoppingCartOff size={18} />}
    </ActionIcon>
  );
}
