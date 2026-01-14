import useSWR from "swr";
import graphqlClient from "./graphql-client";

type Variables = Record<string, unknown> | undefined;

const fetcher =
  <TData>(query: string, variables?: Variables) =>
  async () =>
    graphqlClient.request<TData>(query, variables);

/**
 * Fetches Shopify GraphQL data with SWR caching and mutation support.
 *
 * @param key - SWR cache key tuple `[cacheKey, variables]` or `null` to disable fetching
 * @param query - GraphQL query string to execute
 * @param variables - Optional GraphQL variables to pass with the query
 * @returns An object with `data` (fetched result), `error` (fetch error if any), `isLoading` (loading state), and `mutate` (SWR mutate function)
 */
export function useShopifyQuery<TData>(
  key: [string, Variables] | null,
  query: string,
  variables?: Variables,
) {
  const { data, error, isLoading, mutate } = useSWR<TData>(
    key,
    fetcher<TData>(query, variables),
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}