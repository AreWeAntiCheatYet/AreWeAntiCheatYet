import { Group, Text } from '@mantine/core';
import { hideNotification, showNotification, updateNotification } from '@mantine/notifications';
import { IconBellRinging } from '@tabler/icons-react';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { Games } from '../static';
import { Change } from '../types/games';
import { defaultSettings, Settings } from '../types/settings';
import { getChanges } from '../utils/games';

interface SettingsSetter {
  setDisplay: (arg: Settings['display']) => void;
  setOverview: (arg: Settings['overview']) => void;
  setPreviousGames: (arg: Settings['previousGames']) => void;
}

const update = <C extends keyof Settings>(name: C, set: (v: Settings[C]) => void) => {
  return (value: Settings[C]) => {
    localStorage.setItem(name, value);
    set(value);
  };
};

const get = <C extends keyof Settings>(name: C, set: (v: Settings[C]) => void) => {
  set((localStorage.getItem(name) as Settings[C]) || defaultSettings[name]);
};

export const SettingsContext = createContext<Settings & SettingsSetter & { changes: Change[] }>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [previousGames, setPreviousGames] = useState(defaultSettings.previousGames);
  const [overview, setOverview] = useState(defaultSettings.overview);
  const [display, setDisplay] = useState(defaultSettings.display);
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    get('display', setDisplay);
    get('overview', setOverview);
    get('previousGames', setPreviousGames);
  }, []);

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

    const multiple = changes.length > 1;

    updateNotification({
      id: 'changes',
      autoClose: false,
      disallowClose: false,
      icon: <IconBellRinging size={16} />,

      title: 'New changes!',
      message: (
        <Group p={0} spacing={5} noWrap>
          <Text>
            There {multiple ? 'are' : 'is'} {changes.length} new change{multiple ? 's' : ''}!
          </Text>
          <Text
            variant="link"
            sx={{ cursor: 'pointer' }}
            onClick={/*TODO: Show changes modal, preferably as some sort of table maybe*/ undefined}
          >
            Show more
          </Text>
        </Group>
      ),
    });
  }, [previousGames]);

  return (
    <SettingsContext.Provider
      value={{
        display,
        setDisplay: update('display', setDisplay),
        overview,
        setOverview: update('overview', setOverview),
        previousGames,
        setPreviousGames: update('previousGames', setPreviousGames),
        changes,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
