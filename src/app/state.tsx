import { createContext, ReactNode, useEffect, useState } from 'react';
import { defaultSettings, Settings } from '../types/settings';

interface SettingsSetter {
  setOverview: (arg: Settings['overview']) => void;
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
  const [overview, setOverview] = useState(defaultSettings.overview);

  useEffect(() => {
    get('overview', setOverview);
  }, []);

  return (
    <SettingsContext.Provider value={{ overview, setOverview: update('overview', setOverview) }}>
      {children}
    </SettingsContext.Provider>
  );
}
