'use client'

import posthog from 'posthog-js'

interface ProductViewTrackerProps {
  productId: string;
  productTitle: string;
  productHandle: string;
  price: number;
  currency: string;
  availableForSale: boolean;
}

// Module-level tracking to prevent duplicate tracking during the same session
const trackedProducts = new Set<string>();

export function ProductViewTracker({
  productId,
  productTitle,
  productHandle,
  price,
  currency,
  availableForSale,
}: ProductViewTrackerProps) {
  // Use module-level Set to track if we've already tracked this product in this session
  if (typeof window !== 'undefined' && !trackedProducts.has(productId)) {
    trackedProducts.add(productId);
    posthog.capture('product_viewed', {
      product_id: productId,
      product_title: productTitle,
      product_handle: productHandle,
      price: price,
      currency: currency,
      available_for_sale: availableForSale,
    });
  }

  return null;
}
