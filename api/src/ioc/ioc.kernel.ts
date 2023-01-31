import { RecipeDatabase } from "../databases/recipe-database/recipe-database";
import { Inversify } from "../deps";
import { RecipeResolver } from "../features/recipe";
import { ConfigFactory } from "../lib/config";
import { ServerContext } from "../lib/context";
import { DatabaseFactory } from "../lib/database";
import { LoggerFactory } from "../lib/logger";
import { AsyncInit, ClassType } from "../lib/types";
import { ServerFactory } from "../server";
import { RecipeMapper, RecipeService } from "../services/recipe";
import { Kernel, TYPES } from "./ioc.types";

export function register<T>(
  container: Kernel,
  type: symbol,
  target: ClassType<T>,
  ...types: symbol[]
): Inversify.interfaces.BindingInWhenOnSyntax<T> {
  Inversify.decorate(Inversify.injectable(), target);
  let index = 0;
  for (const type of types) {
    Inversify.decorate(Inversify.inject(type), target, index++);
  }
  return container.bind<T>(type).to(target);
}

export async function initKernel(
  kernel: Kernel,
  silent: boolean,
): Promise<void> {
  const servicesToInit = [
    TYPES.Core,
    TYPES.Database,
    TYPES.Mapper,
    TYPES.Service,
    TYPES.Resolver,
  ];
  for (const services of servicesToInit) {
    for (const serviceID of Object.values(services)) {
      const service = kernel.get<AsyncInit>(serviceID);
      if (typeof service.init === "function") {
        await service.init(silent);
      }
    }
  }
}

export async function buildKernel(silent = false): Promise<Kernel> {
  const kernel = new Inversify.Container();

  // Core
  register(kernel, TYPES.Core.LoggerFactory, LoggerFactory);
  register(kernel, TYPES.Core.ConfigFactory, ConfigFactory);
  register(kernel, TYPES.Core.DatabaseFactory, DatabaseFactory);
  register(
    kernel,
    TYPES.Core.ServerContext,
    ServerContext,
    TYPES.Core.ConfigFactory,
    TYPES.Core.LoggerFactory,
    TYPES.Core.DatabaseFactory,
  ).inSingletonScope();
  register(
    kernel,
    TYPES.Core.ServerFactory,
    ServerFactory,
    TYPES.Core.ServerContext,
  );

  // Recipe
  register(kernel, TYPES.Resolver.Recipe, RecipeResolver, TYPES.Service.Recipe);
  register(
    kernel,
    TYPES.Service.Recipe,
    RecipeService,
    TYPES.Mapper.Recipe,
    TYPES.Database.Recipe,
  );
  register(kernel, TYPES.Mapper.Recipe, RecipeMapper);
  register(
    kernel,
    TYPES.Database.Recipe,
    RecipeDatabase,
    TYPES.Core.ServerContext,
  );

  // Init
  await initKernel(kernel, silent);

  const serverContext = kernel.get<ServerContext>(TYPES.Core.ServerContext);
  serverContext.log.debug({ message: "Successfully built kernel" });
  return kernel;
}
