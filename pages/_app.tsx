import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Shell } from '../components/Shell';
import { SettingsProvider } from '../src/app/state';
import theme from '../src/app/theme';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  const toggleColorScheme = (value?: ColorScheme) => {
    const scheme = value || (colorScheme == 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', scheme);
    setColorScheme(scheme);
  };

  useEffect(() => {
    toggleColorScheme((localStorage.getItem('theme') as ColorScheme) || 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.style.colorScheme = colorScheme;
  }, [colorScheme]);

  return (
    <>
      <Head>
        <title>Are We Anti-Cheat Yet?</title>
        <link rel="shortcut icon" href="/icon.webp" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme, ...theme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <SettingsProvider>
              <ModalsProvider>
                <Shell>
                  <Component {...pageProps} />
                </Shell>
              </ModalsProvider>
            </SettingsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
