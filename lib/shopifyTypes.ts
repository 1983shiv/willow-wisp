export interface ShopifyImage {
    url: string;
    altText: string | null;
}

export interface Money {
    amount: string;
    currencyCode: string;
}

export interface ProductPriceRange {
    minVariantPrice: Money;
    maxVariantPrice?: Money;
}

export interface ProductVariant {
    id: string;
    title: string;
    sku: string | null;
    availableForSale: boolean;
    price: Money;
}

export interface ProductNode {
    id: string;
    handle: string;
    title: string;
    priceRange: ProductPriceRange;
    featuredImage: ShopifyImage | null;
}

export interface ProductEdge {
    node: ProductNode;
}

export interface ProductConnection {
    edges: ProductEdge[];
}

export interface Collection {
    id: string;
    handle: string;
    title: string;
    description: string | null;
    image: ShopifyImage | null;
    products?: ProductConnection;
}

export interface CollectionEdge {
    node: Collection;
}

export interface CollectionConnection {
    edges: CollectionEdge[];
}

export interface GetCollectionsData {
    collections: CollectionConnection;
}

export interface Product {
    id: string;
    handle: string;
    title: string;
    description: string;
    availableForSale: boolean;
    priceRange: {
        minVariantPrice: Money;
        maxVariantPrice: Money;
    };
    featuredImage: ShopifyImage | null;
    variants: {
        edges: {
            node: ProductVariant;
        }[];
    };
}

export interface GetCollectionProductsData {
    collectionByHandle: Collection | null;
}

export interface GetProductData {
    productByHandle: Product | null;
}

export interface SearchProductsData {
    products: ProductConnection;
}