import { Avatar, Group, Text, ThemeIcon } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons';
import { style } from '../utils/style';

interface AntiCheatIconProps {
  anticheat: string;
  showText: boolean;
  anticheatIcons: (string | null)[][];
}

export default function AntiCheatIcon({ anticheat, showText, anticheatIcons }: AntiCheatIconProps) {
  const { classes } = style();
  const icon = anticheatIcons.find((item) => item[0] === anticheat)!;

  return (
    <Group>
      {icon[1] ? (
        <Avatar radius="xs" size="sm" src={icon[1]} />
      ) : (
        <ThemeIcon radius="xs">
          <IconQuestionMark size={18} />
        </ThemeIcon>
      )}
      {showText ? (
        <Text align="center" className={classes.mobileHide}>
          {anticheat}
        </Text>
      ) : (
        <></>
      )}
    </Group>
  );
}
