import { Card, CardProps, Group, MantineSize, Text } from '@mantine/core';
import { IconExternalLink, IconHourglassEmpty } from '@tabler/icons-react';
import { Game } from '../src/types/games';

interface ReferenceProps extends Omit<CardProps, 'withBorder' | 'children'> {
    game: Game;
    size?: number;
    fz?: MantineSize | (string & {});
}

export default function({ game, size, fz, ...props }: ReferenceProps) {
    return (
        <Card {...props} withBorder>
            {game.reference ? (
                <Text variant="link" component="a" href={game.reference} target="_blank" fz={fz}>
                    <IconExternalLink style={{ marginRight: '5px' }} size={size || 12} />
                    {game.reference}
                </Text>
            ) : (
                <Group wrap="nowrap" align="center">
                    <IconHourglassEmpty />
                    <Text fz={fz} c="dimmed" fs="italic">
                        No Reference available at this time
                    </Text>
                </Group>
            )}
        </Card>
    );
}
