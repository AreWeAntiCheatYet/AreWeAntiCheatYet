import { AppShell, Stack } from '@mantine/core';
import { promises as fs } from 'fs';
import { InferGetStaticPropsType } from 'next';
import Breakdown from '../components/Breakdown';
import ChangesList from '../components/ChangesList';
import AppFooter from '../components/Footer';
import GamesList from '../components/GamesList';
import AppHeader from '../components/Header';
import Overview from '../components/Overview';
import {
  fixIcons,
  generateAntiCheatIconLookUp,
  generateBreakdown,
  generateOverview,
} from '../utils';
import { style } from '../utils/style';

export const getStaticProps = async () => {
  const games = await fixIcons(JSON.parse(await fs.readFile('./static/games.json', 'utf8')));
  const overview = generateOverview(games);
  const breakdown = generateBreakdown(games);
  const lastBuildTime = new Date().getTime();
  const antiCheatIcons = generateAntiCheatIconLookUp(games);

  return {
    props: { games, overview, breakdown, antiCheatIcons, lastBuildTime },
  };
};

export default function Home({
  games,
  overview,
  breakdown,
  antiCheatIcons,
  lastBuildTime,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { classes } = style();

  return (
    <AppShell padding="md" header={<AppHeader />} fixed>
      <Stack align="center" sx={{ marginTop: 25 }}>
        <Overview overview={overview} sx={{ marginBottom: 25 }} />
        <ChangesList
          games={games}
          antiCheatIcons={antiCheatIcons}
          className={classes.breakdownWidth}
        />
        <Breakdown
          breakdown={breakdown}
          className={classes.breakdownWidth}
          sx={{ marginBottom: 25 }}
        />
        <GamesList className={classes.tableWidth} anticheatIcons={antiCheatIcons} games={games} />
        <AppFooter lastBuildTime={lastBuildTime} />
      </Stack>
    </AppShell>
  );
}
