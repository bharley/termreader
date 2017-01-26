import path from 'path';
import os from 'os';
import program from 'commander';
import 'babel-polyfill';
import info from '../package.json';
import { load as loadConfig, validate as validateConfig } from './helpers/config';
import main from './main';

let url;

// Set up the program
program
  .version(info.version)
  .usage('[options] <url>')
  .option('-k, --key [key]', 'Mercury Reader API key')
  .option('-w, --word-wrap [column width]', 'the column width to print at')
  .option('-c, --config [path]', 'config file location', path.join(os.homedir(), '.config', 'termreader.json'))
  .action((arg) => {
    url = arg;
  })
  .parse(process.argv);

// Extract the configuration
const config = loadConfig(program);

// Validate the configuration
validateConfig(config);

// Output the help if we didn't receive a url
if (!url) {
  program.outputHelp();
  process.exit(0);
}

// Run the main program now
main(url, config).then(() => {
  process.exit(0);
}, () => {
  process.exit(1);
});
