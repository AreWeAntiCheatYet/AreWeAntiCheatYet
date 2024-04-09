// TODO: figure out how to import these from @mantine/styles properly
// so I can get rid of this file

import { CSSObject } from "@emotion/react";
import { MantineTheme, useMantineColorScheme } from "@mantine/core";
import { MantineThemeBase } from "@mantine/styles";


export function focusStyles(theme: MantineThemeBase) {
    return (selector?: string): CSSObject => ({
        WebkitTapHighlightColor: 'transparent',

        [selector || '&:focus']: {
            ...(theme.focusRing === 'always' || theme.focusRing === 'auto'
                ? theme.focusRingStyles.styles(theme)
                : theme.focusRingStyles.resetStyles(theme)),
        },

        [selector
            ? selector.replace(':focus', ':focus:not(:focus-visible)')
            : '&:focus:not(:focus-visible)']: {
            ...(theme.focusRing === 'auto' || theme.focusRing === 'never'
                ? theme.focusRingStyles.resetStyles(theme)
                : null),
        },
    });
}

export function primaryShade(theme: MantineThemeBase | MantineTheme) {
    const { colorScheme } = useMantineColorScheme();

    return (_colorScheme?: 'light' | 'dark') => {
        if (typeof theme.primaryShade === 'number') {
            return theme.primaryShade;
        }

        return theme.primaryShade[_colorScheme || colorScheme];
    };
}

export function themeColor(theme: MantineThemeBase | MantineTheme) {
    const getPrimaryShade = primaryShade(theme);

    return (
        color: string,
        shade?: number,
        primaryFallback: boolean = true,
        useSplittedShade: boolean = true
    ) => {
        if (typeof color === 'string' && color.includes('.')) {
            const [splitterColor, _splittedShade] = color.split('.');
            const splittedShade = parseInt(_splittedShade, 10);

            if (splitterColor in theme.colors && splittedShade >= 0 && splittedShade < 10) {
                return theme.colors[splitterColor][
                    typeof shade === 'number' && !useSplittedShade ? shade : splittedShade
                ];
            }
        }

        const _shade = typeof shade === 'number' ? shade : getPrimaryShade();

        return color in theme.colors
            ? theme.colors[color][_shade]
            : primaryFallback
                ? theme.colors[theme.primaryColor][_shade]
                : color;
    };
}
