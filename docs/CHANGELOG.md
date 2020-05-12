## [1.3.7](https://github.com/K-FOSS/TS-ESNode/compare/v1.3.6...v1.3.7) (2020-05-12)


### Bug Fixes

* **dot import:** Fix `import XYZ from '.'` ([#52](https://github.com/K-FOSS/TS-ESNode/issues/52)) ([19df585](https://github.com/K-FOSS/TS-ESNode/commit/19df585d6d683a499f9df47301abf3d23d267541)), closes [#34](https://github.com/K-FOSS/TS-ESNode/issues/34)

## [1.3.6](https://github.com/K-FOSS/TS-ESNode/compare/v1.3.5...v1.3.6) (2020-05-12)


### Bug Fixes

* **dynamicInstantiate:** works with pnpm ([#45](https://github.com/K-FOSS/TS-ESNode/issues/45)) ([5c0fadf](https://github.com/K-FOSS/TS-ESNode/commit/5c0fadf4d0508ee842578ab4a65899fad69d4b72))

## [1.3.5](https://github.com/K-FOSS/TS-ESNode/compare/v1.3.4...v1.3.5) (2020-04-05)


### Bug Fixes

* **resolve:** Don't run findFiles if we can already see an extension. ([b0e2b85](https://github.com/K-FOSS/TS-ESNode/commit/b0e2b850487d91b4ef8f101d64ef481689d5c875))

## [1.3.4](https://github.com/K-FOSS/TS-ESNode/compare/v1.3.3...v1.3.4) (2020-04-05)


### Bug Fixes

* **findFiles:** Fix the discovery of files when a directory of partial name match occurs ([2f108e2](https://github.com/K-FOSS/TS-ESNode/commit/2f108e26c4218af3079c265741f5dcca45e343ba))

## [1.3.3](https://github.com/K-FOSS/TS-ESNode/compare/v1.3.2...v1.3.3) (2020-03-30)


### Bug Fixes

* Readd JS_EXTS to findFIles to allow for post build JS support ([82b27c0](https://github.com/K-FOSS/TS-ESNode/commit/82b27c04432ccd2b3a5e065927bfcf9f5ebcb24a))

## [1.3.2](https://github.com/K-FOSS/TS-ESNode/compare/v1.3.1...v1.3.2) (2020-03-30)


### Bug Fixes

* **Resovler:** Refactor resolver and module loader to prevent loading of URLs and already discovered javascript files ([#28](https://github.com/K-FOSS/TS-ESNode/issues/28)) ([4825f19](https://github.com/K-FOSS/TS-ESNode/commit/4825f19e305081d340fb68629a5e5ba813555f46))

## [1.3.1](https://github.com/K-FOSS/TS-ESNode/compare/v1.3.0...v1.3.1) (2020-03-28)


### Bug Fixes

* **Release:** Include updated package.json in Git ([88f8b1a](https://github.com/K-FOSS/TS-ESNode/commit/88f8b1a896966c1986f6136c236676a26147ddd0))

# [1.3.0](https://github.com/K-FOSS/TS-ESNode/compare/v1.2.2...v1.3.0) (2020-03-28)


### Features

* Setup automated relases ([508d2c0](https://github.com/K-FOSS/TS-ESNode/commit/508d2c071b1075c9af2ab7144bf1d3a37225a8ae))

## [1.2.2](https://github.com/K-FOSS/TS-ESNode/compare/v1.2.1...v1.2.2) (2020-03-28)


### Bug Fixes

* **CI:** [Use NODE_AUTH_TOKEN](https://help.github.com/en/actions/language-and-framework-guides/publishing-nodejs-packages#publishing-packages-to-the-npm-registry) ([5c43a60](https://github.com/K-FOSS/TS-ESNode/commit/5c43a60ac5f69fd9b52602e505756b1cdcab7bac))
* **findFiles:** Actually properly implement Node resolution by allowing import of directories with `index.{js.jsx,ts,tsx}` ([#24](https://github.com/K-FOSS/TS-ESNode/issues/24)) ([6167dc0](https://github.com/K-FOSS/TS-ESNode/commit/6167dc05261a72b5d2ce531664be7b34768b30cd))
