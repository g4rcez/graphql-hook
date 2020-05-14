#!/usr/bin/env node

import { Command } from "commander";
import { playground } from "./helpers/playground";

const collect = (value: string, previous: string[]) => previous.concat([value]);

const program = new Command();
program
  .version("0.0.1")
  .option("-e, --endpoint <url>", "Set endpoint to use")
  .option("-p, --port", "Set local port", "1337")
  .option(
    "-H, --headers <headers>",
    `Set headers to request. 'key:"string"|[12,34,56,78,90]|{"object": "value"}'`,
    collect,
    []
  )
  .parse(process.argv);

if (program.endpoint === undefined) {
  program.help();
}

const headers = program.headers
  .map((x: string) => {
    const [first, ...values] = x.split(":");
    const clear = values
      .join(":")
      .replace(/^'/, "")
      .replace(/^"/, "")
      .replace(/'$/, "")
      .replace(/"$/, "")
      .trim();
    return { [first]: `${clear}` };
  })
  .reduce((acc: any, el: any) => ({ ...acc, ...el }), {});

const url = `${program.endpoint}`.startsWith("http")
  ? program.endpoint
  : `https://${program.endpoint}`;

playground(url, Number.parseInt(program.port), headers);
