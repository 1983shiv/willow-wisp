import Link from 'next/link';
import Image from 'next/image';

interface CollectionCardProps {
  collectionId: string;
  collectionHandle: string;
  collectionTitle: string;
  description: string | null;
  imageUrl?: string;
  imageAlt: string;
}

/**
 * Renders a link-styled card for a collection with an image, title, and optional description.
 *
 * @param collectionHandle - Collection handle used to build the card's href (navigates to /collections/{collectionHandle})
 * @param collectionTitle - Visible title shown on the card
 * @param description - Optional collection description; rendered when not null
 * @param imageUrl - Optional image URL; when omitted a "No Image" placeholder is shown
 * @param imageAlt - Alt text for the image element
 * @returns The rendered collection card element
 */
export function CollectionCard({
  collectionHandle,
  collectionTitle,
  description,
  imageUrl,
  imageAlt,
}: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collectionHandle}`}
      className="group block border p-4 rounded-lg hover:shadow-lg transition-shadow dark:border-slate-800"
    >
      <div className="aspect-square relative overflow-hidden rounded-md mb-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
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
        {collectionTitle}
      </h2>
      {description && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
          {description}
        </p>
      )}
    </Link>
  );
}