#!/usr/bin/env node

import { Command } from "commander";
import { basic } from "./basic.mjs";

const skelly = new Command();

skelly.showHelpAfterError(
  "\nInclude --help for additional information on commands."
);

skelly
  .option(
    "-b, --basic",
    "Creates skeleton framework for a simple static website."
  )
  .option("-td, --templatedir");

skelly.parse(process.argv);

const args = skelly.opts();

if (args.basic) {
  basic();
}
