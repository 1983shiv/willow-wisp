'use client'

import posthog from 'posthog-js'

interface CollectionViewTrackerProps {
  collectionId: string;
  collectionTitle: string;
  collectionHandle: string;
  productCount: number;
}

// Module-level tracking to prevent duplicate tracking during the same session
const trackedCollections = new Set<string>();

export function CollectionViewTracker({
  collectionId,
  collectionTitle,
  collectionHandle,
  productCount,
}: CollectionViewTrackerProps) {
  // Use module-level Set to track if we've already tracked this collection in this session
  if (typeof window !== 'undefined' && !trackedCollections.has(collectionId)) {
    trackedCollections.add(collectionId);
    posthog.capture('collection_viewed', {
      collection_id: collectionId,
      collection_title: collectionTitle,
      collection_handle: collectionHandle,
      product_count: productCount,
    });
  }

  return null;
}
