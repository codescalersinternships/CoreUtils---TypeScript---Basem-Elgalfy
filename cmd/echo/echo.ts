
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
    .option('n', {
        alias: 'omitTrailingLine',
        type: 'boolean',
        description: 'omit trailing newline',
        default: false,
    })
    .parseSync();

const out = argv._.join(' ');
process.stdout.write(out);
if (argv.omitTrailingLine === false) {
    console.log()
}
