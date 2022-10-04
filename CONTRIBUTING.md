# How to contribute

Check tools and rules discribed below.

## 1. Prerequisites, step: install tools

### Node.js - build runtime environment
- how to: visit site https://nodejs.org/en and install (msi installer, default options)
- version: newest `16.xx`
- verification: run `node -v` in cmd, expected example: `v16.15.0`

### npm - package manager
- how to: `npm install -g npm@latest`
- version: minimum `7.x`
- verification: run `npm -v` in cmd, expected example: `v8.3.1`

### Yarn classic - package manager
- how to: `npm install -g yarn` (that's it!)
- more info: https://classic.yarnpkg.com/en/docs/install
- version: newest `1.x`
- verification: run `yarn --version`, expected example: `1.22.11`

### Visual Studio Code - editor
- how to: visit https://code.visualstudio.com/download and install (exe installer, default options)
- version: newest `1.x`
- verification: open editor, select from menu: `Help -> About`; expected example: `Version: 1.54.2 (user setup)`

## 2. Prerequisites, step: configure tools

### Visual Studio Code + TypeScript
- Press `ctrl+shift+p` in a TypeScript file -> choose "Select TypeScript Version" -> pick "Use Workspace Version"
- verification: open TypeScript file (*.ts or *.tsx), expected example on the bottom right: `Typescript 4.8.4`

## 3. Project configuration/installation

First time or when swiching to another branch or pulling the newest code.\
\
Run `yarn install`

## 4. Project startup - available scripts

In the project directory, you can run:

### `yarn test`

Launches the test runner.

### `yarn build`

Builds the library for production to the `lib` folder.

### `yarn compile`

Compiles all files using TypeScript, without producing output files.

### `yarn upgrade-interactive`

Interactive console option to upgrade packages in the project.

## 5. Project coding conventions & rules

- keep it simple
- no external dependecies
- native solutions preferred
- tab = 2 spaces
- each "public" function, object or type should be included/exported in `index.ts`
- each function should be well described using typescript (return type should be typed explicitly)
- common types should be placed under `./types` folder
- tests should import types from `'../src'` to double check that everything is included in `index.ts`
- internal code (`src`) should import from specific file
- set package.json version before deployment

## 6. Contribution

Modifiy code, add unit test if makes sense and describe all applied changes in a PR or create a task for it (link it). Before creating a pull request check that your code is valid by running `yarn test` and `yarn build`. Create pull request to the `main` branch and wait for code review.