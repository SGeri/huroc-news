import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { type Context } from "./context";
import {
  createProtectedProcedure,
  createRatelimitedProcedure,
} from "./procedures";

const t = initTRPC.context<Context>().create({
  transformer: superjson,

  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createRouter = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;

export const publicProcedure = createRatelimitedProcedure(10, "5 s");
export const protectedProcedure = createProtectedProcedure();

export { createProtectedProcedure } from "./procedures";
