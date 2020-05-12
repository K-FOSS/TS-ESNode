// DotImport/src/Hello/helloWorld.ts
import { helloString } from '.';
import { deepEqual } from 'assert';

deepEqual(helloString, 'helloWorld', 'helloString does not equal helloWorld');
