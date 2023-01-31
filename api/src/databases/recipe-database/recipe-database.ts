import { Context, ServerContext } from "../../lib";
import { RecipeDatabaseError } from "./recipe-database.error";
import {
  RecipeDatabaseCreateRecipeInput,
  RecipeDatabaseCreateRecipeResponse,
  RecipeDatabaseGetRecipesInput,
  RecipeDatabaseGetRecipesResponse,
} from "./recipe-database.type";

export class RecipeDatabase {
  constructor(private readonly serverContext: ServerContext) {}

  public async createRecipe(
    context: Context,
    input: RecipeDatabaseCreateRecipeInput,
  ): Promise<RecipeDatabaseCreateRecipeResponse> {
    let response: RecipeDatabaseCreateRecipeResponse;
    try {
      response = await this.serverContext.db.recipe.create({
        data: {
          name: input.name,
          ingredients: {
            createMany: {
              data: input.ingredients,
            },
          },
          method: {
            createMany: {
              data: input.method,
            },
          },
        },
      });
    } catch (error) {
      const message = `Error while creating Recipe: ${error}`;
      context.log.error({ message });
      throw new RecipeDatabaseError({ message });
    }
    return response;
  }

  public async getRecipes(
    context: Context,
    input: RecipeDatabaseGetRecipesInput,
  ): Promise<RecipeDatabaseGetRecipesResponse> {
    let response;
    try {
      context.log.debug({
        message: `Executing database query input: ${JSON.stringify(input)}`,
      });
      response = await this.serverContext.db.recipe.findMany({
        where: {
          ...(input.name ? { name: input.name } : {}),
        },
        include: {
          ingredients: true,
          method: true,
        },
      });
    } catch (error) {
      const message = `Error while getting Recipes: ${error}`;
      context.log.error({ message });
      throw new RecipeDatabaseError({ message });
    }
    context.log.debug({ message: `Found ${response.length} recipes` });
    return {
      total: response.length,
      recipes: response,
    };
  }
}
