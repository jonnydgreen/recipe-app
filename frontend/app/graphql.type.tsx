export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddFavouriteRecipeIngredientInput = {
  measure: AddFavouriteRecipeIngredientMeasureInput;
  name: Scalars['String'];
};

export type AddFavouriteRecipeIngredientMeasureInput = {
  unit?: InputMaybe<RecipeIngredientMeasureUnit>;
  value: Scalars['Float'];
};

export type AddFavouriteRecipeInput = {
  ingredients: Array<AddFavouriteRecipeIngredientInput>;
  method: Array<AddFavouriteRecipeMethodStepInput>;
  name: Scalars['String'];
};

export type AddFavouriteRecipeMethodStepInput = {
  instructions: Scalars['String'];
};

export type AddFavouriteRecipeResponse = AddFavouriteRecipeResult | ServerError;

export type AddFavouriteRecipeResult = {
  __typename?: 'AddFavouriteRecipeResult';
  message: Scalars['String'];
};

export type GetFavouriteRecipesInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type GetFavouriteRecipesResponse = {
  __typename?: 'GetFavouriteRecipesResponse';
  edges: Array<RecipeEdge>;
  pageInfo: PageInfo;
  total: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavouriteRecipe?: Maybe<AddFavouriteRecipeResponse>;
};


export type MutationAddFavouriteRecipeArgs = {
  input: AddFavouriteRecipeInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  getFavouriteRecipes?: Maybe<GetFavouriteRecipesResponse>;
};


export type QueryGetFavouriteRecipesArgs = {
  input: GetFavouriteRecipesInput;
};

export type Recipe = {
  __typename?: 'Recipe';
  ingredients: Array<RecipeIngredient>;
  method: Array<RecipeMethodStep>;
  name: Scalars['String'];
};

export type RecipeEdge = {
  __typename?: 'RecipeEdge';
  node: Recipe;
};

export type RecipeIngredient = {
  __typename?: 'RecipeIngredient';
  measure: RecipeIngredientMeasure;
  name: Scalars['String'];
};

export type RecipeIngredientMeasure = {
  __typename?: 'RecipeIngredientMeasure';
  unit?: Maybe<RecipeIngredientMeasureUnit>;
  value: Scalars['Float'];
};

export enum RecipeIngredientMeasureUnit {
  G = 'G',
  Tbsp = 'TBSP',
  Tsp = 'TSP'
}

export type RecipeMethodStep = {
  __typename?: 'RecipeMethodStep';
  instructions: Scalars['String'];
};

export type ServerError = {
  __typename?: 'ServerError';
  code: Scalars['String'];
  message: Scalars['String'];
};

export type AddFavouriteRecipeMutationVariables = Exact<{
  input: AddFavouriteRecipeInput;
}>;


export type AddFavouriteRecipeMutation = { __typename?: 'Mutation', addFavouriteRecipe?: { __typename: 'AddFavouriteRecipeResult', message: string } | { __typename: 'ServerError', message: string, code: string } | null };

export type GetFavouriteRecipesQueryVariables = Exact<{
  input: GetFavouriteRecipesInput;
}>;


export type GetFavouriteRecipesQuery = { __typename?: 'Query', getFavouriteRecipes?: { __typename?: 'GetFavouriteRecipesResponse', total: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean }, edges: Array<{ __typename?: 'RecipeEdge', node: { __typename?: 'Recipe', name: string, ingredients: Array<{ __typename?: 'RecipeIngredient', name: string, measure: { __typename?: 'RecipeIngredientMeasure', value: number, unit?: RecipeIngredientMeasureUnit | null } }>, method: Array<{ __typename?: 'RecipeMethodStep', instructions: string }> } }> } | null };
