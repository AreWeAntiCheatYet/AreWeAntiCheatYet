import { UnstyledButton, Text, Center, useMantineColorScheme, Group, MantineColorScheme, MantineTheme, useMantineTheme } from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import { IconMoon, IconSun } from '@tabler/icons-react';

function getClasses(theme: MantineTheme, cs: MantineColorScheme): any {
    return {
        control: {
            backgroundColor: cs === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 1000,
            paddingLeft: theme.spacing.sm,
            paddingRight: 4,
            width: 136,
            height: 36,
        },

        iconWrapper: {
            height: 28,
            width: 28,
            borderRadius: 28,
            backgroundColor: cs === 'dark' ? theme.colors.yellow[4] : theme.colors.dark[4],
            color: cs === 'dark' ? theme.black : theme.colors.blue[2],
        },

        value: {
            lineHeight: 1,
        },
    };
}

// TODO: the look of the button broke when migrating to mantine v7.
// I tried my best to preserve the original design as much as possible
// but I'm unsure what's causing elements to be placed incorrectly.
export default function() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const theme = useMantineTheme();

    const classes = getClasses(theme, colorScheme);

    const Icon = colorScheme === 'dark' ? IconSun : IconMoon;

    return (
        <Group justify="center" my="xl">
            <UnstyledButton
                aria-label="Toggle theme"
                className={classes.control}
                onClick={() => toggleColorScheme()}
                title="Ctrl + J"
            >
                <Text size="sm" className={classes.value}>
                    {upperFirst(colorScheme === 'light' ? 'dark' : 'light')} theme
                </Text>

                <Center className={classes.iconWrapper}>
                    <Icon size={18} stroke={1.5} />
                </Center>
            </UnstyledButton>
        </Group>
    );
}
