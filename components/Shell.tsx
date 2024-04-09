import { ActionIcon, AppShell, Group, Image, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { openConfirmModal, openModal } from '@mantine/modals';
import { HeaderControl } from '@mantinex/mantine-header';
import { IconBellRinging, IconCopyleft, IconSettings } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SettingsContext } from '../src/static/state';
import { ChangesModal } from './ChangeNotification';
import Credits from './Credits';
import Settings from './Settings';
import ThemeToggle from './ThemeToggle';

function Head() {
    const { changes, setPreviousGames } = useContext(SettingsContext);
    const changesBreakpoint = useMediaQuery('(min-width: 800px)');
    const breakpoint = useMediaQuery('(min-width: 1200px)');
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const router = useRouter();

    const background = colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2];

    return (
        <AppShell.Header bg={background}>
            <Group px={15} h={60} justify="space-between" wrap="nowrap">
                <Group style={{ cursor: 'pointer' }} onClick={() => router.push('/')} justify="center" wrap="nowrap">
                    <Image src={`${router.basePath}/icon.webp`} width={64} height={64} />
                    {breakpoint && (
                        <Title ml={-10} order={2}>
                            Are We Anti-Cheat Yet?
                        </Title>
                    )}
                </Group>
                <Group justify="center">
                    <ThemeToggle />
                    {changes.length > 0 && (
                        <ActionIcon variant="subtle" color="white" onClick={() => openConfirmModal(ChangesModal(changesBreakpoint, changes, setPreviousGames))}>
                            <IconBellRinging />
                        </ActionIcon>
                    )}
                    <ActionIcon variant="subtle" color="white" onClick={() => openModal({ children: <Credits mt={-45} /> })}>
                        <IconCopyleft />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="white" onClick={() => openModal({ children: <Settings /> })}>
                        <IconSettings />
                    </ActionIcon>
                </Group>
            </Group>
        </AppShell.Header>
    );
}

export function Shell({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppShell padding={0} header={{ height: 60, offset: true }}>
                <Head />
                {children}
            </AppShell>
        </>
    );
}
