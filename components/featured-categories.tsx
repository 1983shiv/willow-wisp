'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import posthog from 'posthog-js'

const categories = [
  {
    name: 'For Dreamers',
    href: '/collectionss/aromatherapy',
    src: '/images/cozy-reading-nook-essentials-flat-lay-for-dreamers_3c431d9ed6.webp',
    alt: 'Cozy reading nook essentials flat lay for dreamers'
  },
  {
    name: 'For Makers',
    href: '/collections/vases-pottery',
    src: '/images/art-supplies-and-notebook-flat-lay-for-makers_a8b4983a0f.webp',
    alt: 'Art supplies and notebook flat lay for makers',
    icon: 'brush'
  },
  {
    name: 'For Hosts',
    href: '/collections/all-botanical',
    src: '/images/kitchen-and-dining-accessories-flat-lay-for-hosts_77441eeff2.webp',
    alt: 'Kitchen and dining accessories flat lay for hosts'
  },
  {
    name: 'For Growers',
    href: '/collections/wall-art',
    src: '/images/plant-care-tools-and-pots-flat-lay-for-gardeners_cb9f5f7d0a.webp',
    alt: 'Plant care tools and pots flat lay for gardeners'
  }
]

export function FeaturedCategories() {
  const handleCategoryClick = (categoryName: string, categoryHref: string) => {
    posthog.capture('category_clicked', {
      category_name: categoryName,
      category_url: categoryHref,
      location: 'featured_categories',
    });
  };

  return (
    <section className="py-24 bg-white dark:bg-background-dark relative overflow-hidden">
      {/* Illustrative accent */}
      <div className="absolute top-10 right-10 opacity-20 rotate-12 pointer-events-none">
        <span className="material-symbols-outlined text-[120px] text-primary">auto_awesome</span>
      </div>
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">Find the Perfect Match</h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">Browse by personality and passion</p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} onClick={() => handleCategoryClick(category.name, category.href)} className="group flex flex-col items-center gap-4">
              <div className="relative size-40 overflow-hidden rounded-full border-4 border-transparent transition-all duration-300 group-hover:scale-105 group-hover:border-primary/30 md:size-48 shadow-xl shadow-slate-200 dark:shadow-none">
                <Image 
                  src={category.src} 
                  alt={category.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 160px, 192px"
                />
                {category.icon && (
                  <div className="absolute bottom-4 right-8 bg-white text-primary rounded-full p-1 shadow-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">{category.icon}</span>
                  </div>
                )}
              </div>
              <span className="text-lg font-bold text-slate-900 group-hover:text-primary dark:text-white transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}