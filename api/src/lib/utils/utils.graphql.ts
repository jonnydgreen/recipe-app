// TODO: move to deps
import { GraphQLResolveInfo } from "graphql";
// TODO: move to deps
import { IFieldResolver } from "mercurius";

import { Kernel } from "../../ioc";
import { Context } from "../context";
import { AppError } from "../error";

export class GraphQLSchemaError extends AppError {
  override name = "GraphQLSchemaError";
}

export function handleFieldResolver<T>(
  kernel: Kernel,
  serviceID: symbol,
  method: keyof T,
): IFieldResolver<unknown, Context, unknown> {
  const service = kernel.get<T>(serviceID);
  const resolver = service[method];
  if (typeof resolver !== "function") {
    throw new GraphQLSchemaError({
      message:
        `Unable to find resolver ${method.toString()} on service ${serviceID.toString()}`,
    });
  }
  return (
    _source: unknown,
    args: unknown,
    ctx: Context,
    _info: GraphQLResolveInfo,
  ) => {
    ctx.log.info({
      message: `Calling GraphQL Operation ${String(method)} with args ${
        JSON.stringify(args)
      }`,
    });
    return resolver.call(service, ctx, args);
  };
}

export function handleTypeResolver<T extends { __typename?: string }>(
  typeResolver: (value: T) => T["__typename"],
) {
  return typeResolver;
}
