import { FC } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

type SearchParams = Record<string, string | string[]>;

export type RouteProps<T> = {
  params: Partial<T>;
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

    return <Route params={params} navigate={navigate} />;
  };
};
