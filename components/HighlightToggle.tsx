import { ActionIcon } from '@mantine/core';
import { IconHighlight, IconHighlightOff } from '@tabler/icons';
import { forwardRef } from 'react';

interface HighlightToggleProps {
  highlight: boolean;
  toggleHighlight: () => void;
}

const HighlightToggle = forwardRef<HTMLButtonElement, HighlightToggleProps>(
  ({ highlight, toggleHighlight, ...props }, ref) => (
    <ActionIcon
      onClick={toggleHighlight}
      size="lg"
      radius="xl"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: highlight ? theme.colors.red[4] : theme.colors.gray[4],
      })}
      ref={ref}
      {...props}
    >
      {highlight ? <IconHighlight size={18} /> : <IconHighlightOff size={18} />}
    </ActionIcon>
  )
);

export default HighlightToggle;
