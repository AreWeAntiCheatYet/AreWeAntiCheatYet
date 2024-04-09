import {
    ActionIcon,
    Avatar,
    Group,
    MantineStyleProp,
    Pagination,
    rgba,
    ScrollArea,
    Stack,
    StackProps,
    Table,
    Text,
    ThemeIcon,
    useMantineTheme,
} from '@mantine/core';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';
import { openModal } from '@mantine/modals';
import {
    IconBellRinging,
    IconCalendarEvent,
    IconCirclePlus,
    IconExternalLink,
    IconQuestionMark,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../src/static/state';
import { Asset } from '../src/types/assets';
import { Game } from '../src/types/games';
import { getStyle } from '../src/utils/games';
import { themeColor } from '../src/utils/theming';
import AntiCheatBadge from './AntiCheatBadge';
import Changes from './Changes';
import Filters from './Filters';
import Notes from './Notes';
import StatusBadge from './StatusBadge';

function GameUpdate({ game }: { game: Game }) {
    const updatesSorted = game.updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const mostRecentUpdate = updatesSorted[0];

    const [update, setUpdate] = useState(mostRecentUpdate?.date);
    const { basePath } = useRouter();

    useEffect(() => {
        dayjs.extend(relativeTime);
        setUpdate(dayjs(mostRecentUpdate?.date).fromNow());
    }, []);

    const theme = useMantineTheme();
    const yellow4 = theme.colors.yellow[4];

    if (mostRecentUpdate) {
        // TODO: for some reason mantine wants to override
        // the actual color I want to put here. so I have
        // to wrap the text in another div to get it to
        // inherit the right color.
        return (
            <Group wrap="nowrap">
                <ThemeIcon color="green" radius="xl">
                    <IconCalendarEvent size={16} />
                </ThemeIcon>
                <Text c={yellow4} style={{ color: yellow4 }} component="a" target="_blank" href={`${basePath}/game/${game.slug}`}>
                    <div color={yellow4}>
                        {update}
                    </div>
                </Text>
            </Group>
        );
    }

    return;
}

interface GameTableProps extends Omit<StackProps, 'align' | 'style'> {
    assets: Map<string, Partial<Asset>>;
    ignoreFilters?: boolean;
    totalPages?: number;
    games: Game[];
    page?: number;
    style?: MantineStyleProp;
}

export default function({ assets, ignoreFilters, games, style, page, totalPages, ...props }: GameTableProps) {
    const breakpoint = useMediaQuery('(min-width: 1200px)') ?? true;
    const [filteredGames, setGames] = useState(games);
    const [filtered, setFiltered] = useState(false);
    const router = useRouter();

    const { rowHighlight, changes } = useContext(SettingsContext);
    const { width } = useViewportSize();
    const theme = useMantineTheme();
    const themeColorFn = themeColor(theme);

    const body = filteredGames.map((game) => {
        const { name, slug, url, status } = game;
        const { logo } = assets.get(slug);
        const style = getStyle(status);

        const change = changes.find((x) => x.recent.slug === slug);
        const highlightColor = rgba(themeColorFn(style.color, 8), 0.2);

        return (
            <Table.Tr key={name} style={rowHighlight === 'true' ? { backgroundColor: highlightColor } : undefined}>
                <Table.Td>
                    <Group wrap="nowrap">
                        {logo ? (
                            <Avatar src={logo} radius="md" w={16} />
                        ) : (
                            <ThemeIcon color="gray" size={40}>
                                <IconQuestionMark size={16} />
                            </ThemeIcon>
                        )}
                        <Text variant={url ? 'link' : undefined} component={url ? 'a' : undefined} target="_blank" href={url}>
                            {name}
                        </Text>
                    </Group>
                </Table.Td>
                <Table.Td>
                    <StatusBadge variant="text" size={16} game={game} />
                </Table.Td>
                <Table.Td>
                    <Group wrap="nowrap">
                        {game.anticheats.map((anticheat) => (
                            <AntiCheatBadge key={anticheat} anticheat={anticheat} height={25} />
                        ))}
                    </Group>
                </Table.Td>
                <Table.Td style={{ padding: '10px' }}>
                    {game.notes.length > 0 ? <Notes iconSize={16} size="md" fz="sm" game={game} /> : <></>}
                </Table.Td>
                <Table.Td>
                    <GameUpdate game={game} />
                </Table.Td>
                <Table.Td>
                    <Group wrap="nowrap">
                        <ActionIcon
                            variant="transparent"
                            component="a"
                            target="_blank"
                            href={`${router.basePath}/game/${game.slug}`}
                        >
                            <IconExternalLink color="white" />
                        </ActionIcon>
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
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <Stack align="center" {...props}>
            <Group justify="center">
                <Filters
                    page={page}
                    setGames={setGames}
                    initialGames={games}
                    games={filteredGames}
                    ignore={ignoreFilters}
                    setFiltered={setFiltered}
                />
            </Group>
            <ScrollArea type="never" w={style ? undefined : width * 0.8} style={style}>
                <Table withTableBorder withColumnBorders striped>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Anti-Cheats</Table.Th>
                            <Table.Th>Notes</Table.Th>
                            <Table.Th>Recorded Updates</Table.Th>
                            <Table.Th>Details</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{body}</Table.Tbody>
                </Table>
            </ScrollArea>
            {!!page && !filtered && (
                <Pagination
                    radius="md"
                    value={page}
                    total={totalPages}
                    size={breakpoint ? 'lg' : undefined}
                    onChange={(value) => router.push(`/table/${value}`)}
                />
            )}
        </Stack>
    );
}
