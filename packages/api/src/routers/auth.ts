import { userService } from "../services/user.service";
import { adminProcedure, createRouter } from "../trpc";

export const authRouter = createRouter({
  /*getName: adminProcedure.query(({ ctx }) => ({
    name: `${ctx.user.personal.lastName} ${ctx.user.contact.email}`,
  })),

  invalidateUser: adminProcedure.mutation(async ({ ctx }) => {
    await userService.invalidateUserCache(ctx.auth.userId as string); // userId is always defined since this is a protected route
  }),*/
});
