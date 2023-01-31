import {
  RecipeDatabaseCreateRecipeInput,
  RecipeDatabaseCreateRecipeResponse,
  RecipeDatabaseGetRecipesInput,
  RecipeDatabaseGetRecipesResponse,
} from "../../databases/recipe-database/recipe-database.type";
import {
  AddFavouriteRecipeInput,
  AddFavouriteRecipeResponse,
  GetFavouriteRecipesInput,
  GetFavouriteRecipesResponse,
  RecipeEdge,
  RecipeIngredient,
  RecipeIngredientMeasureUnit,
} from "../../features/graphql.type";

export class RecipeMapper {
  public mapRecipeDatabaseGetRecipesInput(
    input: GetFavouriteRecipesInput,
  ): RecipeDatabaseGetRecipesInput {
    return {
      name: input.name || undefined,
    };
  }

  public mapGetFavouriteRecipesResponse(
    response: RecipeDatabaseGetRecipesResponse,
  ): GetFavouriteRecipesResponse {
    return {
      edges: response.recipes.map<RecipeEdge>((recipe) => ({
        node: {
          name: recipe.name,
          ingredients: recipe.ingredients.map<RecipeIngredient>((
            ingredient,
          ) => ({
            name: ingredient.name,
            measure: {
              value: ingredient.value,
              unit: ingredient.unit
                ? RecipeIngredientMeasureUnit[
                  ingredient.unit as keyof typeof RecipeIngredientMeasureUnit
                ]
                : null,
            },
          })),
          method: recipe.method.map((step) => ({
            instructions: step.instructions,
          })),
        },
      })),
      total: response.total,
      // TODO: if time, implement pagination
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }

  public mapRecipeDatabaseCreateRecipeInput(
    input: AddFavouriteRecipeInput,
  ): RecipeDatabaseCreateRecipeInput {
    return {
      name: input.name,
      ingredients: input.ingredients.map((ingredient) => ({
        name: ingredient.name,
        value: ingredient.measure.value,
        unit: ingredient.measure.unit || null,
      })),
      method: input.method.map((step) => ({
        instructions: step.instructions,
      })),
    };
  }

  // Mutations
  public mapAddFavouriteRecipeResponse(
    response: RecipeDatabaseCreateRecipeResponse,
  ): AddFavouriteRecipeResponse {
    return {
      message:
        `Successfully added Recipe called ${response.name} with ID ${response.id}`,
    };
  }
}
