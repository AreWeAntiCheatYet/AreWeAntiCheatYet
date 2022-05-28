import { ActionIcon, Anchor, createStyles, Group, Text, ThemeIcon, Tooltip } from '@mantine/core';
import {
  IconAward,
  IconCheck,
  IconClock,
  IconExternalLink,
  IconMinus,
  IconQuestionMark,
  IconThumbUp,
  IconX,
} from '@tabler/icons';
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
  showText: boolean;
}

export default function Badges({ game, showText }: BadgesProps) {
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

  return (
    <Group>
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
  );
}
