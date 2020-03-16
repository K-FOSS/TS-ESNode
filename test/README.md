# TS-ESNode Test

This is a test of all diferent TS-ESNode issues and features in an all in one application.

The main entrypoint has a main import which could start an endless loop of import processing if the core import loading code is broken.

The core function in the entrypoint includes some logging to ensure the process is being launched properly.

It also dynamiclly loads Lab2 to ensure dynamic loading of TypeScript ESModules is working. If this is broken it could be with the findFiles function or the dynamic loading within TS-ESNode or Node.JS itself.

It also imports an example SSR React rendering function [Server.tsx](./src/Server.tsx) to ensure that we can import and load TSX as well as testing the loading of ESModule's from `node_modules`, once imported we run the function and log the resulting html text to console.

The NPM ESModule React module I'm using in this test/example is [@pika/react](https://github.com/pikapkg/react) to support this running in Node.JS I'm copying a package.json that includes `"type": "module"` as part of the prerun npm script.
