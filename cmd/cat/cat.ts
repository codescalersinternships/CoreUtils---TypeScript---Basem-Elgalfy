
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import * as fs from 'fs';
import * as readline from 'readline';



const argv = yargs(hideBin(process.argv))
    .option('n', {
        allias: 'lineNumber',
        type: 'boolean',
        description: 'specify if th line number should be printed or not',
        default: false
    })
    .parseSync();


const lineNumber = argv.n;

for (let i = 0; i < argv._.length; i++) {
    printFile(argv._[i] as string, lineNumber);

}

function printFile(filename: string, lineNumber: boolean) {
    const fileStream = fs.createReadStream(filename);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let lineNumberCounter = 1;
    rl.on('line', (line) => {
        if (lineNumber) {
            console.log(`${lineNumberCounter} ${line}`);
            lineNumberCounter++;
        } else {
            console.log(line);
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


}
