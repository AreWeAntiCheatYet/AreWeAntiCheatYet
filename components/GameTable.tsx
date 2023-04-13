import {
    ActionIcon,
    Avatar,
    Group,
    Pagination,
    ScrollArea,
    Stack,
    StackProps,
    Sx,
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

    if (mostRecentUpdate) {
        return (
            <Group noWrap>
                <ThemeIcon color="green" radius="xl">
                    <IconCalendarEvent size={16} />
                </ThemeIcon>
                <Text variant="link" component="a" target="_blank" href={`${basePath}/game/${game.slug}`}>
                    {update}
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
    style?: Sx;
}

export default function({ assets, ignoreFilters, games, style, page, totalPages, ...props }: GameTableProps) {
    const breakpoint = useMediaQuery('(min-width: 1200px)') ?? true;
    const [filteredGames, setGames] = useState(games);
    const [filtered, setFiltered] = useState(false);
    const router = useRouter();

    const { rowHighlight, changes } = useContext(SettingsContext);
    const { width } = useViewportSize();
    const theme = useMantineTheme();

    const body = filteredGames.map((game) => {
        const { name, slug, url, status } = game;
        const { logo } = assets.get(slug);
        const style = getStyle(status);

        const change = changes.find((x) => x.recent.slug === slug);
        const highlightColor = theme.fn.rgba(theme.fn.themeColor(style.color, 8), 0.2);

        return (
            <tr key={name} style={rowHighlight === 'true' ? { backgroundColor: highlightColor } : undefined}>
                <td>
                    <Group noWrap>
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
                </td>
                <td>
                    <StatusBadge variant="text" size={16} game={game} />
                </td>
                <td>
                    <Group noWrap>
                        {game.anticheats.map((anticheat) => (
                            <AntiCheatBadge key={anticheat} anticheat={anticheat} height={25} />
                        ))}
                    </Group>
                </td>
                <td style={{ padding: '10px' }}>
                    {game.notes.length > 0 ? <Notes iconSize={16} size="md" fz="sm" game={game} /> : <></>}
                </td>
                <td>
                    <GameUpdate game={game} />
                </td>
                <td>
                    <Group noWrap>
                        <ActionIcon
                            variant="transparent"
                            component="a"
                            target="_blank"
                            href={`${router.basePath}/game/${game.slug}`}
                        >
                            <IconExternalLink />
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
                </td>
            </tr>
        );
    });

    return (
        <Stack align="center" {...props}>
            <Group position="center">
                <Filters
                    page={page}
                    setGames={setGames}
                    initialGames={games}
                    games={filteredGames}
                    ignore={ignoreFilters}
                    setFiltered={setFiltered}
                />
            </Group>
            <ScrollArea type="never" w={style ? undefined : width * 0.8} sx={style}>
                <Table withBorder withColumnBorders striped>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Anti-Cheats</th>
                            <th>Notes</th>
                            <th>Recorded Updates</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>{body}</tbody>
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
