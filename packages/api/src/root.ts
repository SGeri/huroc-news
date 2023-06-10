import { authRouter } from "./routers/auth";
import { postsRouter } from "./routers/posts";
import { createRouter } from "./trpc";

export const appRouter = createRouter({
  auth: authRouter,
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;
