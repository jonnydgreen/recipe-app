import React from 'react'

import { Link } from '@remix-run/react'

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col justify-between">
      <nav className="bg-zinc-900">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link to={`/`}>
                  <img
                    className="block h-8 w-auto"
                    src="/logo.png"
                    alt="Recipe App"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="shrink-0 grow basis-auto text-gray-900">{children}</main>
      <footer className="shrink-0 bg-zinc-900 px-2 py-8 text-white sm:px-6 lg:px-8"></footer>
    </div>
  )
}
