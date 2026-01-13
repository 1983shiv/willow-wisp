import graphqlClient from '@/lib/graphql-client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CollectionViewTracker } from '@/components/collection-view-tracker';
import { ProductCard } from '@/components/product-card';

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
            <CollectionViewTracker
                collectionId={collection.id}
                collectionTitle={collection.title}
                collectionHandle={handle}
                productCount={products.length}
            />
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
                    <ProductCard
                        key={node.id}
                        productId={node.id}
                        productHandle={node.handle}
                        productTitle={node.title}
                        price={parseFloat(node.priceRange.minVariantPrice.amount)}
                        currency={node.priceRange.minVariantPrice.currencyCode}
                        imageUrl={node.featuredImage?.url}
                        imageAlt={node.featuredImage?.altText || node.title}
                        collectionHandle={handle}
                    />
                ))}
            </div>
        </main>
    );
}
