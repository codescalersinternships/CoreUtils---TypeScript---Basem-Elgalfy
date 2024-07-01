# Coreutils- Typescript - Basem_Elgalfy

This repository is a TypeScript implementation of some of the core utilities commonly found in Unix-like operating systems. The project aims to provide a learning platform for TypeScript programming and an understanding of how these fundamental utilities work.

## Utilities Included

- `cat`: Concatenate and print files, -n flag : by default false , used to show the line number in the output
- `echo`: Display a line of text
- `env`: Display the environment variables
- `false`: Do nothing, unsuccessfully
- `head`: Output the first part of files, -n flag : by default 10 , used to specify how many lines to be printed
- `tail`: Output the last part of files, -n flag : by default 10 , used to specify how many lines to be printed
- `tree`: List contents of directories in a tree-like format, supports the -L flag
- `true`: Do nothing, successfully
- `wc`: Print newline, word, and byte counts for each file, -w,-c,-l flags : by default true , used to display the word , bytes and lines counts.
- `yes`: Output a string repeatedly until killed

## Getting Started

To get started with these utilities, clone the repository and build the utilities using TypeScript.

### Prerequisites

- Node.js version 14 or higher
- npm (usually comes with Node.js)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/codescalersinternships/CoreUtils---TypeScript---Basem-Elgalfy.git
```

2. Navigate to the project directory:

```sh
cd CoreUtils---TypeScript---Basem-Elgalfy
```

3. Install dependencies:

```sh
npm install
```

4. Compile TypeScript to JavaScript:

```sh
tsc coreutil.ts
```

5. Run the utility

```sh
node coreutil.js argv
```
