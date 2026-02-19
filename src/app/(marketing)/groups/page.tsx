import Link from 'next/link';

export default function GroupsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Groups</p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">Create a trusted internship community.</h1>
          <p className="mt-4 text-lg text-slate-600">
            Groups can be closed (schools, YPO, scouting, churches) or open (geography, industry, occupation). A parent
            committee manages the process with oversight from the sponsoring organization.
          </p>
          <ul className="mt-6 space-y-3 text-slate-600">
            <li>Minimum recommended size: 5 families.</li>
            <li>Every participating parent pledges at least one internship.</li>
            <li>Group leaders coordinate timelines, reviews, and matching.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/apply/group-leader" className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white">
              Start a group
            </Link>
            <Link href="/how-it-works" className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700">
              See the process
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Group leader responsibilities</h2>
          <ol className="mt-4 space-y-3 text-sm text-slate-600">
            <li>1. Gather parent commitments and company details.</li>
            <li>2. Confirm student eligibility and timelines.</li>
            <li>3. Facilitate the matching process and communications.</li>
            <li>4. Track internship outcomes and feedback.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
