'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Building2, ClipboardList, Users } from 'lucide-react';

export default function AppHome() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-4 mb-10">
          <p className="text-sm uppercase tracking-wide text-slate-500">InternAround Console</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Manage groups, internships, and student matches
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl">
            Use the console to review applications, publish internships, and coordinate placements for your community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
              <Users className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Group Applications</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Review new group leader applications and activate groups.
            </p>
            <Button variant="outline" onClick={() => router.push('/app/applications')} className="mt-auto">
              Review Applications
              <ArrowRight />
            </Button>
          </Card>

          <Card className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
              <Building2 className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Internship Listings</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Track company submissions and publish verified internships.
            </p>
            <Button variant="outline" onClick={() => router.push('/app/internships')} className="mt-auto">
              View Listings
              <ArrowRight />
            </Button>
          </Card>

          <Card className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
              <ClipboardList className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Matching Assistant</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Ask the AI assistant to help balance student preferences and internship supply.
            </p>
            <Button onClick={() => router.push('/app/matching')} className="mt-auto">
              Start Matching Session
              <ArrowRight />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
