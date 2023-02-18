import { Center, CenterProps } from '@mantine/core';

interface ScopeProps extends Omit<CenterProps, 'position' | 'style'> {
  scale?: number;
}

export default function ({ children, scale, ...props }: ScopeProps) {
  return (
    <Center {...props}>
      <div style={{ width: 'max-content' }}>
        <div style={{ transform: `scale(${scale || 0.2})`, width: 'max-content' }}>{children}</div>
      </div>
    </Center>
  );
}
