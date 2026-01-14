import { cache } from 'react';
import graphqlClient from './graphql-client'; // The client from File 2

// We wrap the execution logic in a cached function

export const getShopifyData = cache(async <T>(
  query: string,
  variables: Record<string, unknown> = {},
  tags: string[] = []
) => {
  const { data, errors, extensions } = await graphqlClient.request<T>(query, {
    variables,
    fetchApi: (url: string, options: RequestInit) =>
      fetch(url, {
        ...options,
        next: {
          revalidate: 3600,
          tags,
        },
      }),
  } as any);
  return { data, errors, extensions };
});