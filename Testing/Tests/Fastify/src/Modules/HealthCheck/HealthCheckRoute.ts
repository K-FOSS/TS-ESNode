// Testing/Tests/Fastify/src/Modules/HealthCheck/HealthCheckRoute.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { Route } from '@test/fastify/Library/Fastify';

export default class HealthCheckRoute implements Route {
  public options: Route['options'] = {
    method: 'GET',
    url: '/healthcheck',
  };

  async handler(
    this: FastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>,
  ): Promise<'OK'> {
    reply.type('text/html');
    reply.status(200);

    return 'OK';
  }
}
