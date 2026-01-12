import graphqlClient from '@/lib/graphql-client';
import Link from 'next/link';
import Image from 'next/image';

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
                    <Link
                        key={node.id}
                        href={`/collections/${node.handle}`}
                        className="group block border p-4 rounded-lg hover:shadow-lg transition-shadow dark:border-slate-800"
                    >
                        <div className="aspect-square relative overflow-hidden rounded-md mb-4">
                            {node.image ? (
                                <Image
                                    src={node.image.url}
                                    alt={node.image.altText || node.title}
                                    fill
                                    loading="eager"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    className="object-cover group-hover:scale-105 transition-transform"
                                />
                            ) : (
                                <div className="bg-gray-100 dark:bg-slate-800 w-full h-full flex items-center justify-center text-slate-500">No Image</div>
                            )}
                        </div>
                        <h2 className="font-semibold text-lg text-slate-900 dark:text-white">{node.title}</h2>
                        {node.description && <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{node.description}</p>}
                    </Link>
                ))}
            </div>
        </main>
    );
}
