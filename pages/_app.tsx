/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { MantineColorScheme, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Shell } from '../components/Shell';
import { SettingsProvider } from '../src/static/state';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import theme from '../src/static/theme';

export default function App(props: AppProps) {
    const { basePath } = useRouter();
    const { Component, pageProps } = props;
    const [colorScheme, setColorScheme] = useState<MantineColorScheme>('dark');

    const toggleColorScheme = (value?: MantineColorScheme) => {
        const scheme = value || (colorScheme == 'dark' ? 'light' : 'dark');
        localStorage.setItem('theme', scheme);
        setColorScheme(scheme);
    };

    useEffect(() => {
        toggleColorScheme((localStorage.getItem('theme') as MantineColorScheme) || 'dark');
    }, []);

    useEffect(() => {
        document.documentElement.style.colorScheme = colorScheme;
    }, [colorScheme]);

    const appColorSchemeManager = {
        get: function(defaultValue: MantineColorScheme): MantineColorScheme {
            return colorScheme;
        },
        set: function(value: MantineColorScheme): void {
            toggleColorScheme(value);
        },
        subscribe: function(onUpdate: (colorScheme: MantineColorScheme) => void): void {
            return onUpdate(colorScheme);
        },
        unsubscribe: function(): void {

        },
        clear: function(): void {
            return localStorage.removeItem("theme");
        }
    }

    return (
        <>
            <Head>
                <title>Are We Anti-Cheat Yet?</title>
                <link rel="shortcut icon" href={`${basePath}/icon.webp`} />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="ShortName" />
            </Head>

            <Script
                src="https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=Array.prototype.at%2Cdefault"
                strategy="beforeInteractive"
            />

            <MantineProvider theme={theme} defaultColorScheme={colorScheme} colorSchemeManager={appColorSchemeManager}>
                <Notifications />
                <SettingsProvider>
                    <ModalsProvider>
                        <Shell>
                            <Component {...pageProps} />
                        </Shell>
                    </ModalsProvider>
                </SettingsProvider>
            </MantineProvider>
        </>
    );
}
