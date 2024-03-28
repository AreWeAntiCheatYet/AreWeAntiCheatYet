import {
    ActionIcon,
    Box,
    Button,
    Card,
    CardProps,
    Group,
    Text,
    Stack,
    ThemeIcon,
    Title,
    Transition,
    useMantineColorScheme,
    useMantineTheme,
} from '@mantine/core';
import { useHover, useMediaQuery } from '@mantine/hooks';
import { openModal } from '@mantine/modals';
import { IconBellRinging, IconCirclePlus } from '@tabler/icons-react';
import Link from 'next/link';
import { CSSProperties } from 'react';
import { Change, Game } from '../src/types/games';
import { getStyle } from '../src/utils/games';
import Changes from './Changes';

interface GameCardProps extends Omit<CardProps, 'withBorder' | 'children' | 'bg'> {
    game: Game;
    banner: string;
    change?: Change;
}

export default function({ w, h, game, banner, change, ...props }: GameCardProps) {
    const { hovered, ref } = useHover();
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    const background = colorScheme === 'dark' ? undefined : theme.colors.gray[5];
    const breakpoint = useMediaQuery('(min-width: 800px)');
    const status = getStyle(game.status);

    const style: CSSProperties = {
        position: 'absolute',
        height: `100%`,
        width: `100%`,
        zIndex: -1,
        left: 0,
        top: 0,
    };

    return (
        <Card withBorder w={w || 300} h={h || 400} bg={background} style={{ zIndex: 0 }} p={0} ref={ref} {...props}>
            <Box
                style={
                    banner
                        ? {
                            background: `url('${banner}') center / cover , linear-gradient(black, gray)`,
                            filter: 'blur(5px)',
                            opacity: 0.3,
                            ...style,
                        }
                        : undefined
                }
            />
            <Box
                style={{
                    mask: 'linear-gradient(transparent, black 100%)',
                    background: status.mask || status.color,
                    backdropFilter: 'blur(10px)',
                    opacity: 0.2,
                    ...style,
                }}
            />
            {change && (
                <Group
                    my={15}
                    mx={-15}
                    justify="right"
                    style={{ width: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}
                >
                    {change.old ? (
                        <ActionIcon
                            color="gray.0"
                            variant="transparent"
                            onClick={() =>
                                openModal({
                                    children: <Changes change={change} />,
                                    size: breakpoint ? 600 : undefined,
                                    fullScreen: !breakpoint,
                                })
                            }
                        >
                            <IconBellRinging />
                        </ActionIcon>
                    ) : (
                        <IconCirclePlus color="white" />
                    )}
                </Group>
            )}
            <Stack align="center" mt={150}>
                <ThemeIcon color={status.color} size={50} radius="xl">
                    <status.icon />
                </ThemeIcon>
                <Title order={4}>
                    <Text fw={150} c="white" ta="center">
                        {game.name}
                    </Text>
                </Title>
            </Stack>
            <Transition transition={'fade'} mounted={hovered}>
                {(styles) => (
                    <div style={{ position: 'absolute', bottom: '50px', width: `${w || 300}px` }}>
                        <Stack justify="flex-end" align="center" style={styles}>
                            <Button component={Link} href={`/game/${game.slug}`} color={status.color} variant="light">
                                See more
                            </Button>
                        </Stack>
                    </div>
                )}
            </Transition>
        </Card>
    );
}
