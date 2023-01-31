import { RecipeDatabase } from "../../databases/recipe-database/recipe-database";
import {
  AddFavouriteRecipeInput,
  AddFavouriteRecipeResponse,
  GetFavouriteRecipesInput,
  GetFavouriteRecipesResponse,
} from "../../features/graphql.type";
import { Context } from "../../lib/context";
import { RecipeServiceError } from "./recipe.error";
import { RecipeMapper } from "./recipe.mapper";

export class RecipeService {
  constructor(
    private readonly _recipeMapper: RecipeMapper,
    private readonly _recipeDatabase: RecipeDatabase,
  ) {}

  public async getFavouriteRecipes(
    context: Context,
    input: GetFavouriteRecipesInput,
  ): Promise<GetFavouriteRecipesResponse> {
    let response: GetFavouriteRecipesResponse;
    try {
      const mappedInput = this._recipeMapper.mapRecipeDatabaseGetRecipesInput(
        input,
      );
      const result = await this._recipeDatabase.getRecipes(
        context,
        mappedInput,
      );
      response = this._recipeMapper.mapGetFavouriteRecipesResponse(result);
    } catch (error) {
      const message = `Error while getting Recipes: ${error}`;
      context.log.error({ message });
      throw new RecipeServiceError({ message });
    }
    return response;
  }

  // Mutations
  public async addFavouriteRecipe(
    context: Context,
    input: AddFavouriteRecipeInput,
  ): Promise<AddFavouriteRecipeResponse> {
    let response: AddFavouriteRecipeResponse;
    try {
      const mappedInput = this._recipeMapper.mapRecipeDatabaseCreateRecipeInput(
        input,
      );
      const result = await this._recipeDatabase.createRecipe(
        context,
        mappedInput,
      );
      response = this._recipeMapper.mapAddFavouriteRecipeResponse(result);
    } catch (error) {
      const message = `Error while getting Recipes: ${error}`;
      context.log.error({ message });
      throw new RecipeServiceError({ message });
    }
    return response;
  }
}
