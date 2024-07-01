import * as fs from "fs";
import * as readline from "readline";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
    .option('l', {
        alias: 'lineNumber',
        type: 'boolean',
        description: 'specify if the number of lines should be printed or not',
        default: false

    })
    .option('w', {
        alias: 'wordCount',
        type: 'boolean',
        description: 'specify if the number of words should be printed or not',
        default: false
    })
    .option('c', {
        alias: 'byteCount',
        type: 'boolean',
        description: 'specify if the number of bytes should be printed or not',
        default: false
    })
    .demandCommand(1, 'Usage: wc <filename> or wc -l -w -c <filename>')
    .parseSync();


const filename = argv._[0] as string;
const options = { lineCount: argv.l, wordCount: argv.w, byteCount: argv.c };
let lineCount = 0;
let wordCount = 0;
let byteCount = 0;

const fileStream = fs.createReadStream(filename);
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    lineCount++;
    const array = line.trim().split(/\s+/);
    wordCount += array.length;
    byteCount += line.length;
});

rl.on('close', () => {

    if (!options.lineCount && !options.wordCount && !options.byteCount) {
        console.log(`${lineCount} ${wordCount} ${byteCount}`);
        return;
    }

    if (options.lineCount) {
        console.log(lineCount);
    }
    if (options.wordCount) {
        console.log(wordCount);
    }
    if (options.byteCount) {
        console.log(byteCount);
    }




});

rl.on('error', (err) => {
    console.error(err);
    process.exit(1);
});

fileStream.on('error', (err) => {
    console.error(err);
    process.exit(1);
});