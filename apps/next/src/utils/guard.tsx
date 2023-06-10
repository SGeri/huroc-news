import superjson from "superjson";
import { User } from "@packages/db";
import { ProtectedPage, RequireAuthReturnedProps } from "./auth";

// has to be in a separate file other than auth.tsx because server / client code separtaion. TODO: investigate

export const withParsedUser = (Page: ProtectedPage) => {
  return ({ _user }: RequireAuthReturnedProps) => {
    const user = superjson.parse<User>(_user);

    return <Page user={user} />;
  };
};
