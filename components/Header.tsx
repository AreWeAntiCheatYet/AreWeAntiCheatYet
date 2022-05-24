import { ActionIcon, Avatar, Group, Header, Text, Title } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons';
import { style } from '../utils/style';
import ThemeToggle from './ThemeToggle';

export default function AppHeader() {
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
          <ActionIcon
            variant="light"
            color="violet"
            radius="xl"
            component="a"
            target="_blank"
            href="https://github.com/Starz0r/AreWeAntiCheatYet"
          >
            <IconBrandGithub size={18} />
          </ActionIcon>
          <ThemeToggle />
        </Group>
      </Group>
    </Header>
  );
}
