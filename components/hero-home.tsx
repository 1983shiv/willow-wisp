"use client"

import Image from "next/image"
import Link from 'next/link'
export function HeroHome() {
  return (
    <section className="relative w-full overflow-hidden bg-texture">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left: Illustration & Content */}
        <div className="relative flex flex-col justify-center px-6 py-20 lg:px-12 xl:px-20 order-2 lg:order-1">
          {/* Background decoration simulating hand-drawn bow */}
          <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center lg:justify-start lg:-left-20">
            <Image
              src="/images/abstract-hand-drawn-decorative-gift-bow-illustrati_7c91bfdf7d.webp"
              alt="Abstract hand drawn decorative gift bow illustration line art"
              width={600}
              height={600}
              className="object-contain rotate-[-15deg]"
              priority
            />
          </div>
          <div className="relative z-10 flex flex-col items-start gap-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
              New Collection
            </span>
            <h1 className="text-2xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-4xl">
              Curated Whimsy for Every Occasion
            </h1>
            <p className="max-w-md text-lg text-slate-600 dark:text-slate-300">
              Hand-picked treasures wrapped with artisan charm. Discover the perfect gift that tells a story.
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="/shop" className="flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:translate-y-[-2px] hover:shadow-xl hover:shadow-primary/40">
                Explore Gifts
              </Link>
              <Link href="/bundles" className="flex h-12 items-center justify-center rounded-lg border border-slate-200 bg-white px-8 text-base font-bold text-slate-900 transition-all hover:border-primary/50 hover:bg-primary/5 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                View Bundles
              </Link>
            </div>
          </div>
        </div>
        {/* Right: Product Carousel/Image */}
        <div className="relative h-[50vh] w-full bg-[#f0ebeb] lg:h-auto order-1 lg:order-2">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <Image
              src="/images/hands-wrapping-a-gift-with-brown-paper-and-twine-a_6127ab1570.webp"
              alt="Top down flat lay of artisanal gifts on textured paper background"
              fill
              className="object-cover object-center transition-transform duration-[20s] hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          {/* Floating caption */}
          <div className="absolute bottom-8 left-8 right-8 rounded-xl bg-white/90 p-4 backdrop-blur shadow-sm dark:bg-slate-900/90 lg:left-12 lg:right-auto lg:w-64">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">The Artisan Set</p>
            <p className="text-xs text-slate-500">Includes handmade soaps & ceramic tray</p>
          </div>
        </div>
      </div>
    </section>
  )
}