import { gql } from "graphql-request";

export const GetFavouriteRecipes = gql`
  query GetFavouriteRecipes($input: GetFavouriteRecipesInput!) {
    getFavouriteRecipes(input: $input) {
      total
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          name
          ingredients {
            name
            measure {
              value
              unit
            }
          }
          method {
            instructions
          }
        }
      }
    }
  }
`;

// {
//   "input": { "name": "Yummy"}
// }
