import {
    Card,
    CardProps,
    Group,
    List,
    ListProps,
    MantineSize,
    Text,
    ThemeIcon,
    useMantineTheme,
} from '@mantine/core';
import { IconHourglassEmpty, IconNote } from '@tabler/icons-react';
import { Game } from '../src/types/games';

interface NotesProps extends Omit<ListProps & CardProps, 'spacing' | 'children'> {
    game: Game;
    iconSize?: number;
    lineClamp?: number;
    size?: MantineSize;
    fz?: MantineSize | (string & {});
}

export default function({ game, iconSize, lineClamp, size, fz, ...props }: NotesProps) {
    const theme = useMantineTheme();
    const yellow4 = theme.colors.yellow[4];

    if (game.notes.length <= 0) {
        return (
            <Card {...(props as CardProps)} withBorder>
                <Group wrap="nowrap" align="center">
                    <IconHourglassEmpty size={iconSize} />
                    <Text fz={fz} c="dimmed" fs="italic">
                        No Notes available at this time
                    </Text>
                </Group>
            </Card>
        );
    }

    return (
        <List
            spacing="md"
            icon={
                <ThemeIcon size={size ?? 'lg'} radius="xl" color="gray">
                    <IconNote size={iconSize} />
                </ThemeIcon>
            }
            {...props}
        >
            {game.notes.map((note) => {
                const text = note[0];
                const reference = note[1];

                return (
                    <List.Item key={text}>
                        <Text
                            c={reference ? yellow4 : "white"}
                            fz={fz || 'xl'}
                            lineClamp={lineClamp}
                            component={reference ? 'a' : undefined}
                            variant={reference ? 'link' : undefined}
                            {...(reference ? { href: reference, target: '_blank' } : undefined)}
                        >
                            {text}
                        </Text>
                    </List.Item>
                );
            })}
        </List>
    );
}
