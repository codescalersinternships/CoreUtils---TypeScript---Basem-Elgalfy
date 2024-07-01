import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as fs from "fs";
import * as readline from "readline";


const argv = yargs(hideBin(process.argv))
    .option('n', {
        alias: 'numberOfLines',
        type: 'number',
        description: 'number of lines to print',
        default: 10,
    })
    .demandCommand(1, 'Usage: tail <filename> or tail -n <number> <filename>')
    .parseSync();

const filename = argv._[0] as string;
let numberOfLines = argv.n;

const fileStream = fs.createReadStream(filename);
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const lines: string[] = [];

rl.on('line', (line) => {
    lines.push(line);
    if (lines.length > numberOfLines) {
        lines.shift();
    }
});

rl.on('close', () => {
    const start = Math.max(0, lines.length - numberOfLines);
    for (let i = start; i < lines.length; i++)
        console.log(lines[i])

});

rl.on('error', (err) => {
    console.error(err);
    process.exit(1);
});

fileStream.on('error', (err) => {
    console.error(err);
    process.exit(1);
});