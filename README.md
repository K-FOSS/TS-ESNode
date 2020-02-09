# TS-ESNode

This is a proof of concept Node.JS Loader hook for Node.JS 14.0 that transpiles TypeScript files into JavaScript using the `getFormat`, `resolve`, and `transformSource` hooks.

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

## Testing

**MUST HAVE NODE.JS v13.7 or newer**

To try this out, clone repo

Install NPM modules

```
npm install

cd test && npm i && cd ..
```

Try it out

```
npm run try
```
