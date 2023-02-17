import { Button, ButtonProps } from '@mantine/core';
import { IconChartArea } from '@tabler/icons-react';
import { useRouter } from 'next/router';

export default function ({ ...props }: Omit<ButtonProps, 'color' | 'leftIcon' | 'variant' | 'onClick'>) {
  const router = useRouter();

  return (
    <Button
      {...props}
      color="gray"
      variant="light"
      leftIcon={<IconChartArea />}
      onClick={() => router.push('/breakdown')}
    >
      Anti-Cheat Breakdown
    </Button>
  );
}
