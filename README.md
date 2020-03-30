# TS-ESNode

[![Renovate Status](https://badges.renovateapi.com/github/K-FOSS/TS-ESNode)](https://renovatebot.com/)
![Code Quality](https://github.com/K-FOSS/TS-ESNode/workflows/Code%20Quality/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@k-foss/ts-esnode)

This is a Node.JS Loader hook for Node.JS 13.9 or newer that transpiles TypeScript files into JavaScript using the `getFormat`, `resolve`, and `transformSource` hooks.

## Usage

You should already have `"type": "module"` in your `package.json`

Install `@k-foss/ts-esnode`

Create a `dev` script in `package.json`

```
{
  "scripts": {
    "dev": "node --loader @k-foss/ts-esnode --experimental-specifier-resolution=node ./src/index.ts",
  }
}
```

Now when you run `npm run dev` then you should be running your TypeScript source without having to transpile it while still retaining Node.JS ESModule & ESNext module mode.

## Development

Development is intened to be done using VSCode with the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extensions.

When you open this folder in VSCode you should get a notication to reopen in container. Click the reopen in container button to build the development contianer and launch VSCode in remote coding.

#### TODO

- I would really like to remove the hack to support destructed imports of legacy node_modules, see [this comment](https://github.com/K-FOSS/TS-ESNode/issues/1#issuecomment-596750379) for more information.

- Worker Threads to avoid the TypeScript compiling affecting main thread.

- Performance improvements. (Better file/import finding.)

### Testing

**MUST HAVE NODE.JS v13.9 or newer**

To try this out, clone repo

Install NPM modules

```
npm install
```

Run all tests under [`./Testing/Tests/`](./Testing/Tests/)

```
npm test
```

All tests are run on all commits and PRs.
