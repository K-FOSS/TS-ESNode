// Testiing/Runner/Utils/Test.ts

export interface TestOptions {
  name: string;

  path: string;
}

export class Test {
  public name: string;

  public path: string;

  constructor(opts: Partial<TestOptions>) {
    Object.assign(this, opts);
  }
}
