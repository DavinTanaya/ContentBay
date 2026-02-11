import "dotenv/config";
import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";

import { schema } from "./schema";
import { createContext } from "./context";

const PORT = Number(process.env.PORT) || 4000;

// Safety check (biar nggak silent error)
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env");
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID is missing in .env");
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in .env");
}

const yoga = createYoga({
  graphqlEndpoint: "/",
  schema,
  context: createContext,

  // Optional: GraphiQL only in dev
  graphiql: process.env.NODE_ENV !== "production",
});

const server = createServer(yoga);

server.listen(PORT, () => {
  console.log(`
🚀 GraphQL Server ready
👉 http://localhost:${PORT}

Mode: ${process.env.NODE_ENV || "development"}
`);
});
