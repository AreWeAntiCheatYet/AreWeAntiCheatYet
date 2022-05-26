import { AppShell, Stack } from '@mantine/core';
import { promises as fs } from 'fs';
import { InferGetStaticPropsType } from 'next';
import Breakdown from '../components/Breakdown';
import ChangesList from '../components/ChangesList';
import Definitions from '../components/Definitions';
import AppFooter from '../components/Footer';
import GamesList from '../components/GamesList';
import AppHeader from '../components/Header';
import Overview from '../components/Overview';
import {
  downloadImagesAndSetLogo,
  generateAntiCheatIconLookUp,
  generateBreakdown,
  generateOverview,
} from '../utils/compile_time';
import { style } from '../utils/style';

export const getStaticProps = async () => {
  const games = await downloadImagesAndSetLogo(
    JSON.parse(await fs.readFile('./games.json', 'utf8'))
  );

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
        <Definitions className={classes.breakdownWidth} />
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
