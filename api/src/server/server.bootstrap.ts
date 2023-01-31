import { Fs, Path } from "../deps";
import { buildResolvers } from "../features";
import { buildKernel, TYPES } from "../ioc";
import { ServerContext } from "../lib";
import { Server, ServerFactory } from "./server";

export async function bootstrap(
  address = "0.0.0.0",
): Promise<Server> {
  // Build kernel
  const kernel = await buildKernel();

  // Create Server Context
  const serverContext = kernel.get<ServerContext>(TYPES.Core.ServerContext);

  // Set up GraphQL Handler
  const resolvers = buildResolvers(kernel);
  const schema = await Fs.readFile(
    Path.join(__dirname, "../../schema.graphql"),
    { encoding: "utf-8" },
  );

  // Create server
  const server = kernel.get<ServerFactory>(TYPES.Core.ServerFactory).create({
    resolvers,
    schema,
  });

  // Start server
  const serverInstance = await server.start();

  // Listen on port
  await serverInstance.listen({
    port: serverContext.config.port,
    host: address,
  });

  return server;
}
