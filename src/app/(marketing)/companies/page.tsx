import Link from 'next/link';

export default function CompaniesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Companies</p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">Offer internships that open doors.</h1>
          <p className="mt-4 text-lg text-slate-600">
            Employers can host one or more students for a full summer or split the season into multiple rotations.
            InternAround handles matching while you focus on mentorship.
          </p>
          <ul className="mt-6 space-y-3 text-slate-600">
            <li>Share job descriptions, duties, and availability.</li>
            <li>Choose in-person, remote, or hybrid options.</li>
            <li>Help your community and grow your talent pipeline.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/apply/company" className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white">
              Offer an internship
            </Link>
            <Link href="/how-it-works" className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700">
              See matching process
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Company details we collect</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Contact information and industry</li>
            <li>Job title, description, and duties</li>
            <li>Number of interns and start/end dates</li>
            <li>Location (in-person, remote, hybrid)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
