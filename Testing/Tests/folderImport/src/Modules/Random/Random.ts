// folderImport/src/Modules/Random/Random.ts
import { helloMessage } from 'folderImport/Modules/Hello';

export function sayHello(): string {
  console.log(`sayHello(): ${helloMessage}`);

  return helloMessage;
}
