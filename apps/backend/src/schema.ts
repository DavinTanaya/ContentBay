import { createSchema } from "graphql-yoga";
import { readFileSync } from "fs";
import path from "path";

import { authResolvers } from "./graphql/resolvers/auth";
import { Context } from "./context";

/**
 * Load .graphql file
 */
function loadSchema(name: string) {
  return readFileSync(
    path.join(__dirname, "graphql/schema", name),
    "utf8"
  );
}

export const schema = createSchema<Context>({
  typeDefs: [
    loadSchema("base.graphql"),
    loadSchema("auth.graphql"),
    loadSchema("user.graphql"),
  ],

  resolvers: [authResolvers],
});
