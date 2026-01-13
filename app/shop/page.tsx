import graphqlClient from '@/lib/graphql-client';
import { CollectionCard } from '@/components/collection-card';

const GET_COLLECTIONS = `
    query getCollections {
      collections(first: 10) {
        edges {
          node {
            id
            handle
            title
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
`;

export default async function Shop() {
    const { data, errors, extensions } = await graphqlClient.request(
        GET_COLLECTIONS
    );

    if (errors) {
        console.error(errors);
        // Optionally, render an error message to the user
        return (
            <main className="max-w-7xl mx-auto p-6 text-center">
                <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
                <p className="text-red-500">Could not load collections. Please try again later.</p>
            </main>
        );
    }

    const collections = data?.collections?.edges || [];
    
    return (
        <main className="max-w-7xl mx-auto p-10 ">
            <h1 className="text-4xl font-bold mb-8">Collections</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {collections.map(({ node }: any) => (
                    <CollectionCard
                        key={node.id}
                        collectionId={node.id}
                        collectionHandle={node.handle}
                        collectionTitle={node.title}
                        description={node.description}
                        imageUrl={node.image?.url}
                        imageAlt={node.image?.altText || node.title}
                    />
                ))}
            </div>
        </main>
    );
}
