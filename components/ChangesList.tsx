import {
  Accordion,
  ActionIcon,
  Avatar,
  Button,
  DefaultProps,
  Group,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import {
  IconArrowRight,
  IconArrowsRightLeft,
  IconCheck,
  IconExternalLink,
  IconMinus,
  IconNote,
  IconPlus,
  IconRefresh,
  IconRefreshAlert,
} from '@tabler/icons';
import { useEffect, useState } from 'react';
import Game from '../types/game';
import { getChanges, getLastGames, saveGamesList } from '../utils';
import AntiCheatIcon from './AntiCheatIcon';
import Badges from './Badges';
import StyledAccordion from './StyledAccordion';

interface ChangeProps {
  newGame: Game;
  oldGame: Game | undefined;
  antiCheatIcons: (string | null)[][];
}

function Change({ newGame, oldGame, antiCheatIcons }: ChangeProps) {
  if (!oldGame) {
    return (
      <Group noWrap>
        <ThemeIcon color="green" radius="xl">
          <IconPlus />
        </ThemeIcon>
        <Avatar radius="xl" src={newGame.logo} />
        <Text>{newGame.name}</Text>
      </Group>
    );
  }

  const referenceChanges = (() => {
    if (newGame.reference !== oldGame.reference) {
      if (!oldGame.reference) {
        return (
          <Group sx={{ marginLeft: 50 }}>
            <IconPlus />
            <ActionIcon component="a" target="_blank" href={newGame.reference}>
              <IconExternalLink />
            </ActionIcon>
          </Group>
        );
      }

      if (newGame.reference && oldGame.reference) {
        return (
          <Group sx={{ marginLeft: 50 }}>
            <IconArrowsRightLeft />
            <ActionIcon component="a" target="_blank" href={oldGame.reference}>
              <IconExternalLink />
            </ActionIcon>
            <IconArrowRight />
            <ActionIcon component="a" target="_blank" href={newGame.reference}>
              <IconExternalLink />
            </ActionIcon>
          </Group>
        );
      }
    }
    return <></>;
  })();

  const badgeChanges = (() => {
    if (oldGame.status === newGame.status && oldGame.native === newGame.native) {
      return <></>;
    }

    return (
      <Group sx={{ marginLeft: 50 }}>
        <IconArrowsRightLeft />
        <Badges showText={false} game={oldGame} />
        <IconArrowRight />
        <Badges showText={false} game={newGame} />
      </Group>
    );
  })();

  const noteChanges = (() => {
    if (JSON.stringify(oldGame.notes) === JSON.stringify(newGame.notes)) {
      return <></>;
    }

    if (oldGame.notes.length === 0) {
      return (
        <Group sx={{ marginLeft: 50 }}>
          <IconPlus />
          {newGame.notes.map((note) => (
            <ActionIcon key={note[1]} component="a" target="_blank" href={note[1]}>
              <IconNote />
            </ActionIcon>
          ))}
        </Group>
      );
    }

    if (newGame.notes.length === 0) {
      return (
        <Group sx={{ marginLeft: 50 }}>
          <IconMinus />
          {oldGame.notes.map((note) => (
            <ActionIcon key={note[1]} component="a" target="_blank" href={note[1]}>
              <IconNote />
            </ActionIcon>
          ))}
        </Group>
      );
    }

    return (
      <Group sx={{ marginLeft: 50 }}>
        <IconArrowsRightLeft />
        <Group>
          {oldGame.notes.map((note) => (
            <ActionIcon key={note[1]} component="a" target="_blank" href={note[1]}>
              <IconNote />
            </ActionIcon>
          ))}
        </Group>
        <IconArrowRight />
        <Group>
          {newGame.notes.map((note) => (
            <ActionIcon key={note[1]} component="a" target="_blank" href={note[1]}>
              <IconNote />
            </ActionIcon>
          ))}
        </Group>
      </Group>
    );
  })();

  const anticheatChanges = (() => {
    if (JSON.stringify(oldGame.anticheats) === JSON.stringify(newGame.anticheats)) {
      return <></>;
    }

    return (
      <Group sx={{ marginLeft: 50 }}>
        <IconArrowsRightLeft />
        <Group>
          {oldGame.anticheats.map((anticheat) => (
            <AntiCheatIcon
              key={anticheat}
              anticheat={anticheat}
              showText={false}
              anticheatIcons={antiCheatIcons}
            />
          ))}
        </Group>
        <IconArrowRight />{' '}
        <Group>
          {newGame.anticheats.map((anticheat) => (
            <AntiCheatIcon
              key={anticheat}
              anticheat={anticheat}
              showText={false}
              anticheatIcons={antiCheatIcons}
            />
          ))}
        </Group>
      </Group>
    );
  })();

  return (
    <Stack>
      <Group noWrap>
        <ThemeIcon color="violet" radius="xl">
          <IconRefresh />
        </ThemeIcon>
        <Avatar radius="xl" src={newGame.logo} />
        <Text>{newGame.name}</Text>
      </Group>
      {badgeChanges}
      {referenceChanges}
      {anticheatChanges}
      {noteChanges}
    </Stack>
  );
}

interface ChangesListProps extends DefaultProps {
  games: Game[];
  antiCheatIcons: (string | null)[][];
}

export default function ChangesList({ games, antiCheatIcons, ...props }: ChangesListProps) {
  const [changes, setChanges] = useState<[Game, Game?][]>([]);

  useEffect(() => {
    const old = getLastGames();
    if (old) {
      setChanges(getChanges(old, games));
    } else {
      saveGamesList(games);
    }
  }, [games]);

  if (changes.length > 0) {
    return (
      <StyledAccordion icon={<IconRefreshAlert size={16} />} {...props}>
        <Accordion.Item label={`Changes since you've last checked (${changes.length})`}>
          <Stack>
            {changes.map(([newGame, oldGame]) => (
              <Change
                key={newGame.name}
                newGame={newGame}
                oldGame={oldGame}
                antiCheatIcons={antiCheatIcons}
              />
            ))}
          </Stack>
          <Button
            fullWidth
            color="green"
            sx={{ marginTop: 15 }}
            leftIcon={<IconCheck size={20} />}
            onClick={() => {
              setChanges([]);
              saveGamesList(games);
            }}
          >
            Acknowledge
          </Button>
        </Accordion.Item>
      </StyledAccordion>
    );
  }

  return <></>;
}
