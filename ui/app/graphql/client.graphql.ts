import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
  process.env.API_URL ?? "http://127.0.0.1:4000/graphql",
);
