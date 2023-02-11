import { createContext, ReactNode, useEffect, useState } from 'react';
import { defaultSettings, Settings } from '../types/settings';

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

export const SettingsContext = createContext<Settings & SettingsSetter>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [previousGames, setPreviousGames] = useState(defaultSettings.previousGames);
  const [overview, setOverview] = useState(defaultSettings.overview);
  const [display, setDisplay] = useState(defaultSettings.display);

  useEffect(() => {
    get('display', setDisplay);
    get('overview', setOverview);
    get('previousGames', setPreviousGames);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        display,
        setDisplay: update('display', setDisplay),
        overview,
        setOverview: update('overview', setOverview),
        previousGames,
        setPreviousGames: update('previousGames', setPreviousGames),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
