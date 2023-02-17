import { download } from '../src/assets';
import { Games } from '../src/static';
import chalk from 'chalk';

(async () => {
  for (const game of Games) {
    console.log(
      chalk.gray('Downloading'),
      chalk.yellow(game.slug),
      chalk.gray(`[${chalk.green(Games.indexOf(game))}/${chalk.white(Games.length)}]`),
    );
    await download(game);
  }
})();
