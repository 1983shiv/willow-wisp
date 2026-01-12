import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-paper-white px-6 py-24 text-center dark:bg-background-dark">
      <div className="relative mb-8 flex items-center justify-center">
        {/* Glowing background effect */}
        <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-3xl" />
        <span className="material-symbols-outlined relative text-9xl text-primary select-none">
          potted_plant
        </span>
      </div>
      
      <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
        404: Lost in the Woods
      </h1>
      
      <p className="mb-10 max-w-md text-lg font-light text-slate-600 dark:text-slate-300">
        We couldn't find the page you were looking for. It might have been moved, deleted, or perhaps it never existed at all.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link 
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:translate-y-[-2px] hover:shadow-xl hover:shadow-primary/40"
        >
          Return Home
        </Link>
        <Link 
          href="/shop"
          className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-200 bg-white px-8 text-base font-bold text-slate-900 transition-all hover:border-primary/50 hover:bg-primary/5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          Browse Shop
        </Link>
      </div>
    </div>
  )
}