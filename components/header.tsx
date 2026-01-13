"use client"

import Link from 'next/link'
import React from 'react'
import posthog from 'posthog-js'

const Header = () => {
  const handleNavigationClick = (navItem: string, href: string) => {
    posthog.capture('navigation_clicked', {
      nav_item: navItem,
      destination_url: href,
      nav_location: 'header',
    });
  };

  const handleSearchClick = () => {
    posthog.capture('search_clicked', {
      search_location: 'header',
    });
  };

  const handleCartClick = () => {
    posthog.capture('cart_viewed', {
      cart_location: 'header_icon',
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/95 backdrop-blur-md dark:bg-background-dark/95">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Left Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-3xl">local_florist</span>
            </div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Willow & Wisp</h1>
          </Link>
        </div>
        {/* Right Nav & Icons */}
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/shop" onClick={() => handleNavigationClick('Shop', '/shop')}>Shop</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/bundles" onClick={() => handleNavigationClick('Bundles', '/bundles')}>Bundles</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/about" onClick={() => handleNavigationClick('About', '/about')}>About</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/journal" onClick={() => handleNavigationClick('Journal', '/journal')}>Journal</Link>
          </nav>
          <div className="flex items-center gap-4 border-l border-slate-200 pl-8 dark:border-slate-800">
            <button className="group flex items-center justify-center rounded-full p-2 hover:bg-primary/10 transition-colors" onClick={handleSearchClick}>
              <span className="material-symbols-outlined text-slate-600 group-hover:text-primary dark:text-slate-300">search</span>
            </button>
            <Link href="/cart" className="group flex items-center justify-center rounded-full p-2 hover:bg-primary/10 transition-colors relative" onClick={handleCartClick}>
              <span className="material-symbols-outlined text-slate-600 group-hover:text-primary dark:text-slate-300">shopping_bag</span>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </Link>
            {/* Mobile Menu Button */}
            <button className="md:hidden flex items-center justify-center rounded-full p-2 hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header