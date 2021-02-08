// Template/src/index.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';

export class WinstonTestSuite extends TestSuite {
  public testName = 'Winston Suite';

  public async test(): Promise<void> {
    const winston = await import('winston');

    const logger = winston.createLogger({
      level: 'debug',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.Console({}),
      ],
    });

    logger.debug('HelloWorld');

    strictEqual('helloWorld', 'helloWorld', 'helloWorld === helloWorld');
  }
}
