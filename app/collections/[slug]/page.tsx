import graphqlClient from '@/lib/graphql-client';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const GET_COLLECTION_PRODUCTS = `
    query getCollectionProducts($handle: String!)  {
        collectionByHandle(handle: $handle) {
            id
            title
            description
            image {
            url
            altText
            }
            products(first: 10) {
            edges {
                node {
                id
                handle
                title
                priceRange {
                    minVariantPrice {
                    amount
                    currencyCode
                    }
                }
                featuredImage {
                    url
                    altText
                }
                }
            }
            }
        }
    }
`;

export default async function Collections({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    if (!slug) notFound();

    const handle = Array.isArray(slug) ? slug[0] : slug;

    if (!handle) notFound();

    const { data, errors, extensions } = await graphqlClient.request(
        GET_COLLECTION_PRODUCTS,
        { variables: { handle: handle } }
    );

    if (errors) {
        console.error(errors);
        // Optionally, render an error message to the user
        return (
            <main className="max-w-7xl mx-auto p-6 text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Something went wrong
                </h1>
                <p className="text-red-500">
                    Could not load collections. Please try again later.
                </p>
            </main>
        );
    }

    const collection = data?.collectionByHandle;
    
    if (!collection) {
        return (
            <main className="max-w-7xl mx-auto p-10 text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Collection Not Found
                </h1>
                <Link href="/shop" className="text-primary hover:underline">
                    Return to Shop
                </Link>
            </main>
        );
    }

    const products = collection.products?.edges || [];

    return (
        <main className="max-w-7xl mx-auto p-10 ">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">{collection.title}</h1>
                {collection.description && (
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
                        {collection.description}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(({ node }: any) => (
                    <Link
                        key={node.id}
                        href={`/product/${node.handle}`}
                        className="group block border p-4 rounded-lg hover:shadow-lg transition-shadow dark:border-slate-800"
                    >
                        <div className="aspect-square relative overflow-hidden rounded-md mb-4">
                            {node.featuredImage ? (
                                <Image
                                    src={node.featuredImage.url}
                                    alt={
                                        node.featuredImage.altText || node.title
                                    }
                                    fill
                                    loading="eager"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    className="object-cover group-hover:scale-105 transition-transform"
                                />
                            ) : (
                                <div className="bg-gray-100 dark:bg-slate-800 w-full h-full flex items-center justify-center text-slate-500">
                                    No Image
                                </div>
                            )}
                        </div>
                        <h2 className="font-semibold text-lg text-slate-900 dark:text-white">
                            {node.title}
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {node.priceRange.minVariantPrice.amount}{' '}
                            {node.priceRange.minVariantPrice.currencyCode}
                        </p>
                    </Link>
                ))}
            </div>
        </main>
    );
}
