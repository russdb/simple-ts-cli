# Pizza CLI  

from https://itnext.io/how-to-create-your-own-typescript-cli-with-node-js-1faf7095ef89?gi=a83f388a7a49  
start in dir with: 
* npm init 
* git init 
* git add .
* git commit -a -m "first save" 

### __dependencies__
*  clear — Clears our terminal screen
*  figlet — Get a nice ASCII art from a string
*  chalk — Terminal string styling done right
*  commander — Make node.js command-line interfaces easy
*  path — Node.JS path module 
  
install with:  
`npm i clear figlet chalk commander path --save`  
  
### __devDependencies__  
*  types/node — TypeScript definitions for Node.js
*  nodemon — Simple monitor script during development of a node.js app
*  ts-node — TypeScript execution environment and REPL for node.js
*  typescript — A language for application-scale JavaScript development  

install with  
`npm i @types/node nodemon ts-node typescript --save-dev`  

### __Bin and Main__  

In our package.json we need to set the entry point of our app (main and bin). This will be our compiled index.js file in the lib folder: ./lib/index.js .

The word pizza is the command which you use to eventually call you CLI.  

```
# package.json
"main": "./lib/index.js",
"bin": {
  "pizza": "./lib/index.js"
}
```  

### __Scripts__  
* npm start— you can watch your CLI right away  
* npm run create — runs our build and test script together.  
* npm run build—compiles our TypeScriptindex.ts file to index.js and index.d.ts  
* npm run test—Installing our CLI globally with sudo npm i -g and followed by firing our pizza CLI command.  
* npm run refresh—removes the node modules, package-lock.json and runs npm install.    

paste into package.json:  

```
"scripts": {
  "start": "nodemon --watch 'src/**/*.ts' --exec \"ts-node\" src/index.ts",
  "create": "npm run build && npm run test",
  "build": "tsc -p .",
  "test": "sudo npm i -g && pizza",
  "refresh": "rm -rf ./node_modules ./package-lock.json && npm install"
},
```  

### __tsconfig.json__  

For our CLI we need some TypesSript configurations set in a file named tsconfig.json , create this file in the root  

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "lib": ["es6", "es2015", "dom"],
    "declaration": true,
    "outDir": "lib",
    "rootDir": "src",
    "strict": true,
    "types": ["node"],
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
}
```  

mkdir src && cd src  

create a file called index.ts  

place this on line one, a _shebang_  

`#!/usr/bin/env node`

next place the imports for our dependencies

```
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');
```  

Staying in index.ts, we call the clear() command and use our first import, chalk to draw some text :) 

```
clear();
console.log(
  chalk.red(
    figlet.textSync('pizza-cli', { horizontalLayout: 'full' })
  )
);
``` 

and outputs this in red: 

``` 
  _ __   (_)  ____  ____   __ _            ___  | | (_)
 | '_ \  | | |_  / |_  /  / _` |  _____   / __| | | | |
 | |_) | | |  / /   / /  | (_| | |_____| | (__  | | | |
 | .__/  |_| /___| /___|  \__,_|          \___| |_| |_|
 |_|
``` 

Now we can go ahead and add the program options:  

```
const p = new program.Command();
p
  .version('0.0.1')
  .description("An example CLI for ordering pizza's")
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq', 'Add bbq sauce')
  .option('-c, --cheese <type>', 'Add the specified type of cheese [marble]')
  .option('-C, --no-cheese', 'You do not want any cheese');
  
p.parse(process.argv);  
```
to display the options:  

```
if (!process.argv.slice(2).length) {
	p.outputHelp();
}
```