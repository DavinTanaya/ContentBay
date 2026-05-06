import { createSchema } from "graphql-yoga";
import { existsSync, readFileSync } from "fs";
import path from "path";

import { authResolvers } from "./graphql/resolvers/auth";
import { Context } from "./context";

/**
 * Load .graphql file
 */
function loadSchema(name: string) {
  const schemaPaths = [
    path.join(__dirname, "graphql/schema", name),
    path.join(process.cwd(), "src/graphql/schema", name),
  ];
  const schemaPath = schemaPaths.find((candidate) => existsSync(candidate));

  if (!schemaPath) {
    throw new Error(`GraphQL schema file not found: ${name}`);
  }

  return readFileSync(schemaPath, "utf8");
}

export const schema = createSchema<Context>({
  typeDefs: [
    loadSchema("base.graphql"),
    loadSchema("auth.graphql"),
    loadSchema("user.graphql"),
  ],

  resolvers: [authResolvers],
});
