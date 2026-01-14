import useSWR from "swr";
import graphqlClient from "./graphql-client";

type Variables = Record<string, unknown> | undefined;

const fetcher =
  <TData>(query: string) =>
  async ([, variables]: [string, Variables]) =>
    graphqlClient.request<TData>(query, variables);

export function useShopifyQuery<TData>(
  key: [string, Variables] | null,
  query: string
) {
  const { data, error, isLoading, mutate } = useSWR<TData>(
    key,
    fetcher<TData>(query),
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
