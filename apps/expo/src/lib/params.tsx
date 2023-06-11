import { FC } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

type SearchParams = Record<string, string | string[]>;

export type RouteProps<T> = {
  params: T;
  navigate: (pathname: string) => void;
};

export const keepParams = <T extends SearchParams>(
  Route: FC<RouteProps<T>>,
) => {
  return () => {
    const params = useLocalSearchParams<T>();
    const router = useRouter();

    const navigate = (pathname: string) => {
      router.push({
        pathname,
        params,
      });
    };

    // Type Conversion: Partial<T> -> T.
    // Type-safe since useLocalSearchParams returns a Partial<T>, but T is always kept in navigate()
    return <Route params={params as unknown as T} navigate={navigate} />;
  };
};
