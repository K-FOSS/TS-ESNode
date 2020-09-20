// Testing/Tests/Fastify/src/Library/Fastify.ts
import fastify, {
  FastifyInstance,
  RequestHandler,
  RouteOptions,
} from 'fastify';
import { findModuleFiles } from '@test/fastify/Utils/moduleFileFinder';

/**
 * Fastify Route
 */
export abstract class Route {
  /**
   * Fastify Route Options
   * https://www.fastify.io/docs/latest/Routes/#routes-option
   */
  options: Omit<RouteOptions, 'handler' | 'preHandler'>;

  /**
   * Fastify Route Handler
   */
  abstract handler: RequestHandler;
}

/**
 * Example route so that the findModuleFiles type isn't messed up
 */
export class ExampleRoute extends Route {
  handler: Route['handler'] = async () => {
    console.log('HelloWorld');

    return 'example';
  };
}

interface RouteModule {
  default: typeof ExampleRoute;
}

export async function getRoutes(): Promise<Route[]> {
  /**
   * Get all Modules under `Modules` that match `*Route.ts`
   */
  const routeModules = await findModuleFiles<RouteModule>(/.*Route\.ts/);

  // Destructure the default export from all matching route Modules, and construct the class
  return routeModules.flatMap(({ default: RouteClass }) => new RouteClass());
}

/**
 * Create a Fastify Web Server
 */
export async function createFastifyServer(): Promise<FastifyInstance> {
  const webServer = fastify();

  /**
   * Get All Route Modules.
   */
  const routes = await getRoutes();

  /**
   * For each Route Module in routes destructure handler and options and register as a webServer Route.
   */
  routes.map(({ handler, options }) => {
    return webServer.route({
      ...options,
      handler,
    });
  });

  return webServer;
}

/**
 * Creates a fastify Testing Chain https://www.fastify.io/docs/latest/Testing/
 */
export async function createFastifyTestServer(): Promise<FastifyInstance> {
  const webServer = await createFastifyServer();

  return webServer;
}
