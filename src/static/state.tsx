import { Divider, List, Space } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { hideNotification, showNotification, updateNotification } from '@mantine/notifications';
import { IconBellRinging } from '@tabler/icons-react';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { cookieOptions, Games } from '.';
import ChangeNotification from '../../components/ChangeNotification';
import { Change } from '../types/games';
import { defaultSettings, Settings } from '../types/settings';
import { getChanges } from '../utils/games';

interface SettingsSetter {
  setDisplay: (arg: Settings['display']) => void;
  setOverview: (arg: Settings['overview']) => void;
  setRowHighlight: (arg: Settings['rowHighlight']) => void;
  setPreviousGames: (arg: Settings['previousGames']) => void;
}

const update = <C extends keyof Settings>(name: C, set: (v: Settings[C]) => void) => {
  return (value: Settings[C]) => {
    setCookie(name, value, cookieOptions);
    set(value);
  };
};

const get = <C extends keyof Settings>(name: C, set: (v: Settings[C]) => void) => {
  set((getCookie(name)?.toString() as Settings[C]) || defaultSettings[name]);
};

export const SettingsContext = createContext<Settings & SettingsSetter & { changes: Change[] }>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [previousGames, setPreviousGames] = useState(defaultSettings.previousGames);
  const [rowHighlight, setRowHighlight] = useState(defaultSettings.rowHighlight);
  const [overview, setOverview] = useState(defaultSettings.overview);
  const [display, setDisplay] = useState(defaultSettings.display);
  const [changes, setChanges] = useState([]);
  const router = useRouter();

  useEffect(() => {
    get('display', setDisplay);
    get('overview', setOverview);
    get('rowHighlight', setRowHighlight);
    get('previousGames', setPreviousGames);
  }, []);

  useEffect(() => {
    if (previousGames === defaultSettings.previousGames) {
      return;
    }

    const lastVersion = getCookie('lastVersion');

    if (lastVersion === '3') {
      return;
    }

    openConfirmModal({
      title: 'Updates, Updates, Updates!',
      children: (
        <>
          Hey there 👋
          <br />
          We've been working hard on some updates and are happy to tell you about what's new!
          <Divider orientation="horizontal" m={10} />
          Some of the cool features include:
          <Space h={20} />
          <List>
            <List.Item>New Grid View</List.Item>
            <List.Item>Dedicated Game Pages</List.Item>
            <List.Item>New Overview Options</List.Item>
          </List>
          <br />
          In case you want to test out the new stuff, just open the settings by pressing the gear icon in the top right!
        </>
      ),
      labels: { cancel: 'Remind me later', confirm: 'Alright!' },
      onConfirm: () => setCookie('lastVersion', '3', cookieOptions),
    });
  }, [previousGames]);

  useEffect(() => {
    showNotification({
      id: 'changes',
      loading: true,
      disallowClose: true,
      title: 'Loading Changes',
      message: 'This may take a few seconds!',
    });

    const changes = getChanges(Games, JSON.parse(previousGames));
    setChanges(changes);

    if (changes.length <= 0) {
      hideNotification('changes');
      return;
    }

    updateNotification({
      id: 'changes',
      autoClose: false,
      disallowClose: false,
      icon: <IconBellRinging size={16} />,

      title: 'New changes!',
      message: <ChangeNotification changes={changes} setPreviousGames={update('previousGames', setPreviousGames)} />,
    });
  }, [previousGames]);

  useEffect(() => {
    const other = display === 'grid' ? 'table' : 'grid';
    const { asPath } = router;

    if (asPath.includes(other)) {
      router.replace(asPath.replace(other, display));
    }
  }, [display]);

  return (
    <SettingsContext.Provider
      value={{
        display,
        setDisplay: update('display', setDisplay),
        overview,
        setOverview: update('overview', setOverview),
        rowHighlight,
        setRowHighlight: update('rowHighlight', setRowHighlight),
        previousGames,
        setPreviousGames: update('previousGames', setPreviousGames),
        changes,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
