## [2.0.3](https://github.com/K-FOSS/TS-ESNode/compare/v2.0.2...v2.0.3) (2023-03-12)


### Bug Fixes

* **Everything:** Closes [#443](https://github.com/K-FOSS/TS-ESNode/issues/443) ([#478](https://github.com/K-FOSS/TS-ESNode/issues/478)) ([beda0ba](https://github.com/K-FOSS/TS-ESNode/commit/beda0ba7bdc1c19b21d7043ca42552d68d773998))

## [2.0.2](https://github.com/K-FOSS/TS-ESNode/compare/v2.0.1...v2.0.2) (2021-02-08)


### Bug Fixes

* **readme:** Update Badge ([#225](https://github.com/K-FOSS/TS-ESNode/issues/225)) ([1a8c475](https://github.com/K-FOSS/TS-ESNode/commit/1a8c475bd94fc923a3fd5b0d1640b9f78618d774))

## [2.0.1](https://github.com/K-FOSS/TS-ESNode/compare/v2.0.0...v2.0.1) (2021-02-08)


### Bug Fixes

* **deps:** Remove `winston` from production deps ([#223](https://github.com/K-FOSS/TS-ESNode/issues/223)) ([2eca2dc](https://github.com/K-FOSS/TS-ESNode/commit/2eca2dcf6cdd5ca35285c63a3cb56b9783b3160e))

# [2.0.0](https://github.com/K-FOSS/TS-ESNode/compare/v1.7.0...v2.0.0) (2021-02-08)


### Bug Fixes

* **Actions:** Fix Test action on Release Workflow ([082e58b](https://github.com/K-FOSS/TS-ESNode/commit/082e58b035bafa7ad824edca75cfcd09c9d4b9f7))
* **duplicated-defaults-keys:** Fix Duplicated Default Keys Assigned via Object.assigbn ([#217](https://github.com/K-FOSS/TS-ESNode/issues/217)) ([5d819ce](https://github.com/K-FOSS/TS-ESNode/commit/5d819ce9cb7dc5745b0752c3b01de5c0b3c590eb))


### BREAKING CHANGES

* **duplicated-defaults-keys:** This is potentially a major change, I'm uncertain if any modules or current projects actually rely upon this "bug" Please create an issue if anything is broken after this release.

# [1.7.0](https://github.com/K-FOSS/TS-ESNode/compare/v1.6.0...v1.7.0) (2020-09-15)


### Features

* Release ([56690ef](https://github.com/K-FOSS/TS-ESNode/commit/56690ef6b5a7899dc440ccdec27572cb014d82ef))

# [1.6.0](https://github.com/K-FOSS/TS-ESNode/compare/v1.5.1...v1.6.0) (2020-05-27)


### Features

* **TS_CONFIG_PATH:** `TS_CONFIG_PATH` environment variable for forcing tsconfig loading ([#64](https://github.com/K-FOSS/TS-ESNode/issues/64)) ([5885d2e](https://github.com/K-FOSS/TS-ESNode/commit/5885d2e1d92d969fbb9506e21efa647c9dc915d0))

## [1.5.1](https://github.com/K-FOSS/TS-ESNode/compare/v1.5.0...v1.5.1) (2020-05-27)


### Bug Fixes

* **paths:** Refactor Paths handling ([#80](https://github.com/K-FOSS/TS-ESNode/issues/80)) ([e537269](https://github.com/K-FOSS/TS-ESNode/commit/e537269dbc81786ae710799ad07001710ceafe50))

# [1.5.0](https://github.com/K-FOSS/TS-ESNode/compare/v1.4.1...v1.5.0) (2020-05-26)


### Features

* **paths:** Allow usage of TSConfig Paths ([#76](https://github.com/K-FOSS/TS-ESNode/issues/76)) ([6e2f6af](https://github.com/K-FOSS/TS-ESNode/commit/6e2f6af2a7abe46ca5d9d21029a5d74b2faea3e9))

## [1.4.1](https://github.com/K-FOSS/TS-ESNode/compare/v1.4.0...v1.4.1) (2020-05-14)


### Bug Fixes

* **dynamicInstantiate:** works on Windows ([7a98c38](https://github.com/K-FOSS/TS-ESNode/commit/7a98c388d93a7252bcc43fcb8127a4465f75f48f)), closes [#39](https://github.com/K-FOSS/TS-ESNode/issues/39)

# [1.4.0](https://github.com/K-FOSS/TS-ESNode/compare/v1.3.7...v1.4.0) (2020-05-12)


### Features

* Force release ([58f3d3b](https://github.com/K-FOSS/TS-ESNode/commit/58f3d3b6d268ce1e260a16715cab5b0b5ccc79ca))


### Reverts

* Revert "chore(branches): Setup Next branch" ([b3a2345](https://github.com/K-FOSS/TS-ESNode/commit/b3a2345131a210f5213ce8d81ec1e7b4a2cbc2cf))
* Revert "fix(Resovler): Refactor resolver and module loader to prevent loading of URLs and already discovered javascript files (#28)" ([2aa2df8](https://github.com/K-FOSS/TS-ESNode/commit/2aa2df8438107c1c4ef491eb3b6f8233f7638669)), closes [#28](https://github.com/K-FOSS/TS-ESNode/issues/28)
* Revert "refactor: Remove Node 13.7/13.8 from supported versions" ([c0916b6](https://github.com/K-FOSS/TS-ESNode/commit/c0916b63434977c3f9612f476f14e202db85932d))
* Revert "chore(release): 1.3.2 [skip ci]" ([e112a8d](https://github.com/K-FOSS/TS-ESNode/commit/e112a8dd40192970f4aefaea218e078a3d8e0c34))
* Revert "fix: Readd JS_EXTS to findFIles to allow for post build JS support" ([ed01c06](https://github.com/K-FOSS/TS-ESNode/commit/ed01c060f148f54c076939095d37344385c26841))
* Revert "chore(release): 1.3.3 [skip ci]" ([2e29ee2](https://github.com/K-FOSS/TS-ESNode/commit/2e29ee2d7f8fb04074234574ac7afc8f50ae4fb2))
* Revert "chore(deps-dev): bump @types/node from 13.9.5 to 13.9.8 (#29)" ([06561dc](https://github.com/K-FOSS/TS-ESNode/commit/06561dc640e2b2f14ec65d80bb9e88146b667169)), closes [#29](https://github.com/K-FOSS/TS-ESNode/issues/29)
* Revert "chore(deps-dev): bump @types/node from 13.9.8 to 13.11.0 (#30)" ([8050e6e](https://github.com/K-FOSS/TS-ESNode/commit/8050e6ecc31e875c8e1de8c6156d8cd84824d3d7)), closes [#30](https://github.com/K-FOSS/TS-ESNode/issues/30)
* Revert "tests(Similar Folder): Add a test for similar folder names when searching for a file (should fail currently)" ([aa94c10](https://github.com/K-FOSS/TS-ESNode/commit/aa94c10949d32f2f82708fcd7b027336ada8021b))
* Revert "fix(findFiles): Fix the discovery of files when a directory of partial name match occurs" ([f51c084](https://github.com/K-FOSS/TS-ESNode/commit/f51c08468a9f4296be89d1192094aab6d010d46e))
* Revert "chore(release): 1.3.4 [skip ci]" ([fa25197](https://github.com/K-FOSS/TS-ESNode/commit/fa251974d4191ee93874654110fb2dd98d8147ef))
* Revert "fix(resolve): Don't run findFiles if we can already see an extension." ([3050146](https://github.com/K-FOSS/TS-ESNode/commit/3050146c5f454ecc277ca7a4b9b56dacfc5f14c7))
* Revert "chore(release): 1.3.5 [skip ci]" ([044da67](https://github.com/K-FOSS/TS-ESNode/commit/044da677622491b02ef97e1d0cbe7376d6c4cf2a))
* Revert "chore(deps-dev): bump @types/node from 13.11.0 to 13.11.1 (#35)" ([1b9eae8](https://github.com/K-FOSS/TS-ESNode/commit/1b9eae88be6bc46b58030e4e52f112b16a02da55)), closes [#35](https://github.com/K-FOSS/TS-ESNode/issues/35)
* Revert "chore(deps-dev): bump prettier from 2.0.2 to 2.0.4 (#33)" ([9d37c8f](https://github.com/K-FOSS/TS-ESNode/commit/9d37c8fb82c2b02ef398f28e612e06e6e95d5f4f)), closes [#33](https://github.com/K-FOSS/TS-ESNode/issues/33)
* Revert "chore(deps-dev): bump typescript from 3.8.3 to 3.9.2 (#50)" ([f962acf](https://github.com/K-FOSS/TS-ESNode/commit/f962acf41716ab59e11abeafb222f49247dfee73)), closes [#50](https://github.com/K-FOSS/TS-ESNode/issues/50)
* Revert "chore(deps-dev): bump conventional-changelog-conventionalcommits (#49)" ([e6a4d8f](https://github.com/K-FOSS/TS-ESNode/commit/e6a4d8fbb410826f9f42a5a7af927ed2d09fd472)), closes [#49](https://github.com/K-FOSS/TS-ESNode/issues/49)
* Revert "fix(dynamicInstantiate): works with pnpm (#45)" ([4a92673](https://github.com/K-FOSS/TS-ESNode/commit/4a92673656e1f159891271a6e2ca3b07b7f18f02)), closes [#45](https://github.com/K-FOSS/TS-ESNode/issues/45)
* Revert "chore(release): 1.3.6 [skip ci]" ([a461c3b](https://github.com/K-FOSS/TS-ESNode/commit/a461c3bb5d71e54408a046365bca58b08d2fec14))
* Revert "chore(deps-dev): bump prettier from 2.0.4 to 2.0.5 (#41)" ([c5613ca](https://github.com/K-FOSS/TS-ESNode/commit/c5613caced685571de2c493080659714c00f6201)), closes [#41](https://github.com/K-FOSS/TS-ESNode/issues/41)
* Revert "chore(deps-dev): bump semantic-release from 17.0.4 to 17.0.7 (#42)" ([1d6a63d](https://github.com/K-FOSS/TS-ESNode/commit/1d6a63d8f11eb9ac5a3cc4d15039d56aa68626c8)), closes [#42](https://github.com/K-FOSS/TS-ESNode/issues/42)
* Revert "fix(dot import): Fix `import XYZ from '.'` (#52)" ([33612d1](https://github.com/K-FOSS/TS-ESNode/commit/33612d1b53a3fc5f1e7bd76eb8703330c348b3dc)), closes [#52](https://github.com/K-FOSS/TS-ESNode/issues/52)
* Revert "release 1.3.6 (#31)" ([db72a3f](https://github.com/K-FOSS/TS-ESNode/commit/db72a3f5864513c72b51c0f0507acc21234bacea)), closes [#31](https://github.com/K-FOSS/TS-ESNode/issues/31)

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
