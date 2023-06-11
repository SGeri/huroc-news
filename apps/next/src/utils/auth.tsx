import type { GetServerSidePropsContext } from "next";
import { buildClerkProps, getAuth } from "@clerk/nextjs/server";

export const requireAuth = () => {
  return async (ctx: GetServerSidePropsContext) => {
    const user = getAuth(ctx.req);

    if (!user.userId) return redirect(ctx);

    return {
      props: {
        user,
        ...buildClerkProps(ctx.req),
      },
    };
  };
};

const redirect = (ctx: GetServerSidePropsContext, loggedIn?: boolean) => ({
  props: buildClerkProps(ctx.req),
  redirect: {
    permanent: false,

    // todo fix this because it can redirect to external sites - security issue
    // todo fix "/" because it might not be the main page
    destination: loggedIn
      ? "/"
      : "/sign-in?redirectUrl=" + encodeURIComponent(ctx.resolvedUrl),
  },
});
