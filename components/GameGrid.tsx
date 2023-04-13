import { Group, Pagination, SimpleGrid, Stack, StackProps } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/dist/client/router';
import { useContext, useState } from 'react';
import { SettingsContext } from '../src/static/state';
import { Asset } from '../src/types/assets';
import { Game } from '../src/types/games';
import Filters from './Filters';
import GameCard from './GameCard';

interface GameGridProps extends Omit<StackProps, 'align'> {
    assets: Map<string, Partial<Asset>>;
    totalPages: number;
    games: Game[];
    page: number;
}

export default function({ page, games, totalPages, assets, ...props }: GameGridProps) {
    const breakpoint = useMediaQuery('(min-width: 1200px)') ?? true;
    const [filteredGames, setGames] = useState(games);
    const [filtered, setFiltered] = useState(false);
    const { changes } = useContext(SettingsContext);
    const router = useRouter();

    return (
        <Stack align="center" {...props}>
            <Group position="center">
                <Filters games={filteredGames} page={page} initialGames={games} setFiltered={setFiltered} setGames={setGames} />
            </Group>
            <SimpleGrid
                spacing="xl"
                cols={4}
                breakpoints={[
                    { cols: 2, maxWidth: 1335 },
                    { cols: 1, maxWidth: 715 },
                ]}
                {...props}
            >
                {filteredGames.map((game) => {
                    const { slug } = game;
                    const change = changes.find((x) => x.recent.slug === slug);
                    return <GameCard key={slug} game={game} banner={assets.get(slug).banner} change={change} />;
                })}
            </SimpleGrid>
            {!filtered && (
                <Pagination
                    radius="md"
                    value={page}
                    total={totalPages}
                    size={breakpoint ? 'lg' : undefined}
                    onChange={(value) => router.push(`/grid/${value}`)}
                />
            )}
        </Stack>
    );
}
