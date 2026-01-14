"use client"

import { useState } from "react"
import { useShopifyQuery } from "@/lib/hooks/useShopifyQuery"
import { useDebounce } from "@/lib/hooks/useDebounce"
import { SEARCH_PRODUCTS_QUERY } from "@/lib/queries/search"
import Image from "next/image"
import Link from "next/link"
import { ProductEdge, SearchProductsData } from "@/lib/shopifyTypes"

export default function Search(){
    const [searchTerm, setSearchTerm] = useState('')
    // wait for 500ms after typing stop before updating debounceTerm
    const debounceTerm = useDebounce(searchTerm, 500)

    // Shopify Search Syntax: "Title:shoes*" finds product starting with "shoes"
    // we only enable the query if the user has types atleast 3 chars

    const shouldFetch = debounceTerm.length>2;
    const searchVariables = { query : `title: ${debounceTerm}*`}

    const { data, isLoading, error} = useShopifyQuery<SearchProductsData>(
        shouldFetch?['search-products', searchVariables]:null,
        SEARCH_PRODUCTS_QUERY,
        searchVariables
    )

    const products = data?.products.edges || [];

    return(
        <div className="relative w-full max-w-md mx-auto">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search Products"
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Loading Spinner */}
            {isLoading && (
                <div className="absolute right-3 top-3">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            {/* Results Dropdown */}
            {shouldFetch && (products.length > 0 || error) && (
                <div className="absolute z-10 w-full mt-2 bg-slate-50 border rounded-lg shadow-xl max-h-96 overflow-y-auto">
                    {error && <div className="p-4 text-red-500 ">Error Loading Results .</div>}
                    {products.map(({node}: ProductEdge) => (
                        <Link 
                            href={`/product/${node.handle}`}
                            key={node.id}
                            className="flex items-center gap-4 p-3 hover:bg-slate-100 transition-colors"
                        >
                            {node.featuredImage && (
                                <Image
                                    src={node.featuredImage.url}
                                    alt={node.featuredImage.altText || node.title}
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 object-cover rounded"
                                />
                            )}
                            <div>
                                <p className="font-medium text-slate-500">{node.title}</p>
                                <p className="text-sm text-slate-300">
                                    {node.priceRange.minVariantPrice.amount}{node.priceRange.minVariantPrice.currencyCode}
                                </p>
                            </div>
                        </Link>
                    ))}
                    {/* No Results Found */}
                    {!isLoading && products.length === 0 && (
                        <div className="p-4 text-center text-primary">
                            No Product found for {debounceTerm}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}