import React from 'react'

const JoinWisp = () => {
  return (
    <section className="relative w-full overflow-hidden bg-paper-white dark:bg-background-dark py-16 sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 text-center lg:px-8">
            <div className='mb-6 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className="material-symbols-outlined text-2xl">mail</span>
            </div>
            <h2 className='text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl'>Join the Wisp</h2>
            <p className='mt-4 max-w-xl text-lg font-light text-slate-600 dark:text-slate-300'>
                Sprinkles of joy, curated finds, and a delightful <span className='font-medium text-primary'>10% off </span>your first order.
            </p>
            <form className='mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row'>
                <input 
                    type='email' 
                    placeholder="Enter your email"
                    className='w-full min-w-0 flex-auto rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white sm:text-sm'
                    required
                />
                <button 
                    type='submit' 
                    className='flex-none rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                >
                    Subscribe
                </button>
            </form>
            <p className='mt-4 text-xs font-light text-slate-500 dark:text-slate-400'>No spam, just whimsy.</p>
        </div>
    </section>    
  )
}

export default JoinWisp