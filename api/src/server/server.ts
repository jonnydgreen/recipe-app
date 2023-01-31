import { FastifyBaseLogger } from "fastify";
import { Http2SecureServer } from "http2";
import { IResolvers } from "mercurius";
import { Crypto, Fastify, Mercurius } from "../deps";
import { Context, Logger, ServerContext } from "../lib";
import { ServerOptions } from "./server.type";

// TODO: take a closer look at the fastify typings

export class Server {
  private readonly _server: Fastify.FastifyInstance<Http2SecureServer>;

  constructor(
    private readonly _options: ServerOptions,
    private readonly _serverContext: ServerContext,
  ) {
    this._server = Fastify.fastify({
      logger: this._serverContext.log as unknown as FastifyBaseLogger,
      requestIdLogLabel: "requestId",
      genReqId: () => Crypto.randomUUID(),
    }) as unknown as Fastify.FastifyInstance<Http2SecureServer>;

    // Set x-request-id header on the response
    this._server.addHook("onRequest", async (request, reply) => {
      reply.header("x-request-id", request.id);
    });
  }

  public async start(): Promise<Fastify.FastifyInstance<Http2SecureServer>> {
    // Mercurius
    await this._server.register(Mercurius.mercurius, {
      // TODO: figure out type issue if time
      resolvers: this._options.resolvers as unknown as IResolvers,
      schema: this._options.schema,
      async context(request): Promise<Context> {
        return {
          log: request.log as unknown as Logger,
        };
      },
      graphiql: true,
    });

    return this._server;
  }
}

export class ServerFactory {
  constructor(
    private readonly _serverContext: ServerContext,
  ) {}

  public create({ schema, resolvers }: ServerOptions): Server {
    return new Server(
      { schema, resolvers },
      this._serverContext,
    );
  }
}
