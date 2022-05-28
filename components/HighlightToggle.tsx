import { ActionIcon } from '@mantine/core';
import { IconHighlight, IconHighlightOff } from '@tabler/icons';

interface HighlightToggleProps {
  highlight: boolean;
  toggleHighlight: () => void;
}

export default function HighlightToggle({ highlight, toggleHighlight }: HighlightToggleProps) {
  return (
    <ActionIcon
      onClick={toggleHighlight}
      size="lg"
      radius="xl"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: highlight ? theme.colors.red[4] : theme.colors.gray[4],
      })}
    >
      {highlight ? <IconHighlight size={18} /> : <IconHighlightOff size={18} />}
    </ActionIcon>
  );
}
