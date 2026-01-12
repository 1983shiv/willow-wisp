import graphqlClient from '@/lib/graphql-client';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const GET_PRODUCT = `
    query getProduct($handle: String!)  {
        productByHandle(handle: $handle) {
            id
            handle
            title
            description
            availableForSale
            priceRange {
            minVariantPrice {
                amount
                currencyCode
            }
            maxVariantPrice {
                amount
                currencyCode
            }
            }
            featuredImage {
            url
            altText
            }
            variants(first: 10) {
            edges {
                node {
                id
                title
                sku
                availableForSale
                price {
                    amount
                    currencyCode
                }
                }
            }
            }
        }
    }
`;

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    if (!slug) notFound();

    const handle = Array.isArray(slug) ? slug[0] : slug;

    if (!handle) notFound();

    const { data, errors, extensions } = await graphqlClient.request(
        GET_PRODUCT,
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
                    Could not load product. Please try again later.
                </p>
            </main>
        );
    }

    const product = data?.productByHandle;
    
    if (!product) {
        return (
            <main className="max-w-7xl mx-auto p-10 text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Product Not Found
                </h1>
                <Link href="/shop" className="text-primary hover:underline">
                    Return to Shop
                </Link>
            </main>
        );
    }

    const { minVariantPrice } = product.priceRange;

    return (
        <main className="mx-auto max-w-7xl px-6 lg:px-8 py-12 sm:py-24">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                {/* Image Gallery */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800">
                    {product.featuredImage ? (
                        <Image
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText || product.title}
                            fill
                            className="object-cover object-center"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-slate-400">
                            No image available
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        {product.title}
                    </h1>
                    
                    <div className="mt-4">
                        <p className="text-3xl tracking-tight text-slate-900 dark:text-white">
                            {parseFloat(minVariantPrice.amount).toLocaleString('en-US', {
                                style: 'currency',
                                currency: minVariantPrice.currencyCode,
                            })}
                        </p>
                    </div>

                    <div className="mt-8 space-y-6 text-base text-slate-600 dark:text-slate-300">
                        <p>{product.description}</p>
                    </div>

                    <div className="mt-10">
                        <button
                            type="button"
                            disabled={!product.availableForSale}
                            className={`flex w-full items-center justify-center rounded-lg px-8 py-4 text-base font-bold text-white shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                product.availableForSale
                                    ? 'bg-primary hover:bg-primary-hover shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 focus:ring-primary'
                                    : 'cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-400 shadow-none'
                            }`}
                        >
                            {product.availableForSale ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                    
                    <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-lg">local_shipping</span>
                            <span>Free shipping on orders over $100</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
