import { Inversify } from "../deps";

export const TYPES = {
  Resolver: {
    Recipe: Symbol.for("RecipeResolver"),
  },
  Service: {
    Recipe: Symbol.for("RecipeService"),
  },
  Mapper: {
    Recipe: Symbol.for("RecipeMapper"),
  },
  Database: {
    Recipe: Symbol.for("RecipeDatabase"),
  },
  Core: {
    ServerContext: Symbol.for("ServerContext"),
    ServerFactory: Symbol.for("ServerFactory"),
    LoggerFactory: Symbol.for("LoggerFactory"),
    ConfigFactory: Symbol.for("ConfigFactory"),
    DatabaseFactory: Symbol.for("DatabaseFactory"),
  },
} as const;

export type Kernel = Inversify.Container;
