import { List } from '@mantine/core';
import { IconHeartHandshake } from '@tabler/icons-react';

export default function () {
  return (
    <List icon={<IconHeartHandshake color="red" />}>
      <List.Item>
        Creator & Maintainer:{' '}
        <a href="https://github.com/Starz0r" target="_blank" rel="noreferrer">
          Starz0r
        </a>
      </List.Item>
      <List.Item>
        Re-Design & Maintainer:{' '}
        <a href="https://github.com/Curve" target="_blank" rel="noreferrer">
          Curve
        </a>
      </List.Item>
      <List.Item>
        All Banners and Logos:{' '}
        <a href="https://www.steamgriddb.com/" target="_blank" rel="noreferrer">
          SteamGridDB
        </a>
      </List.Item>
      <List.Item>
        Game-Information and Updates:{' '}
        <a href="https://github.com/Starz0r/AreWeAntiCheatYet/issues" target="_blank" rel="noreferrer">
          The Community
        </a>
      </List.Item>
    </List>
  );
}
