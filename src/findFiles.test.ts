// src/findFiles.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { findFiles } from './findFiles';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { deepStrictEqual } from 'assert';

export class FindFilesTestSuite extends TestSuite {
  public testName = 'Find Files Test Suite';

  public async test(): Promise<void> {
    /**
     * File 1 - File without Ext sufix
     */
    const jsFileWithSimilarPrefix = await findFiles(
      resolve(fileURLToPath(import.meta.url), '../fixtures/JS_Files'),
      {
        fileName: 'randomFile1',
        extensions: ['js'],
      },
    );

    const jsFileWithSimilarPrefixURI = fileURLToPath(jsFileWithSimilarPrefix);

    deepStrictEqual(
      jsFileWithSimilarPrefixURI,
      resolve(
        fileURLToPath(import.meta.url),
        '../fixtures/JS_Files/randomFile1.js',
      ),
      'Resovled file with another file with additional text after specified string is resovled properly',
    );

    const firstFileImport = await import(jsFileWithSimilarPrefixURI);
    deepStrictEqual(
      firstFileImport.fileName,
      'randomFile1',
      'firstFileImport.fileName === randomFile1',
    );

    /**
     * File 2 - The file used to trick file1
     */
    const jsFileWithSimilar = await findFiles(
      resolve(fileURLToPath(import.meta.url), '../fixtures/JS_Files'),
      {
        fileName: 'randomFile1Ext',
        extensions: ['js'],
      },
    );

    const jsFileWithSimilarURI = fileURLToPath(jsFileWithSimilar);

    deepStrictEqual(
      jsFileWithSimilarURI,
      resolve(
        fileURLToPath(import.meta.url),
        '../fixtures/JS_Files/randomFile1Ext.js',
      ),
      'Resovled file with another file with less than specified string is resovled properly',
    );

    const secondFileImport = await import(jsFileWithSimilarURI);
    deepStrictEqual(
      secondFileImport.fileName,
      'randomFile1Ext',
      'secondFileImport.fileName === randomFile1Ext',
    );
  }
}
