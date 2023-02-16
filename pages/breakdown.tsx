import { Blockquote, Group, Stack, Title } from '@mantine/core';
import { InferGetStaticPropsType } from 'next';
import { useContext, useState } from 'react';
import ImageSelect from '../components/ImageSelect';
import Overview from '../components/Overview';
import { SettingsContext } from '../src/app/state';
import { Games } from '../src/static';
import { getLogo, query, stats } from '../src/utils/games';

export const getStaticProps = async () => {
  const { ...statuses } = stats();
  const total = Games.length;

  const anticheats = [...new Set(Games.map((x) => x.anticheats).flat())];

  const breakdown = anticheats.map((anticheat) => {
    const games = query((game) => game.anticheats.includes(anticheat));
    return [anticheat, { ...stats(games), total: games.length }];
  }) as [anticheat: string, stats: ReturnType<typeof stats> & { total: number }][];

  return { props: { ...statuses, total, anticheats, breakdown } };
};

export default function ({ anticheats, breakdown, ...stats }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { overview } = useContext(SettingsContext);
  const [selectedAnticheat, setAnticheat] = useState(anticheats.at(0));

  const breakdownMap = new Map(breakdown);
  const anticheatStats = breakdownMap.get(selectedAnticheat);

  return (
    <Stack align="center" mt={70} mb={50}>
      <Blockquote cite="- Starz0r" mb={50}>
        A comprehensive and crowd-sourced list of games using anti-cheats and their compatibility with GNU/Linux or
        Wine/Proton.
      </Blockquote>
      <Title mt={20}>Total</Title>
      <Overview
        variant={overview}
        total={stats.total}
        broken={stats.broken}
        denied={stats.denied}
        planned={stats.planned}
        running={stats.running}
        supported={stats.supported}
      />
      <Group mt={30} noWrap>
        <Title>Breakdown for</Title>
        <ImageSelect
          searchable
          onChange={setAnticheat}
          value={selectedAnticheat}
          nothingFound="No such AntiCheat"
          placeholder="Select Anticheat..."
          data={anticheats.map((anticheat) => {
            const logo = getLogo(anticheat);
            return { value: anticheat, label: anticheat, image: logo };
          })}
        />
      </Group>
      <Overview
        variant={overview}
        total={anticheatStats.total}
        broken={anticheatStats.broken}
        denied={anticheatStats.denied}
        planned={anticheatStats.planned}
        running={anticheatStats.running}
        supported={anticheatStats.supported}
      />
    </Stack>
  );
}
