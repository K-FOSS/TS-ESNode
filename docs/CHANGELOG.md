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
