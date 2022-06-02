import { AppShell, Stack } from '@mantine/core';
import { getCookie, setCookies } from 'cookies-next';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { promises as fs } from 'fs';
import { InferGetStaticPropsType } from 'next';
import { useEffect, useMemo, useState } from 'react';
import Breakdown from '../components/Breakdown';
import ChangesList from '../components/ChangesList';
import Definitions from '../components/Definitions';
import AppFooter from '../components/Footer';
import GamesList from '../components/GamesList';
import AppHeader from '../components/Header';
import InfoAlert from '../components/InfoAlert';
import Overview from '../components/Overview';
import {
  downloadImagesAndSetLogo,
  fetchReferenceTitles,
  generateAntiCheatIconLookUp,
  generateBreakdown,
  generateOverview,
} from '../utils/compile_time';
import { style } from '../utils/style';

export const getStaticProps = async () => {
  const games = await fetchReferenceTitles(
    await downloadImagesAndSetLogo(JSON.parse(await fs.readFile('./games.json', 'utf8')))
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
  useMemo(() => dayjs.extend(relativeTime), []);
  const [highlightColors, setHighlightColors] = useState(false);

  useEffect(() => {
    setHighlightColors(getCookie('highlightColors') as boolean);
  }, []);

  const toggleHighlight = () => {
    setHighlightColors(!highlightColors);
    setCookies('highlightColors', `${!highlightColors}`, {
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'strict',
    });
  };

  return (
    <AppShell
      padding="md"
      header={<AppHeader highlight={highlightColors} toggleHighlight={toggleHighlight} />}
      fixed
    >
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
          statusOverview={overview}
          className={classes.breakdownWidth}
          sx={{ marginBottom: 25 }}
        />
        <InfoAlert />
        <GamesList
          highlight={highlightColors}
          className={classes.tableWidth}
          anticheatIcons={antiCheatIcons}
          games={games}
        />
        <AppFooter lastBuildTime={lastBuildTime} />
      </Stack>
    </AppShell>
  );
}
