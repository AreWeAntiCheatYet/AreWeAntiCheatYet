import { Group, Select, SelectProps, Text, ThemeIcon } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';
import Image from 'next/image';
import { forwardRef } from 'react';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ image, label, ...others }: ItemProps, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      {image ? (
        <Image src={image} alt={label} width={25} />
      ) : (
        <ThemeIcon w={25} color="gray" radius="xl">
          <IconQuestionMark />
        </ThemeIcon>
      )}
      <Text size="sm">{label}</Text>
    </Group>
  </div>
));

export default function ({ ...props }: Omit<SelectProps, 'itemComponent'>) {
  return <Select itemComponent={SelectItem} {...props} />;
}
