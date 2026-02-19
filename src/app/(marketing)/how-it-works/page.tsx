import Link from 'next/link';

const steps = [
  {
    title: 'Form a trusted group',
    description:
      'Groups are created by schools, community organizations, or parent leaders. Each group has clear oversight and defined membership.',
  },
  {
    title: 'Parents pledge internships',
    description:
      'Each participating parent offers at least one internship from their employer or network. Employers can split a summer into multiple rotations.',
  },
  {
    title: 'Students apply and rank',
    description:
      'Students submit resumes, cover letters, and rank available internships. Rankings are confidential and used only for matching.',
  },
  {
    title: 'Match and confirm placements',
    description:
      'A matching algorithm balances student preferences and internship supply. Students can decline once if another placement is available.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">How it works</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-900">A clear path from interest to internship.</h1>
        <p className="mt-4 text-lg text-slate-600">
          InternAround is built to be fair, transparent, and scalable. The program keeps opportunity inside a trusted
          group while encouraging students to also seek opportunities outside the group.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {steps.map((step, index) => (
          <div key={step.title} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Step {index + 1}</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{step.title}</h2>
            <p className="mt-3 text-slate-600">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-slate-50 p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Equity and accessibility</h2>
        <p className="mt-3 text-slate-600">
          The goal is to offer every student a meaningful opportunity regardless of family income. Groups are
          encouraged to source additional internships from community partners when demand exceeds supply and to plan
          for reasonable accommodations.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/apply/group-leader" className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white">
            Start a group
          </Link>
          <Link href="/apply/student" className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700">
            Student application
          </Link>
        </div>
      </div>
    </div>
  );
}
