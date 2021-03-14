#!/usr/bin/env node

const { casinoRoyale } = require("../build/index");

const argv = require("yargs")
  .usage("Usage: $0 [options]")
  .alias("f", "file")
  .nargs("f", 1)
  .describe("f", "File to read from")
  .demandOption(["f"])
  .help("h")
  .alias("h", "help").argv;

casinoRoyale(argv.f).forEach((result) => {
  console.log(result);
});
