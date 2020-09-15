// Testing/Tests/Fastify/src/Modules/HealthCheck/HealthCheckRoute.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';
import { createFastifyTestServer } from '@test/fastify/Library/Fastify';

export class FastifyHealthCheckRouteTest extends TestSuite {
  public testName = 'Fastify - HealthCheck Route Suite';

  public async test(): Promise<void> {
    const fastify = await createFastifyTestServer();

    console.log('Fastify: ', fastify);

    const response = await fastify.inject({
      method: 'GET',
      url: '/healthcheck',
    });

    strictEqual(response.body, 'OK');
  }
}
