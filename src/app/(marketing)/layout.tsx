import Link from 'next/link';
import React from 'react';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            InternAround
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <Link href="/how-it-works" className="hover:text-slate-900">How it works</Link>
            <Link href="/groups" className="hover:text-slate-900">Groups</Link>
            <Link href="/students" className="hover:text-slate-900">Students</Link>
            <Link href="/companies" className="hover:text-slate-900">Companies</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/app"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300"
            >
              Log in
            </Link>
            <Link
              href="/apply/group-leader"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300"
            >
              Start a Group
            </Link>
            <Link
              href="/apply/student"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Student Apply
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-600">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-base font-semibold text-slate-900">InternAround</p>
              <p className="mt-2">
                A community-led internship club ensuring every student can access meaningful summer work.
              </p>
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">Get involved</p>
              <ul className="mt-2 space-y-2">
                <li><Link href="/apply/group-leader" className="hover:text-slate-900">Group leader application</Link></li>
                <li><Link href="/apply/student" className="hover:text-slate-900">Student application</Link></li>
                <li><Link href="/apply/company" className="hover:text-slate-900">Company internship offer</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">Contact</p>
              <p className="mt-2">hello@internaround.com</p>
              <p className="mt-1">Austin, TX</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
