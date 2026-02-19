"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { internaroundClient } from '@/lib/internaroundClient';

type GroupType = 'OPEN' | 'CLOSED';
type OrganizationType = 'SCHOOL' | 'YPO' | 'CHURCH' | 'SCOUTS' | 'COMMUNITY' | 'OTHER';

export default function GroupLeaderApplyPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    groupName: '',
    groupType: 'OPEN' as GroupType,
    organizationType: 'SCHOOL' as OrganizationType,
    organizationName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    leaderChildName: '',
    minimumGroupSize: '5',
    leaderOffersInternship: false,
    notes: '',
  });

  const handleChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.groupName || !formData.leaderName || !formData.leaderEmail || !formData.leaderPhone) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await internaroundClient.models.GroupLeaderApplication.create(
        {
          groupName: formData.groupName,
          groupType: formData.groupType,
          organizationType: formData.organizationType,
          organizationName: formData.organizationName || undefined,
          leaderName: formData.leaderName,
          leaderEmail: formData.leaderEmail,
          leaderPhone: formData.leaderPhone,
          leaderChildName: formData.leaderChildName || undefined,
          leaderOffersInternship: formData.leaderOffersInternship,
          minimumGroupSize: formData.minimumGroupSize ? Number(formData.minimumGroupSize) : undefined,
          notes: formData.notes || undefined,
          status: 'SUBMITTED',
        },
        { authMode: 'identityPool' }
      );

      if (result.errors?.length) {
        throw new Error(result.errors.map((err) => err.message).join(', '));
      }

      setSuccessMessage('Application submitted! We will follow up soon.');
      setFormData({
        groupName: '',
        groupType: 'OPEN',
        organizationType: 'SCHOOL',
        organizationName: '',
        leaderName: '',
        leaderEmail: '',
        leaderPhone: '',
        leaderChildName: '',
        minimumGroupSize: '5',
        leaderOffersInternship: false,
        notes: '',
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Group leader application</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-900">Start an InternAround group.</h1>
        <p className="mt-4 text-lg text-slate-600">
          Share your organization details so we can help you launch a fair internship program.
        </p>
      </div>

      <form
        className="mt-10 grid gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Group name</label>
            <Input
              placeholder="Lakeview High Class of 2027"
              value={formData.groupName}
              onChange={(event) => handleChange('groupName', event.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Group type</label>
            <select
              className="mt-1 h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 text-sm"
              value={formData.groupType}
              onChange={(event) => handleChange('groupType', event.target.value as GroupType)}
            >
              <option value="OPEN">Open</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Organization type</label>
            <select
              className="mt-1 h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 text-sm"
              value={formData.organizationType}
              onChange={(event) => handleChange('organizationType', event.target.value as OrganizationType)}
            >
              <option value="SCHOOL">School</option>
              <option value="YPO">YPO</option>
              <option value="CHURCH">Church</option>
              <option value="SCOUTS">Scouts</option>
              <option value="COMMUNITY">Community</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Organization name</label>
            <Input
              placeholder="Lakeview High School"
              value={formData.organizationName}
              onChange={(event) => handleChange('organizationName', event.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm font-medium text-slate-700">Leader name</label>
            <Input
              placeholder="Jordan Matthews"
              value={formData.leaderName}
              onChange={(event) => handleChange('leaderName', event.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <Input
              type="email"
              placeholder="name@email.com"
              value={formData.leaderEmail}
              onChange={(event) => handleChange('leaderEmail', event.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Phone</label>
            <Input
              placeholder="(555) 555-5555"
              value={formData.leaderPhone}
              onChange={(event) => handleChange('leaderPhone', event.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Leader&apos;s child name</label>
            <Input
              placeholder="Student name"
              value={formData.leaderChildName}
              onChange={(event) => handleChange('leaderChildName', event.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Minimum group size</label>
            <Input
              type="number"
              placeholder="5"
              value={formData.minimumGroupSize}
              onChange={(event) => handleChange('minimumGroupSize', event.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300"
            checked={formData.leaderOffersInternship}
            onChange={(event) => handleChange('leaderOffersInternship', event.target.checked)}
          />
          <span className="text-sm text-slate-600">I can offer an internship through my employer or network.</span>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Notes or questions</label>
          <Textarea
            placeholder="Share anything else we should know."
            value={formData.notes}
            onChange={(event) => handleChange('notes', event.target.value)}
          />
        </div>

        {errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-sm text-emerald-600">{successMessage}</p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-500">We will review your application within 3-5 business days.</p>
          <button
            className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit application'}
          </button>
        </div>
      </form>
    </div>
  );
}
