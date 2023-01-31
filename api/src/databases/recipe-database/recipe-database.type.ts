import { Recipe, RecipeIngredient, RecipeMethodStep } from "@prisma/client";

export type RecipeDatabaseCreateRecipeResponse = Recipe;

export interface RecipeDatabaseCreateRecipeInput {
  name: string;
  ingredients: Pick<RecipeIngredient, "name" | "unit" | "value">[];
  method: Pick<RecipeMethodStep, "instructions">[];
}

export interface RecipeDatabaseGetRecipesResult extends Recipe {
  ingredients: RecipeIngredient[]
  method: RecipeMethodStep[]
}

export interface RecipeDatabaseGetRecipesResponse {
  total: number;
  recipes: RecipeDatabaseGetRecipesResult[]
}

export interface RecipeDatabaseGetRecipesInput {
  name?: string;
}
