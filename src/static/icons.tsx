import { MantineColor } from '@mantine/core';
import { IconHandStop, IconHourglass, IconMoodSad, IconRocket, IconRun } from '@tabler/icons-react';

export interface StatusStyle {
  mask?: string;
  color: MantineColor;
  icon: typeof IconHandStop;
}

export default {
  supported: {
    color: 'lime',
    icon: IconRocket,
  },
  running: {
    color: 'blue',
    icon: IconRun,
  },
  planned: {
    color: 'grape',
    mask: 'purple',
    icon: IconHourglass,
  },
  broken: {
    color: 'orange',
    icon: IconMoodSad,
  },
  denied: {
    color: 'red',
    icon: IconHandStop,
  },
};
