import Link from 'next/link';

export default function MarketingHome() {
  return (
    <div>
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                InternAround.com
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900">
                A social internship club where every student gets a fair shot.
              </h1>
              <p className="text-lg text-slate-600">
                InternAround connects students, parents, and employers through trusted groups like schools, community
                organizations, and parent networks. Families sponsor internships, students apply, and a transparent
                matching system helps distribute opportunities equitably.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/apply/group-leader"
                  className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Start a group
                </Link>
                <Link
                  href="/apply/student"
                  className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400"
                >
                  Apply as a student
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700">Internship supply</p>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">Growing</span>
                </div>
                <p className="text-3xl font-bold text-slate-900">1 internship can serve 2+ students</p>
                <p className="text-sm text-slate-600">
                  Companies can split a summer opportunity into two rotations, increasing access without expanding
                  headcount.
                </p>
                <div className="mt-6 grid gap-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Students in group</span>
                    <span className="font-semibold text-slate-900">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Internships pledged</span>
                    <span className="font-semibold text-slate-900">15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Matches in progress</span>
                    <span className="font-semibold text-slate-900">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Parents</p>
            <h2 className="text-2xl font-semibold text-slate-900">Offer an internship through your network.</h2>
            <p className="text-slate-600">
              Families contribute internships from their employers. The pool of student placements grows with each
              pledged opportunity.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Students</p>
            <h2 className="text-2xl font-semibold text-slate-900">Apply, rank, and compete fairly.</h2>
            <p className="text-slate-600">
              Students build resumes, rank internships by priority, and interview just like the real world. Rankings
              remain confidential.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Organizations</p>
            <h2 className="text-2xl font-semibold text-slate-900">Create a trusted group.</h2>
            <p className="text-slate-600">
              Schools, YPO chapters, churches, and clubs can sponsor closed or open groups with oversight and
              equitable access.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-3xl font-semibold">How the matching works</h2>
              <p className="mt-4 text-slate-300">
                Students rank every internship. The system matches priorities against available slots while keeping
                preferences confidential and balancing supply and demand.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/how-it-works" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                  Learn the process
                </Link>
                <Link href="/apply/company" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                  Offer an internship
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">Group leader checklist</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>Recruit at least five families to start.</li>
                <li>Confirm internship pledges from parents.</li>
                <li>Approve student applications and resumes.</li>
                <li>Coordinate placement timelines and feedback.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
