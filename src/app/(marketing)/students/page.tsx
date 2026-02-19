import Link from 'next/link';

export default function StudentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Students</p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">Build real-world experience early.</h1>
          <p className="mt-4 text-lg text-slate-600">
            Students create resumes, submit cover letters, and rank internships. The program encourages every student
            to apply outside the group as well, widening their options.
          </p>
          <ul className="mt-6 space-y-3 text-slate-600">
            <li>Rank every internship by priority.</li>
            <li>Share any companies you cannot work for.</li>
            <li>Provide availability dates and accommodations if needed.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/apply/student" className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white">
              Student application
            </Link>
            <Link href="/how-it-works" className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700">
              Learn about matching
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Student checklist</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>✔ Resume and cover letter ready</p>
            <p>✔ Availability dates confirmed</p>
            <p>✔ Internship ranking completed</p>
            <p>✔ Outside applications submitted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
