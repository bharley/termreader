import path from 'path';
import { fatal } from './ui';

export function load(program) {
  // Load the config from the filesystem
  let fileConfig = {};
  try {
    fileConfig = require(path.resolve(program.config));
  } catch (err) {
    // We don't care if this fails since they can specify this
    // stuff via command line
  }

  // Load the config from the CLI args
  const cliConfig = {};
  if (program.key) {
    cliConfig.key = program.key;
  }
  if (program.wordWrap) {
    cliConfig.wordWrap = program.wordWrap;
  }

  return {
    // Defaults
    wordWrap: process.stdout.columns || 80,
    ignoreImages: true,

    // Provided values
    ...fileConfig,
    ...cliConfig, // CLI arguments take precedence over the config file
  };
}

export function validate(config) {
  if (!config.key) {
    fatal('an API key is required');
  }
}
