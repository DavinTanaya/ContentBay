import { prisma } from "../db/prisma";
import { verifyToken } from "../lib/jwt";

export interface Context {
  prisma: typeof prisma;
  userId: number | null;
}

export function createContext({
  request,
}: {
  request: Request;
}): Context {
  const auth = request.headers.get("authorization");

  let userId: number | null = null;

  if (auth?.startsWith("Bearer ")) {
    try {
      const token = auth.slice(7);
      const decoded = verifyToken(token);

      userId = decoded.userId;
    } catch {
      console.warn("Invalid token");
    }
  }

  return { prisma, userId };
}
