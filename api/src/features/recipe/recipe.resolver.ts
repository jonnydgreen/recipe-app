import { Context } from "../../lib/context";
import { RecipeService } from "../../services/recipe";
import {
  AddFavouriteRecipeInput,
  Mutation,
  MutationAddFavouriteRecipeArgs,
  Query,
  QueryGetFavouriteRecipesArgs,
} from "../graphql.type";

export class RecipeResolver {
  constructor(private readonly _recipeService: RecipeService) {}

  // Queries
  public getFavouriteRecipes(
    context: Context,
    { input }: QueryGetFavouriteRecipesArgs,
  ): Promise<Query["getFavouriteRecipes"]> {
    return this._recipeService.getFavouriteRecipes(context, input);
  }

  // Mutations
  public addFavouriteRecipe(
    context: Context,
    { input }: MutationAddFavouriteRecipeArgs,
  ): Promise<Mutation["addFavouriteRecipe"]> {
    return this._recipeService.addFavouriteRecipe(context, input);
  }
}
