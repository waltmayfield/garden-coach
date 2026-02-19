'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { internaroundClient } from '@/lib/internaroundClient';
import { parseJsonList, runMatching } from '@/lib/matching';

export default function MatchingSessionPage() {
  const [groupId, setGroupId] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [matches, setMatches] = React.useState<ReturnType<typeof runMatching>>([]);
  const [stats, setStats] = React.useState({ students: 0, internships: 0, assigned: 0 });

  const handleRunMatching = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const [studentsResult, internshipsResult, preferencesResult] = await Promise.all([
        internaroundClient.models.StudentApplication.list({
          filter: groupId ? { groupId: { eq: groupId } } : undefined,
        }),
        internaroundClient.models.Internship.list({
          filter: groupId ? { groupId: { eq: groupId } } : undefined,
        }),
        internaroundClient.models.StudentInternshipPreference.list(),
      ]);

      if (
        studentsResult.errors?.length ||
        internshipsResult.errors?.length ||
        preferencesResult.errors?.length
      ) {
        const errors = [
          ...(studentsResult.errors ?? []),
          ...(internshipsResult.errors ?? []),
          ...(preferencesResult.errors ?? []),
        ];
        throw new Error(errors.map((err) => err.message).join(', '));
      }

      const preferences = preferencesResult.data ?? [];
      const preferencesByStudent = new Map<string, { internshipId: string; rank?: number | null }[]>();
      preferences.forEach((pref) => {
        if (!pref.studentApplicationId || !pref.internshipId) return;
        const list = preferencesByStudent.get(pref.studentApplicationId) ?? [];
        list.push({ internshipId: pref.internshipId, rank: pref.rank ?? undefined });
        preferencesByStudent.set(pref.studentApplicationId, list);
      });

      const students = (studentsResult.data ?? []).map((student) => {
        const preferenceList = preferencesByStudent.get(student.id) ?? [];
        const sortedPrefs = preferenceList
          .slice()
          .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
          .map((pref) => pref.internshipId);

        const fallbackList = parseJsonList(
          typeof student.rankedInternshipIds === 'string'
            ? student.rankedInternshipIds
            : JSON.stringify(student.rankedInternshipIds ?? [])
        );

        return {
          id: student.id,
          studentName: student.studentName,
          rankedInternshipIds: sortedPrefs.length > 0 ? sortedPrefs : fallbackList,
        };
      });

      const internships = (internshipsResult.data ?? []).map((internship) => ({
        id: internship.id,
        title: internship.title,
        numberOfInterns: internship.numberOfInterns ?? 0,
      }));

      const result = runMatching(students, internships);
      const assigned = result.filter((item) => item.internshipId).length;

      setMatches(result);
      setStats({ students: students.length, internships: internships.length, assigned });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to run matching.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12 space-y-8">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">Matching session</p>
          <h1 className="text-3xl font-semibold text-slate-900">Generate internship matches</h1>
          <p className="text-slate-600 mt-2">
            Run the matching algorithm using student rankings and available internship slots.
          </p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] items-end">
            <div>
              <label className="text-sm font-medium text-slate-700">Group ID (optional)</label>
              <Input
                value={groupId}
                onChange={(event) => setGroupId(event.target.value)}
                placeholder="Filter by group ID"
              />
            </div>
            <Button onClick={handleRunMatching} disabled={loading}>
              {loading ? 'Running...' : 'Run matching'}
            </Button>
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-4">
              <p className="text-sm text-slate-500">Students</p>
              <p className="text-2xl font-semibold text-slate-900">{stats.students}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-slate-500">Internships</p>
              <p className="text-2xl font-semibold text-slate-900">{stats.internships}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-slate-500">Assigned</p>
              <p className="text-2xl font-semibold text-slate-900">{stats.assigned}</p>
            </Card>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">Match results</h2>
          {matches.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">Run a matching session to see results.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {matches.map((match) => (
                <div key={match.studentId} className="border-b border-slate-100 pb-3">
                  <p className="font-medium text-slate-900">{match.studentName}</p>
                  <p className="text-sm text-slate-600">
                    {match.internshipTitle ? `Matched to ${match.internshipTitle}` : 'Unassigned'} · {match.reason}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
