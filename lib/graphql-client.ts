import {createGraphQLClient} from '@shopify/graphql-client';

const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ENDPOINT!;
const token = process.env.NEXT_SHOPIFY_PUBLIC_ACCESS_TOKEN!;

const graphqlClient = createGraphQLClient({
  url: `https://${endpoint}/api/2026-01/graphql.json`,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token,
  },
  retries: 1
});

export default graphqlClient;