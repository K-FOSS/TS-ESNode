// Testing/Tests/Axios/src/Axios.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { notDeepStrictEqual, deepStrictEqual } from 'assert';
import { getAxios, getAxiosDynamic } from './index';

export class AxiosTest extends TestSuite {
  public testName = 'Axios Test';

  public async test(): Promise<void> {
    const axios = await getAxios();

    notDeepStrictEqual(axios, {}, 'axios !== {}');

    const dynamicAxios = await getAxiosDynamic();

    notDeepStrictEqual(dynamicAxios, {}, 'dynamicAxios !== {}');

    deepStrictEqual(dynamicAxios, axios, 'dynamicAxios === axios');
  }
}
