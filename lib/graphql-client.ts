import {createGraphQLClient} from '@shopify/graphql-client';

const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ENDPOINT!;
const token = process.env.NEXT_SHOPIFY_PUBLIC_ACCESS_TOKEN!;

const graphqlClient = createGraphQLClient({
  url: `https://${endpoint}/api/2026-01/graphql.json`,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token,
  },
  retries: 1,
  customFetchApi: (url, options) => {
    // We extract custom info we might have tucked into the headers
    const nextOptions = (options as any).nextOptions || { revalidate: 3600 };

    return fetch(url, {
      ...options,
      next: nextOptions,
    });
  },
  // Inject Next.js specific caching here
  // customFetchApi: (url, options) => {
  //   return fetch(url, {
  //     ...options,
  //     next: { revalidate: 3600 }, // Cache for 1 hour
  //   });
  // },
});

export default graphqlClient;