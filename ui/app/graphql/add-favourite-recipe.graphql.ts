import { gql } from "graphql-request";

export const AddFavouriteRecipe = gql`
  mutation AddFavouriteRecipe($input: AddFavouriteRecipeInput!) {
    addFavouriteRecipe(input: $input) {
      __typename
      ... on AddFavouriteRecipeResult {
        message
      }
      ... on ServerError {
        message
        code
      }
    }
  }
`;

// {
//   "input": {
//     "name": "My Recipe",
//     "ingredients": [
//       { "name": "Salt", "measure": {"value": 10, "unit": "G"} },
//       { "name": "Pepper", "measure": {"value": 5, "unit": "G"} }
//     ],
//     "method": [
//       { "instructions": "Give it a shake!"}
//     ]
//   }
// }
