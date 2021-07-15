#!/usr/bin/env node

import { Command } from "commander";
import { createSkeleton } from "./createSkeleton.mjs";
import { newTempDir } from "./newTempDir.mjs";
import { locate } from "../utility/locateCommandsFile.mjs";

const getCommands = await locate();

const skelly = new Command();

let configPath = {};

getCommands.commands.forEach(({ shortName, name, description, path }) => {
  skelly.option(`-${shortName}, --${name}`, `${description}`);

  configPath = { ...configPath, [name]: `${path}` };
});

skelly.option(
  `-td, --tempdir [reset]`,
  `Creates a new config and template directory. cd to the location you want to create the new directory before running this command.`
);

skelly.showHelpAfterError(
  "\nInclude --help for additional information on commands."
);

skelly.parse(process.argv);

const args = skelly.opts();
console.log(args);

if (Object.keys(args).length === 0) {
  throw new Error(
    `No arguments detected. Please type skelly -h for more info.\n`
  );
}

if (Object.keys(args).length > 1) {
  throw new Error(
    `You have too many arguments. Please type skelly -h for more info\n`
  );
}

if (args.tempdir) {
  newTempDir();
}

for (let key in args) {
  if (configPath[key]) {
    createSkeleton(configPath[key]);
    break;
  }
}
