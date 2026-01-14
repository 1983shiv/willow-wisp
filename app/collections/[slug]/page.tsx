import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getShopifyData } from '@/lib/shopifyData';
import { CollectionViewTracker } from '@/components/collection-view-tracker';
import { ProductCard } from '@/components/product-card';
import { GetCollectionProductsData, ProductEdge } from '@/lib/shopifyTypes';

const GET_COLLECTION_PRODUCTS = `
    query getCollectionProducts($handle: String!)  {
        collectionByHandle(handle: $handle) {
            id
            handle
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

/**
 * Renders the shop collection page for the requested collection handle.
 *
 * Fetches collection data by handle derived from the provided route params and returns the component tree that displays collection details and its products; if the collection is missing or a fetch error occurs, returns a user-facing "not found" or error UI.
 *
 * @param params - A promise that resolves to route parameters. `slug` may be a string or an array-like value derived from the route and is used to determine the collection handle.
 * @returns The React element for the collection page (collection view with product grid, or an error/not-found UI).
 */
export default async function Collections({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    if (!slug) notFound();

    const handle = Array.isArray(slug) ? slug[0] : slug;

    if (!handle) notFound();

    const { data, errors } = await getShopifyData<GetCollectionProductsData>(GET_COLLECTION_PRODUCTS,
        { handle: handle },
        [`products-${handle}`]
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
                {products.map(({ node }: ProductEdge) => (
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