import { ActionIcon, Avatar, Group, Header, Text, Title, Tooltip } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons';
import { style } from '../utils/style';
import HighlightToggle from './HighlightToggle';
import ShowStoresToggle from './ShowStoresToggle';
import ThemeToggle from './ThemeToggle';

interface AppHeaderProps {
  highlight: boolean;
  toggleHighlight: () => void;
  showStores: boolean;
  toggleShowStores: () => void;
}

export default function AppHeader({
  highlight,
  toggleHighlight,
  showStores,
  toggleShowStores,
}: AppHeaderProps) {
  const { classes } = style();

  return (
    <Header height={60}>
      <Group position="apart" sx={{ marginLeft: 15, marginRight: 15, height: '100%' }} noWrap>
        <Group position="center" noWrap>
          <Avatar src="icon.webp" size="lg" />
          <Title order={4}>Are We Anti-Cheat Yet?</Title>
        </Group>
        <Text className={classes.smallHide}>
          A comprehensive and crowd-sourced list of games using anti-cheats and their compatibility
          with GNU/Linux or Wine/Proton.{' '}
        </Text>
        <Group position="center" noWrap>
          <Tooltip label="Open on GitHub">
            <ActionIcon
              radius="xl"
              component="a"
              color="violet"
              variant="light"
              target="_blank"
              href="https://github.com/Starz0r/AreWeAntiCheatYet"
            >
              <IconBrandGithub size={18} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Toggle Dark-Theme">
            <ThemeToggle />
          </Tooltip>
          <Tooltip label="Toggle Row-Highlight">
            <HighlightToggle highlight={highlight} toggleHighlight={toggleHighlight} />
          </Tooltip>
          <Tooltip label="Toggle Store Info">
            <ShowStoresToggle showStores={showStores} toggleShowStores={toggleShowStores} />
          </Tooltip>
        </Group>
      </Group>
    </Header>
  );
}
