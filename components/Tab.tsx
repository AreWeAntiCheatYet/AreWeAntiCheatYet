import { getThemeColor, Tabs, TabsProps, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { DEFAULT_THEME } from '@mantine/styles';
import { focusStyles } from '../src/utils/theming';

export default function(props: TabsProps) {
    const { colorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();
    // QUEST: how do I get MantineThemeBase without using the default?
    const defaultTheme = DEFAULT_THEME;

    return (
        <Tabs
            unstyled
            styles={(theme) => ({
                tab: {
                    ...focusStyles(defaultTheme),
                    backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
                    color: colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
                    border: `1px solid ${colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4]}`,
                    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
                    cursor: 'pointer',
                    fontSize: theme.fontSizes.sm,
                    display: 'flex',
                    alignItems: 'center',

                    '&:disabled': {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                    },

                    '&:not(:first-of-type)': {
                        borderLeft: 0,
                    },

                    '&:first-of-type': {
                        borderTopLeftRadius: theme.radius.md,
                        borderBottomLeftRadius: theme.radius.md,
                    },

                    '&:last-of-type': {
                        borderTopRightRadius: theme.radius.md,
                        borderBottomRightRadius: theme.radius.md,
                    },

                    '&[data-active]': {
                        backgroundColor: theme.colors[theme.primaryColor][7],
                        borderColor: theme.colors[theme.primaryColor][7],
                        color: theme.white,
                    },
                },

                tabIcon: {
                    marginRight: theme.spacing.xs,
                    display: 'flex',
                    alignItems: 'center',
                },

                tabsList: {
                    display: 'flex',
                },
            })}
            {...props}
        />
    );
}
