import { Group, Modal, Radio, SimpleGrid, Tabs } from '@mantine/core';
import { IconBrandAmongUs, IconCards } from '@tabler/icons-react';
import { useContext } from 'react';
import { SettingsContext } from '../src/app/state';
import BannerRadio from './BannerRadio';
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

export default function ({ open, setOpen }: { open: boolean; setOpen: (enabled: boolean) => void }) {
  return (
    <Modal centered opened={open} onClose={() => setOpen(false)} overlayBlur={3} radius="lg">
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
      </Tab>
    </Modal>
  );
}
