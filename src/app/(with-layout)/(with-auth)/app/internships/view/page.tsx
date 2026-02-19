'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { internaroundClient } from '@/lib/internaroundClient';

type PositionType = 'FULL_TIME' | 'PART_TIME' | 'PROJECT' | 'OTHER';
type LocationType = 'IN_PERSON' | 'REMOTE' | 'HYBRID';
type InternshipStatus = 'DRAFT' | 'OPEN' | 'FILLED' | 'CLOSED';

export default function InternshipDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';

  const [loading, setLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

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
    status: 'OPEN' as InternshipStatus,
  });

  React.useEffect(() => {
    const loadInternship = async () => {
      if (!id) {
        setLoading(false);
        setErrorMessage('Missing internship id.');
        return;
      }

      setLoading(true);
      setErrorMessage(null);

      try {
        const result = await internaroundClient.models.Internship.get({ id });
        if (result.errors?.length || !result.data) {
          throw new Error(result.errors?.map((err) => err.message).join(', ') || 'Internship not found.');
        }
        const internship = result.data;
        setFormData({
          companyId: internship.companyId,
          groupId: internship.groupId ?? '',
          title: internship.title,
          description: internship.description,
          positionType: internship.positionType,
          numberOfInterns: String(internship.numberOfInterns ?? 1),
          startDate: internship.startDate,
          endDate: internship.endDate,
          locationType: internship.locationType,
          locationDetails: internship.locationDetails ?? '',
          dutiesRequired: internship.dutiesRequired ?? '',
          otherInfo: internship.otherInfo ?? '',
          status: internship.status,
        });
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Unable to load internship.');
      } finally {
        setLoading(false);
      }
    };

    loadInternship();
  }, [id]);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) {
      setErrorMessage('Missing internship id.');
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      const result = await internaroundClient.models.Internship.update({
        id,
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
        status: formData.status,
      });

      if (result.errors?.length) {
        throw new Error(result.errors.map((err) => err.message).join(', '));
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save internship.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-6">
        <div>
          <Button variant="outline" onClick={() => router.back()}>
            Back to internships
          </Button>
        </div>

        <Card className="p-6 space-y-4">
          <h1 className="text-2xl font-semibold text-slate-900">Internship details</h1>
          {loading ? (
            <p className="text-sm text-slate-500">Loading...</p>
          ) : (
            <form className="space-y-4" onSubmit={handleSave}>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Company ID</label>
                <Input
                  placeholder="Company ID"
                  value={formData.companyId}
                  onChange={(event) => setFormData((prev) => ({ ...prev, companyId: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Group ID (optional)</label>
                <Input
                  placeholder="Group ID (optional)"
                  value={formData.groupId}
                  onChange={(event) => setFormData((prev) => ({ ...prev, groupId: event.target.value }))}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Internship title</label>
                <Input
                  placeholder="Internship title"
                  value={formData.title}
                  onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Position type</label>
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
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Number of interns</label>
                <Input
                  type="number"
                  placeholder="Number of interns"
                  value={formData.numberOfInterns}
                  onChange={(event) => setFormData((prev) => ({ ...prev, numberOfInterns: event.target.value }))}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Start date</label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(event) => setFormData((prev) => ({ ...prev, startDate: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">End date</label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(event) => setFormData((prev) => ({ ...prev, endDate: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Location type</label>
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
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Location details</label>
                <Input
                  placeholder="Location details"
                  value={formData.locationDetails}
                  onChange={(event) => setFormData((prev) => ({ ...prev, locationDetails: event.target.value }))}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Status</label>
                <select
                  className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
                  value={formData.status}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, status: event.target.value as InternshipStatus }))
                  }
                >
                  <option value="DRAFT">Draft</option>
                  <option value="OPEN">Open</option>
                  <option value="FILLED">Filled</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Internship description</label>
                <Textarea
                  placeholder="Internship description"
                  value={formData.description}
                  onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Required duties</label>
                <Textarea
                  placeholder="Required duties"
                  value={formData.dutiesRequired}
                  onChange={(event) => setFormData((prev) => ({ ...prev, dutiesRequired: event.target.value }))}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Other info</label>
                <Textarea
                  placeholder="Other info"
                  value={formData.otherInfo}
                  onChange={(event) => setFormData((prev) => ({ ...prev, otherInfo: event.target.value }))}
                />
              </div>

              {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
              <div className="flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save changes'}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
