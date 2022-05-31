import {
  Accordion,
  ActionIcon,
  Anchor,
  Avatar,
  Button,
  DefaultProps,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import {
  IconArrowRight,
  IconArrowsRightLeft,
  IconCalendarEvent,
  IconCheck,
  IconExternalLink,
  IconMinus,
  IconNote,
  IconPlus,
  IconRefresh,
  IconRefreshAlert,
} from '@tabler/icons';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
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
        <Badges showText={false} game={newGame} />
      </Group>
    );
  }

  const referenceChanges = useMemo(() => {
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
    return undefined;
  }, []);

  const updateChanges = useMemo(() => {
    if (
      !newGame.updates ||
      newGame.updates.length === 0 ||
      JSON.stringify(oldGame.updates) === JSON.stringify(newGame.updates)
    ) {
      return undefined;
    }

    return (
      <Group sx={{ marginLeft: 50 }}>
        <IconCalendarEvent />
        <Text>
          New Updates:{' '}
          <Anchor target="_blank" href={newGame.updates.at(-1)!.reference}>
            {newGame.updates.at(-1)!.name}
          </Anchor>{' '}
          ({dayjs(newGame.updates.at(-1)!.date).fromNow()})
        </Text>
      </Group>
    );
  }, []);

  const badgeChanges = useMemo(() => {
    if (oldGame.status === newGame.status && oldGame.native === newGame.native) {
      return undefined;
    }

    return (
      <Group sx={{ marginLeft: 50 }}>
        <IconArrowsRightLeft />
        <Badges showText={false} game={oldGame} />
        <IconArrowRight />
        <Badges showText={false} game={newGame} />
      </Group>
    );
  }, []);

  const noteChanges = useMemo(() => {
    if (JSON.stringify(oldGame.notes) === JSON.stringify(newGame.notes)) {
      return undefined;
    }

    if (oldGame.notes.length === 0) {
      return (
        <Group sx={{ marginLeft: 50 }} noWrap>
          <IconPlus />
          <Stack>
            {newGame.notes.map((note) =>
              note[1] ? (
                <Group key={note[1]} noWrap>
                  <ActionIcon component="a" target="_blank" href={note[1]}>
                    <IconNote />
                  </ActionIcon>
                  <Anchor target="_blank" href={note[1]}>
                    {note[0]}
                  </Anchor>
                </Group>
              ) : (
                <Group key={note[0]} noWrap>
                  <IconNote />
                  <Text>{note[0]}</Text>
                </Group>
              )
            )}
          </Stack>
        </Group>
      );
    }

    if (newGame.notes.length === 0) {
      return (
        <Group sx={{ marginLeft: 50 }} noWrap>
          <IconMinus />
          <Stack>
            {oldGame.notes.map((note) =>
              note[1] ? (
                <Group key={note[1]} noWrap>
                  <ActionIcon component="a" target="_blank" href={note[1]}>
                    <IconNote />
                  </ActionIcon>
                  <Anchor target="_blank" href={note[1]}>
                    {note[0]}
                  </Anchor>
                </Group>
              ) : (
                <Group key={note[0]} noWrap>
                  <IconNote />
                  <Text>{note[0]}</Text>
                </Group>
              )
            )}
          </Stack>
        </Group>
      );
    }

    return (
      <Group sx={{ marginLeft: 50 }}>
        <IconArrowsRightLeft />
        <Group>
          {oldGame.notes.map((note) => (
            <Tooltip withArrow label={note[0]} key={note[1]}>
              <ActionIcon component="a" target="_blank" href={note[1]}>
                <IconNote />
              </ActionIcon>
            </Tooltip>
          ))}
        </Group>
        <IconArrowRight />
        <Group>
          {newGame.notes.map((note) => (
            <Tooltip withArrow label={note[0]} key={note[1]}>
              <ActionIcon component="a" target="_blank" href={note[1]}>
                <IconNote />
              </ActionIcon>
            </Tooltip>
          ))}
        </Group>
      </Group>
    );
  }, []);

  const anticheatChanges = useMemo(() => {
    if (JSON.stringify(oldGame.anticheats) === JSON.stringify(newGame.anticheats)) {
      return undefined;
    }

    return (
      <Group sx={{ marginLeft: 50 }}>
        <IconArrowsRightLeft />
        <Group>
          {oldGame.anticheats.map((anticheat) => (
            <Tooltip key={anticheat} withArrow label={anticheat}>
              <AntiCheatIcon
                anticheat={anticheat}
                showText={false}
                anticheatIcons={antiCheatIcons}
              />
            </Tooltip>
          ))}
        </Group>
        <IconArrowRight />{' '}
        <Group>
          {newGame.anticheats.map((anticheat) => (
            <Tooltip key={anticheat} withArrow label={anticheat}>
              <AntiCheatIcon
                anticheat={anticheat}
                showText={false}
                anticheatIcons={antiCheatIcons}
              />
            </Tooltip>
          ))}
        </Group>
      </Group>
    );
  }, []);

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
      {updateChanges}
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
