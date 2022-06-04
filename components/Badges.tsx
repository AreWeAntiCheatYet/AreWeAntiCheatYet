import {
  ActionIcon,
  Anchor,
  Button,
  createStyles,
  Group,
  Spoiler,
  Stack,
  Text,
  ThemeIcon,
  Timeline,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useModals } from '@mantine/modals';
import {
  IconAward,
  IconCalendarEvent,
  IconCheck,
  IconClock,
  IconExternalLink,
  IconMinus,
  IconQuestionMark,
  IconThumbUp,
  IconX,
} from '@tabler/icons';
import dayjs from 'dayjs';
import Game, { GameStatus } from '../types/game';

const useStyle = createStyles((theme) => ({
  mobileHide: {
    [theme.fn.smallerThan('sm')]: { display: 'none' },
  },
  mobileShow: {
    [theme.fn.largerThan('sm')]: { display: 'none' },
  },
}));

interface BadgesProps {
  game: Game;
  compact?: boolean;
  showText: boolean;
}

export default function Badges({ game, compact, showText }: BadgesProps) {
  const modals = useModals();
  const { classes } = useStyle();
  const status = game.status[0].toUpperCase() + game.status.substring(1);

  const info: [string, JSX.Element] = (() => {
    switch (game.status) {
      case GameStatus.denied:
        return ['red', <IconX size={18} />];
      case GameStatus.broken:
        return ['orange', <IconMinus size={18} />];
      case GameStatus.supported:
        return ['green', <IconCheck size={18} />];
      case GameStatus.running:
        return ['cyan', <IconThumbUp size={18} />];
      case GameStatus.planned:
        return ['violet', <IconClock size={18} />];
      default:
        return ['gray', <IconQuestionMark size={18} />];
    }
  })();

  const openInfoModal = () => {
    const id = modals.openModal({
      title: 'Recorded updates',
      children: (
        <>
          <Timeline active={game.updates && game.updates.length - 1}>
            {game.updates.map((update) => (
              <Timeline.Item key={update.reference} title={update.name}>
                <Anchor target="_blank" href={update.reference}>
                  {update.referenceTitle || 'Reference'}
                </Anchor>
                {update.referenceDescription && (
                  <Spoiler
                    maxHeight={20}
                    hideLabel="Hide"
                    showLabel="Show more"
                    transitionDuration={0}
                  >
                    <Text size="sm" mt={2}>
                      {update.referenceDescription}
                    </Text>
                  </Spoiler>
                )}
                <Text size="xs" mt={4}>
                  {new Date(update.date).toLocaleDateString()} ({dayjs(update.date).fromNow()})
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
          <Group position="right">
            <Button onClick={() => modals.closeModal(id)}>Close</Button>
          </Group>
        </>
      ),
    });
  };

  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.sm}px)`, false);

  const Container = compact ? Group : Stack;

  return (
    <Container>
      <Group noWrap={matches}>
        {game.native && (
          <Tooltip withArrow label="Also runs native">
            <ThemeIcon color="green" radius="xl">
              <IconAward size={16} />
            </ThemeIcon>
          </Tooltip>
        )}
        <ThemeIcon color={info[0]} radius="xl">
          {info[1]}
        </ThemeIcon>
        {showText && game.updates && game.updates.length > 0 && (
          <ActionIcon
            radius="xl"
            color="teal"
            variant="filled"
            onClick={openInfoModal}
            className={classes.mobileShow}
          >
            <IconCalendarEvent size={16} />
          </ActionIcon>
        )}
        {showText &&
          (game.reference ? (
            <>
              <Anchor className={classes.mobileHide} target="_blank" href={game.reference}>
                {status}
              </Anchor>
              <ActionIcon
                component="a"
                target="_blank"
                href={game.reference}
                className={classes.mobileShow}
              >
                <IconExternalLink />
              </ActionIcon>
            </>
          ) : (
            <Text className={classes.mobileHide}>{status}</Text>
          ))}
      </Group>
      {game.updates && game.updates.length > 0 && (
        <Group noWrap className={classes.mobileHide}>
          <ActionIcon
            radius="xl"
            color="teal"
            component="a"
            target="_blank"
            variant="filled"
            onClick={openInfoModal}
          >
            <IconCalendarEvent size={16} />
          </ActionIcon>
          <Anchor onClick={openInfoModal}>{dayjs(game.updates.at(-1)!.date).fromNow()}</Anchor>
          <ActionIcon component="a" target="_blank" href={game.updates.at(-1)?.reference}>
            <IconExternalLink />
          </ActionIcon>
        </Group>
      )}
    </Container>
  );
}
