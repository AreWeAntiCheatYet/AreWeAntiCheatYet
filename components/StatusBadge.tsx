import { Card, CardProps, Group, GroupProps, Text, ThemeIcon } from '@mantine/core';
import { MantineSize } from '@mantine/styles';
import { Game } from '../src/types/games';
import { getStyle } from '../src/utils/games';

interface StatusBadgeProps extends Omit<GroupProps & CardProps, 'bg' | 'children'> {
    fz?: MantineSize | (string & {});
    variant?: 'badge' | 'text';
    weight?: number;
    size?: number;
    game: Game;
}

export default function({ game, variant, radius, size, fz, weight, ...props }: StatusBadgeProps) {
    const status = getStyle(game.status);
    const { reference } = game;

    if (variant === 'text') {
        return (
            <Group wrap="nowrap" {...props}>
                <ThemeIcon radius="xl" color={status.color}>
                    <status.icon size={size} />
                </ThemeIcon>
                <Text
                    size={fz}
                    lineClamp={1}
                    fw={weight}
                    target="_blank"
                    href={reference}
                    component={reference ? 'a' : undefined}
                    variant={reference ? 'link' : undefined}
                >
                    {game.status}
                </Text>
            </Group>
        );
    }

    return (
        <Card bg={status.color} radius={radius || 'xl'} {...props}>
            <Group wrap="nowrap" style={{ height: '100%' }} justify="center" align="center">
                <status.icon color="white" size={size} />
                <Text size={fz} fw={weight} c="white" ta="center" lineClamp={1}>
                    {game.status}
                </Text>
            </Group>
        </Card>
    );
}
