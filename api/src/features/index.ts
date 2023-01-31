// TODO: add to  deps
import { IResolvers } from "mercurius";
import { Kernel, TYPES } from "../ioc";
import { RecipeResolver } from "./recipe";
import { handleFieldResolver, handleTypeResolver } from "../lib/utils";
import { AddFavouriteRecipeResponse } from "./graphql.type";
import { Context } from "../lib/context";

export function buildResolvers(
  kernel: Kernel,
): IResolvers<any, Context> {
  return {
    Query: {
      getFavouriteRecipes: handleFieldResolver<RecipeResolver>(
        kernel,
        TYPES.Resolver.Recipe,
        "getFavouriteRecipes",
      ),
    },
    Mutation: {
      addFavouriteRecipe: handleFieldResolver<RecipeResolver>(
        kernel,
        TYPES.Resolver.Recipe,
        "addFavouriteRecipe",
      ),
    },
    AddFavouriteRecipeResponse: {
      __resolveType: handleTypeResolver((value: AddFavouriteRecipeResponse) => {
        if ("code" in value && value.code.endsWith("Error")) {
          return "ServerError";
        }
        return "AddFavouriteRecipeResult";
      }),
      resolveType: handleTypeResolver((value: AddFavouriteRecipeResponse) => {
        if ("code" in value && value.code.endsWith("Error")) {
          return "ServerError";
        }
        return "AddFavouriteRecipeResult";
      }),
    },
  };
}
