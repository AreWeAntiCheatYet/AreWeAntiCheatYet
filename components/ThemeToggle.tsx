import { ActionIcon, ActionIconProps, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
import { forwardRef } from 'react';

const ThemeToggle = forwardRef<HTMLButtonElement, ActionIconProps>((props, ref) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <ActionIcon
      size="lg"
      ref={ref}
      radius="xl"
      {...props}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
      })}
      onClick={() => toggleColorScheme()}
    >
      {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  );
});

export default ThemeToggle;
