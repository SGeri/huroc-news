import type { GetServerSidePropsContext } from "next";
import { buildClerkProps, getAuth } from "@clerk/nextjs/server";

export const requireAuth = () => {
  return (ctx: GetServerSidePropsContext) => {
    const { userId } = getAuth(ctx.req);

    if (!userId) return redirect(ctx);

    return {
      props: {
        userId,
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
