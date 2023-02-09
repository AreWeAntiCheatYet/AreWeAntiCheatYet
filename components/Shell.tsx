import { ActionIcon, AppShell, Group, Header, Image, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconSettings } from '@tabler/icons-react';
import { useState } from 'react';
import Settings from './Settings';
import ThemeToggle from './ThemeToggle';

function Head({ setSettings }: { setSettings: (enabled: boolean) => void }) {
  const breakpoint = useMediaQuery('(min-width: 1200px)');
  const theme = useMantineTheme();

  const background = theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2];

  return (
    <Header height={60} fixed bg={background}>
      <Group px={15} h={60} position="apart" noWrap>
        <Group position="center" noWrap>
          <Image src="/icon.webp" width={64} height={64} />
          {breakpoint && (
            <Title ml={-10} order={2}>
              AreWeAntiCheatYet
            </Title>
          )}
        </Group>
        <Group position="center">
          <ThemeToggle />
          <ActionIcon onClick={() => setSettings(true)}>
            <IconSettings />
          </ActionIcon>
        </Group>
      </Group>
    </Header>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState(false);

  return (
    <>
      <Settings open={settings} setOpen={setSettings} />
      <AppShell padding={0} header={<Head setSettings={setSettings} />}>
        {children}
      </AppShell>
    </>
  );
}
