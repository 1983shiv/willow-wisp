'use client'

import posthog from 'posthog-js'

interface AddToCartButtonProps {
  productId: string;
  productTitle: string;
  productHandle: string;
  price: number;
  currency: string;
  availableForSale: boolean;
}

export function AddToCartButton({
  productId,
  productTitle,
  productHandle,
  price,
  currency,
  availableForSale,
}: AddToCartButtonProps) {
  const handleAddToCart = () => {
    if (!availableForSale) return;

    posthog.capture('add_to_cart_clicked', {
      product_id: productId,
      product_title: productTitle,
      product_handle: productHandle,
      price: price,
      currency: currency,
    });

    // Here you would also add the actual add-to-cart logic
  };

  return (
    <button
      type="button"
      disabled={!availableForSale}
      onClick={handleAddToCart}
      className={`flex w-full items-center justify-center rounded-lg px-8 py-4 text-base font-bold text-white shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        availableForSale
          ? 'bg-primary hover:bg-primary-hover shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 focus:ring-primary'
          : 'cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-400 shadow-none'
      }`}
    >
      {availableForSale ? 'Add to Cart' : 'Out of Stock'}
    </button>
  );
}
