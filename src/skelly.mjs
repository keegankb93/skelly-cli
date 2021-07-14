#!/usr/bin/env node

import { Command } from "commander";
import { readFile } from "fs/promises";

const res = await readFile(
  new URL("../configs/commands.json", import.meta.url)
);

const getCommands = await JSON.parse(res);

console.log(getCommands);
const skelly = new Command();

let configPath = {};

getCommands.commands.forEach(({ shortName, name, description, path }) => {
  skelly.option(`-${shortName}, --${name}`, `${description}`);

  configPath = { ...configPath, [name]: `${path}` };
});

skelly.option(`-t, -templates`, `static option test`);
console.log(configPath);

skelly.showHelpAfterError(
  "\nInclude --help for additional information on commands."
);

skelly.parse(process.argv);

const args = skelly.opts();

for (let key in args) {
  if (configPath[key]) {
    console.log(configPath[key]);
    break;
  }
}
/*if (Object.keys(args)[0] === ) {
  console.log("test");
}
if (Object.keys(args)) {
  console.log(Object.keys(args)[0]);
}
if (args.react) {
  console.log("react");
}*/
