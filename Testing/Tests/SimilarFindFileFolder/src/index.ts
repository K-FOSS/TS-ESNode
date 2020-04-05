// Template/src/index.ts
import assert from 'assert';
import * as React from './Library/React';
import { stuff } from './Library/ReactFlight';

assert.equal(React.helloWorld, 'helloWorld');

stuff().then((result) => assert.equal(result, 'reactFlight'));
