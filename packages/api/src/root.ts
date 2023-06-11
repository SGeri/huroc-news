import { devicesRouter } from "./routers/devices";
import { postsRouter } from "./routers/posts";
import { statusRouter } from "./routers/status";
import { createRouter } from "./trpc";

export const appRouter = createRouter({
  posts: postsRouter,
  status: statusRouter,
  devices: devicesRouter,
});

export type AppRouter = typeof appRouter;
