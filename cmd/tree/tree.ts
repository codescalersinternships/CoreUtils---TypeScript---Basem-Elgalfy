import * as fs from 'fs';	
import * as path from 'path';	
import yargs from "yargs";	
import { hideBin } from "yargs/helpers";	

interface Ret {	
    directoryCount: number;	
    fileCount: number;	
}	

function printTree(maxLevel: number, dirPath: string, currentLevel: number, indent: string): Ret {	

    if (currentLevel > maxLevel) {	
        return { directoryCount: 0, fileCount: 0 };	
    }	
    let dcount = 0, fcount = 0;	
    const files = fs.readdirSync(dirPath, { withFileTypes: true });	

    files.forEach((file, i) => {	
        const isLast = i === files.length - 1;	
        const prefix = isLast ? '└── ' : '├── ';	
        console.log(indent + prefix + file.name);	

        if (file.isDirectory()) {	
            dcount++;	
            const newIndent = indent + (isLast ? '    ' : '│   ');	
            const subStats = printTree(maxLevel, path.join(dirPath, file.name), currentLevel + 1, newIndent);	
            dcount += subStats.directoryCount;	
            fcount += subStats.fileCount;	
        } else {	
            fcount++;	
        }	


    });	
    return { directoryCount: dcount, fileCount: fcount };	
}	

const argv = yargs(hideBin(process.argv))	
    .option('L', {	
        alias: 'level',	
        type: 'number',	
        description: 'Number of Levels to traverse',	
        default: Number.MAX_SAFE_INTEGER,	
    })	
    .demandCommand(0, 1, 'Specify no or one directory to print tree')	
    .parseSync();	

const maxLevel = argv.L;	
if (maxLevel < 0) {	
    console.error('Level cannot be negative');	
    process.exit(1);	
}	

const root = argv._[0] ? String(argv._[0]) : '.';	
const stats = printTree(maxLevel, root, 1, '');	
console.log(`\n${stats.directoryCount} directories, ${stats.fileCount} files`);
