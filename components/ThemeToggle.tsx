import { ActionIcon, ActionIconProps, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
import { forwardRef } from 'react';

const ShowStoresToggle = forwardRef<HTMLButtonElement, ActionIconProps>((props, ref) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="lg"
      radius="xl"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
      })}
      ref={ref}
      {...props}
    >
      {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  );
});

export default ShowStoresToggle;
