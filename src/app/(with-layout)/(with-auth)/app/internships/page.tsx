'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { internaroundClient } from '@/lib/internaroundClient';
import Link from 'next/link';

type PositionType = 'FULL_TIME' | 'PART_TIME' | 'PROJECT' | 'OTHER';
type LocationType = 'IN_PERSON' | 'REMOTE' | 'HYBRID';
type InternshipItem = {
  id: string;
  title: string;
  companyId: string;
  status?: string | null;
};

export default function InternshipListingsPage() {
  const [loading, setLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [internships, setInternships] = React.useState<InternshipItem[]>([]);

  const [formData, setFormData] = React.useState({
    companyId: '',
    groupId: '',
    title: '',
    description: '',
    positionType: 'FULL_TIME' as PositionType,
    numberOfInterns: '1',
    startDate: '',
    endDate: '',
    locationType: 'IN_PERSON' as LocationType,
    locationDetails: '',
    dutiesRequired: '',
    otherInfo: '',
  });

  const loadInternships = React.useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await internaroundClient.models.Internship.list();
      if (result.errors?.length) {
        throw new Error(result.errors.map((err) => err.message).join(', '));
      }
      setInternships(result.data ?? []);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to load internships.');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadInternships();
  }, [loadInternships]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const result = await internaroundClient.models.Internship.create({
        companyId: formData.companyId,
        groupId: formData.groupId || undefined,
        title: formData.title,
        description: formData.description,
        positionType: formData.positionType,
        numberOfInterns: Number(formData.numberOfInterns),
        startDate: formData.startDate,
        endDate: formData.endDate,
        locationType: formData.locationType,
        locationDetails: formData.locationDetails || undefined,
        dutiesRequired: formData.dutiesRequired || undefined,
        otherInfo: formData.otherInfo || undefined,
        status: 'OPEN',
      });

      if (result.errors?.length) {
        throw new Error(result.errors.map((err) => err.message).join(', '));
      }

      setFormData({
        companyId: '',
        groupId: '',
        title: '',
        description: '',
        positionType: 'FULL_TIME',
        numberOfInterns: '1',
        startDate: '',
        endDate: '',
        locationType: 'IN_PERSON',
        locationDetails: '',
        dutiesRequired: '',
        otherInfo: '',
      });

      await loadInternships();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to create internship listing.');
    }
  };

  const handleDeleteInternship = async (id: string) => {
    setErrorMessage(null);
    try {
      const result = await internaroundClient.models.Internship.delete({ id });
      if (result.errors?.length) {
        throw new Error(result.errors.map((err) => err.message).join(', '));
      }
      await loadInternships();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to delete internship.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12 space-y-10">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">Internship listings</p>
          <h1 className="text-3xl font-semibold text-slate-900">Publish and manage internships</h1>
          <p className="text-slate-600 mt-2">
            Add new listings and monitor current openings for your group.
          </p>
        </div>

        {errorMessage && (
          <Card className="p-4 border border-red-200 bg-red-50 text-red-700">{errorMessage}</Card>
        )}

        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Add internship listing</h2>
          <form className="grid gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
            <Input
              placeholder="Company ID"
              value={formData.companyId}
              onChange={(event) => setFormData((prev) => ({ ...prev, companyId: event.target.value }))}
              required
            />
            <Input
              placeholder="Group ID (optional)"
              value={formData.groupId}
              onChange={(event) => setFormData((prev) => ({ ...prev, groupId: event.target.value }))}
            />
            <Input
              placeholder="Internship title"
              value={formData.title}
              onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
              required
            />
            <select
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
              value={formData.positionType}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, positionType: event.target.value as PositionType }))
              }
            >
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
              <option value="PROJECT">Project</option>
              <option value="OTHER">Other</option>
            </select>
            <Input
              type="number"
              placeholder="Number of interns"
              value={formData.numberOfInterns}
              onChange={(event) => setFormData((prev) => ({ ...prev, numberOfInterns: event.target.value }))}
            />
            <select
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
              value={formData.locationType}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, locationType: event.target.value as LocationType }))
              }
            >
              <option value="IN_PERSON">In-person</option>
              <option value="REMOTE">Remote</option>
              <option value="HYBRID">Hybrid</option>
            </select>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(event) => setFormData((prev) => ({ ...prev, startDate: event.target.value }))}
              required
            />
            <Input
              type="date"
              value={formData.endDate}
              onChange={(event) => setFormData((prev) => ({ ...prev, endDate: event.target.value }))}
              required
            />
            <Input
              placeholder="Location details"
              value={formData.locationDetails}
              onChange={(event) => setFormData((prev) => ({ ...prev, locationDetails: event.target.value }))}
            />
            <Textarea
              className="md:col-span-2"
              placeholder="Internship description"
              value={formData.description}
              onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
              required
            />
            <Textarea
              className="md:col-span-2"
              placeholder="Required duties"
              value={formData.dutiesRequired}
              onChange={(event) => setFormData((prev) => ({ ...prev, dutiesRequired: event.target.value }))}
            />
            <Textarea
              className="md:col-span-2"
              placeholder="Other notes"
              value={formData.otherInfo}
              onChange={(event) => setFormData((prev) => ({ ...prev, otherInfo: event.target.value }))}
            />
            <Button type="submit" className="md:col-span-2">Add listing</Button>
          </form>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">Current listings</h2>
          {loading ? (
            <p className="mt-4 text-sm text-slate-500">Loading internships...</p>
          ) : (
            <div className="mt-4 space-y-3">
              {internships.map((item) => (
                <div key={item.id} className="border-b border-slate-100 pb-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600">Company: {item.companyId}</p>
                    <p className="text-sm text-slate-600">Status: {item.status}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/app/internships/view?id=${item.id}`}>View</Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteInternship(item.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
              {!internships.length && <p className="text-sm text-slate-500">No listings yet.</p>}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
