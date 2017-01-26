import chalk from 'chalk';

export function fatal(error) {
  console.log(chalk.red(
    chalk.bold('Error:') + ' ' + error,
  ));
  process.exit(1);
}
