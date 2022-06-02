import { Alert, Anchor } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import { getCookie, setCookies } from 'cookies-next';
import { useEffect, useState } from 'react';

export default function InfoAlert() {
  const [hide, setHide] = useState(true);

  useEffect(() => {
    setHide(getCookie('hideAlert') as boolean);
  }, []);

  return !hide ? (
    <Alert
      icon={<IconAlertCircle size={16} />}
      title="Beware"
      color="yellow"
      variant="outline"
      withCloseButton
      onClose={() => {
        setHide(true);
        setCookies('hideAlert', true, {
          maxAge: 60 * 60 * 24 * 30,
          sameSite: 'strict',
        });
      }}
    >
      Game states can change quickly! <br /> If a games status differs from what is listed here or
      if you believe a games reference should be updated please open a{' '}
      <Anchor
        target="_blank"
        href="https://github.com/Starz0r/AreWeAntiCheatYet/issues/new?template=1-update-game.yml"
      >
        GitHub issue
      </Anchor>
      .
    </Alert>
  ) : null;
}
