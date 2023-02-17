import { Group, Radio, SimpleGrid, Stack, Tabs } from '@mantine/core';
import { IconBrandAmongUs, IconCards } from '@tabler/icons-react';
import { useContext } from 'react';
import { SettingsContext } from '../src/static/state';
import { Games } from '../src/static';
import BannerRadio from './BannerRadio';
import GameCard from './GameCard';
import GameTable from './GameTable';
import InfoSwitch from './InfoSwitch';
import Overview, { OverviewProps } from './Overview';
import Scope from './Scope';
import Tab from './Tab';

function OverviewTab() {
  const { overview, setOverview } = useContext(SettingsContext);

  const fakeStats: Omit<OverviewProps, 'variant' | 'vertical'> = {
    total: 5,
    broken: 1,
    denied: 1,
    planned: 1,
    running: 1,
    supported: 1,
  };

  return (
    <Group position="center">
      <Radio.Group value={overview} onChange={setOverview}>
        <SimpleGrid cols={3} mt={30}>
          <BannerRadio checked={overview == 'simple'} value="simple" description="Simple Overview">
            <Scope h={200}>
              <Overview vertical variant="simple" {...fakeStats} />
            </Scope>
          </BannerRadio>
          <BannerRadio checked={overview == 'detailed'} value="detailed" description="Detailed Overview">
            <Scope h={200}>
              <Overview vertical variant="detailed" {...fakeStats} />
            </Scope>
          </BannerRadio>
          <BannerRadio checked={overview == 'ring'} value="ring" description="Ring Overview">
            <Scope h={200}>
              <Overview vertical variant="ring" {...fakeStats} />
            </Scope>
          </BannerRadio>
        </SimpleGrid>
      </Radio.Group>
    </Group>
  );
}

function GamesTab() {
  const { display, setDisplay, rowHighlight, setRowHighlight } = useContext(SettingsContext);

  const game = Games.at(0);
  const fakeAssets = new Map([[game.slug, { logo: `/assets/logo-${game.slug}.png` }]]);

  return (
    <Stack>
      <Group position="center">
        <Radio.Group value={display} onChange={setDisplay}>
          <SimpleGrid cols={2} mt={30}>
            <BannerRadio checked={display == 'table'} value="table" description="Table View">
              <Scope h={200} scale={0.15}>
                <GameTable assets={fakeAssets} games={[game]} ignoreFilters />
              </Scope>
            </BannerRadio>
            <BannerRadio checked={display == 'grid'} value="grid" description="Card View">
              <Scope h={200} scale={0.3}>
                <GameCard game={game} banner={`/assets/banner-${game.slug}.png`} />
              </Scope>
            </BannerRadio>
          </SimpleGrid>
        </Radio.Group>
      </Group>
      <InfoSwitch
        size="lg"
        label="Row Highlight"
        description="Tints the table rows according to their status"
        checked={rowHighlight === 'true'}
        onChange={(e) => setRowHighlight(e.currentTarget.checked ? 'true' : 'false')}
      />
    </Stack>
  );
}

export default function () {
  return (
    <Tab mt={-43} defaultValue="overview">
      <Tabs.List>
        <Tabs.Tab value="overview" icon={<IconCards />}>
          Overview
        </Tabs.Tab>
        <Tabs.Tab value="games" icon={<IconBrandAmongUs />}>
          Games
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">
        <OverviewTab />
      </Tabs.Panel>
      <Tabs.Panel value="games">
        <GamesTab />
      </Tabs.Panel>
    </Tab>
  );
}
