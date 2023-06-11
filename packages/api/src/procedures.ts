import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@packages/db";
import { middleware, procedure, publicProcedure } from "./trpc";

export const createProtectedProcedure = () => {
  const procedureMiddleware = middleware(async ({ next, ctx }) => {
    if (!ctx.auth.userId)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not authenticated",
      });

    return next({
      ctx: {
        ...ctx,
        user: ctx.auth.user,
      },
    });
  });

  return publicProcedure.use(procedureMiddleware);
};

type Window = Parameters<typeof Ratelimit.fixedWindow>[1];

export const createRatelimitedProcedure = (
  limit = 10,
  window: Window = "5 s",
) => {
  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(limit, window),
  });

  const procedureMiddleware = middleware(async ({ next, ctx }) => {
    const identifier = ctx.ip; // what to do if ip is null?
    const result = await ratelimit.limit(identifier as string);

    if (identifier && !result.success)
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "You are ratelimited, please slow down",
      });

    return next({ ctx });
  });

  return procedure.use(procedureMiddleware);
};
