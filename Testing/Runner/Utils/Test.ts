// Testiing/Runner/Utils/Test.ts
export interface Test {
  name: string;

  path: string;

  nodeOptions?: string;
}

export interface TestPackage {
  name: string;
  main: string;
  NODE_OPTIONS?: string;
}

export type TestPackageImport = { default: TestPackage };
