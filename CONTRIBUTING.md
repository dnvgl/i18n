# How to contribute

Check tools and rules described below.

## 1. Prerequisites, step: install tools

### Node.js - build runtime environment
- how to: visit site https://nodejs.org/en and install (msi installer, default options)
- version: newest `24.xx`
- verification: run `node -v` in cmd, expected example: `v24.11.1`

### npm - package manager
- how to: `npm install -g npm@latest`
- version: minimum `8.x`
- verification: run `npm -v` in cmd, expected example: `v11.6.4`

### Yarn - package manager
This project uses **Yarn 4** (modern "Berry"), pinned via the `packageManager` field in `package.json` and managed by **Corepack** (bundled with Node.js). You do not install Yarn globally.
- how to: enable Corepack once with `corepack enable`
- verification: run `yarn --version` inside the project folder, expected example: `4.17.1` (the version comes from the `packageManager` field in `package.json`)
- note: do NOT run `npm install -g yarn` - Corepack automatically provisions the correct Yarn version for the project

### Visual Studio Code - editor
- how to: visit https://code.visualstudio.com/download and install (exe installer, default options)
- version: newest `1.x`
- verification: open editor, select from menu: `Help -> About`; expected example: `Version: 1.54.2 (user setup)`

## 2. Prerequisites, step: configure tools

### Visual Studio Code + TypeScript
This project uses the native **TypeScript 7** compiler (a Go-based port). It does not ship the classic `tsserver.js`, so the old "Select TypeScript Version -> Use Workspace Version" option does **not** work anymore (VS Code would fall back to its bundled TypeScript).

To get editor language features (IntelliSense, error highlighting) that match the build, install the official extension:
- extension: **TypeScript 7** (id: `typescriptteam.native-preview`)
- how to: open the Extensions view (`ctrl+shift+x`), search for `TypeScript 7`, install it
- when you open a TypeScript file (`*.ts` or `*.tsx`), VS Code shows a prompt asking whether to use the native TS 7 language server (SDK) - accept it
- verification: open a TypeScript file; the bottom right / language status shows the native TypeScript 7 language server is active

Note: do **not** use "Select TypeScript Version -> Use Workspace Version" for TS 7 - it will fail because there is no `tsserver.js` in the native package.

## 3. Project configuration/installation

First time or when switching to another branch or pulling the newest code.\
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
- no external dependencies
- native solutions preferred
- tab = 2 spaces
- each "public" function, object or type should be included/exported in `index.ts`
- each function should be well described using typescript (return type should be typed explicitly)
- common types should be placed under `./types` folder
- tests should import types from `'../src'` to double check that everything is included in `index.ts`
- internal code (`src`) should import from specific file
- set package.json version before deployment

## 6. Contribution

Modify the code, add unit test if makes sense and describe all applied changes in a PR or create a task for it (link it). Before creating a pull request check that your code is valid by running `yarn test` and `yarn build`. Create pull request to the `main` branch and wait for code review.