'use client'

import Link from 'next/link'
import Image from 'next/image'
import posthog from 'posthog-js'

interface ProductCardProps {
  productId: string;
  productHandle: string;
  productTitle: string;
  price: number;
  currency: string;
  imageUrl?: string;
  imageAlt?: string;
  collectionHandle?: string;
}

export function ProductCard({
  productId,
  productHandle,
  productTitle,
  price,
  currency,
  imageUrl,
  imageAlt,
  collectionHandle,
}: ProductCardProps) {
  const handleProductClick = () => {
    posthog.capture('product_card_clicked', {
      product_id: productId,
      product_handle: productHandle,
      product_title: productTitle,
      price: price,
      currency: currency,
      source_collection: collectionHandle || 'unknown',
    });
  };

  return (
    <Link
      href={`/product/${productHandle}`}
      onClick={handleProductClick}
      className="group block border p-4 rounded-lg hover:shadow-lg transition-shadow dark:border-slate-800"
    >
      <div className="aspect-square relative overflow-hidden rounded-md mb-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt || productTitle}
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
        {productTitle}
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
        {price} {currency}
      </p>
    </Link>
  );
}
