/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Shell } from '../components/Shell';
import { SettingsProvider } from '../src/static/state';
import theme from '../src/static/theme';

export default function App(props: AppProps) {
  const { basePath } = useRouter();
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
        <link rel="shortcut icon" href={`${basePath}/icon.webp`} />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="ShortName" />
      </Head>

      <Script
        src="https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.at%2Cdefault"
        strategy="beforeInteractive"
      />

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
