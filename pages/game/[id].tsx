import {
    ActionIcon,
    Box,
    Center,
    Grid,
    Group,
    Paper,
    Stack,
    Text,
    Title,
    Tooltip,
    useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { openModal } from '@mantine/modals';
import { IconAward, IconBellRinging, IconCirclePlus, IconQuestionMark, IconWorld } from '@tabler/icons-react';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { CSSProperties, useContext } from 'react';
import AntiCheatBadge from '../../components/AntiCheatBadge';
import Changes from '../../components/Changes';
import Notes from '../../components/Notes';
import Reference from '../../components/Reference';
import StatusBadge from '../../components/StatusBadge';
import StoreBadges from '../../components/StoreBadges';
import Updates from '../../components/Updates';
import { assets } from '../../src/assets';
import { Games } from '../../src/static';
import { SettingsContext } from '../../src/static/state';

export const getStaticProps = async ({ params: { id } }) => {
    const game = Games.find((x) => x.slug === id || x.storeIds.steam === id);
    const asset = await assets(game);

    return { props: { game, id, banner: asset.banner || null } };
};

export const getStaticPaths = async () => {
    const paths = Games.map((game) => ({ params: { id: game.slug } }));

    for (const game of Games) {
        if (game.storeIds.steam) {
            paths.push({ params: { id: game.storeIds.steam } });
        }
    }

    return { paths, fallback: false };
};

export default function({ banner, game }: InferGetStaticPropsType<typeof getStaticProps>) {
    const breakpoint = useMediaQuery('(min-width: 1200px)') ?? true;
    const { changes } = useContext(SettingsContext);
    const theme = useMantineTheme();

    const change = changes.find((x) => x.recent.slug === game.slug);
    const background = banner ? theme.colors.dark[6] : 'gray';

    const style: CSSProperties = {
        position: 'absolute',
        width: `inherit`,
        height: `100%`,
        zIndex: -1,
    };

    return (
        <>
            <Head>
                <meta name="og:image" content={banner} />
                <meta name="og:title" content={game.name} />
                <title>{game.name + ' - AreWeAntiCheatYet'}</title>
                <meta name="og:description" content={`${game.name} on AreWeAntiCheatYet`} />
                <meta
                    name="description"
                    key="desc"
                    content={`See Game Status and Updates of ${game.name} on AreWeAntiCheatYet`}
                />
            </Head>
            <Grid columns={breakpoint ? 3 : 1} m={0} style={{ height: '100%' }}>
                <Grid.Col span={1} p={0}>
                    <Box style={{ position: 'relative', overflow: 'hidden', height: '100%', width: '100%' }}>
                        <Box bg={background} style={{ ...style }} />
                        <Box
                            style={
                                banner
                                    ? {
                                        background: `url('${banner}') center / cover , linear-gradient(black, gray)`,
                                        filter: 'blur(50px)',
                                        opacity: 0.5,
                                        ...style,
                                    }
                                    : undefined
                            }
                        />
                        <Center mt={80}>
                            <Stack align="center">
                                <Paper radius="xl" shadow="xl" style={{ overflow: 'hidden' }}>
                                    {banner ? (
                                        <Image src={banner} style={{ objectFit: 'cover' }} alt="Banner" width={220} height={310} />
                                    ) : (
                                        <Center bg="gray" w={220} h={310}>
                                            <IconQuestionMark size={32} />
                                        </Center>
                                    )}
                                </Paper>
                                <Text c="white" ta="center" size="34px" fw={700}>
                                    {game.name}
                                </Text>
                                {game.url && (
                                    <ActionIcon variant="transparent" component="a" href={game.url} target="_blank">
                                        <IconWorld color="white" size={64} />
                                    </ActionIcon>
                                )}
                                <StatusBadge mt={20} shadow="lg" fz="lg" weight={700} size={32} game={game} />
                                <Group mt={15} wrap="nowrap">
                                    {game.native && (
                                        <Tooltip label="Native">
                                            <IconAward size={48} />
                                        </Tooltip>
                                    )}
                                    {change &&
                                        (change.old ? (
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
                                        ))}
                                </Group>
                                {game.anticheats.length > 0 && (
                                    <>
                                        <Text mt={20} fz="md" c="dimmed">
                                            AntiCheat
                                        </Text>
                                        <Group wrap="nowrap" mb={20}>
                                            {game.anticheats.map((anticheat) => (
                                                <AntiCheatBadge key={anticheat} anticheat={anticheat} height={64} />
                                            ))}
                                        </Group>
                                    </>
                                )}
                                {Object.entries(game.storeIds).length > 0 && (
                                    <>
                                        <Text mt={20} fz="md" c="dimmed">
                                            Available on
                                        </Text>
                                        <StoreBadges game={game} height={64} mb={20} />
                                    </>
                                )}
                            </Stack>
                        </Center>
                    </Box>
                </Grid.Col>
                <Grid.Col mt={25} span={breakpoint ? 2 : 1}>
                    <Grid columns={breakpoint ? 2 : 1} style={{ height: '100%' }}>
                        <Grid.Col p={50} span={1}>
                            <Title>Updates</Title>
                            <Updates mt={55} game={game} />
                        </Grid.Col>
                        <Grid.Col p={50} span={1}>
                            <Title>Notes</Title>
                            <Notes mt={50} game={game} />
                        </Grid.Col>
                        <Grid.Col p={50} offset={breakpoint ? 1 : 0} span={1}>
                            <Title>Reference</Title>
                            <Reference mt={55} game={game} />
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
            </Grid>
        </>
    );
}
