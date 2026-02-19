"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { internaroundClient } from '@/lib/internaroundClient';

type PositionType = 'FULL_TIME' | 'PART_TIME' | 'PROJECT' | 'OTHER';
type LocationType = 'IN_PERSON' | 'REMOTE' | 'HYBRID';

export default function CompanyApplyPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    groupId: '',
    companyName: '',
    website: '',
    industry: '',
    positionType: 'FULL_TIME' as PositionType,
    contactTitle: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    associatedParentName: '',
    associatedStudentName: '',
    jobTitle: '',
    numberOfInterns: '1',
    jobDescription: '',
    startDate: '',
    endDate: '',
    locationType: 'IN_PERSON' as LocationType,
    locationDetails: '',
    dutiesRequired: '',
    otherInfo: '',
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.companyName || !formData.contactName || !formData.contactEmail || !formData.jobTitle) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await internaroundClient.models.CompanyApplication.create(
        {
          groupId: formData.groupId || undefined,
          companyName: formData.companyName,
          website: formData.website || undefined,
          industry: formData.industry || undefined,
          contactTitle: formData.contactTitle || undefined,
          contactName: formData.contactName,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone || undefined,
          associatedParentName: formData.associatedParentName || undefined,
          associatedStudentName: formData.associatedStudentName || undefined,
          positionType: formData.positionType,
          jobTitle: formData.jobTitle,
          jobDescription: formData.jobDescription || 'See notes',
          numberOfInterns: formData.numberOfInterns ? Number(formData.numberOfInterns) : 1,
          startDate: formData.startDate,
          endDate: formData.endDate,
          locationType: formData.locationType,
          locationDetails: formData.locationDetails || undefined,
          dutiesRequired: formData.dutiesRequired || undefined,
          otherInfo: formData.otherInfo || undefined,
          status: 'SUBMITTED',
        },
        { authMode: 'identityPool' }
      );

      if (result.errors?.length) {
        throw new Error(result.errors.map((err) => err.message).join(', '));
      }

      setSuccessMessage('Thank you! Your internship offer has been submitted.');
      setFormData({
        groupId: '',
        companyName: '',
        website: '',
        industry: '',
        positionType: 'FULL_TIME',
        contactTitle: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        associatedParentName: '',
        associatedStudentName: '',
        jobTitle: '',
        numberOfInterns: '1',
        jobDescription: '',
        startDate: '',
        endDate: '',
        locationType: 'IN_PERSON',
        locationDetails: '',
        dutiesRequired: '',
        otherInfo: '',
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
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Company internship offer</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-900">Offer an internship opportunity.</h1>
        <p className="mt-4 text-lg text-slate-600">
          Share internship details so students can apply and rank your opportunity.
        </p>
      </div>

      <form
        className="mt-10 grid gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="text-sm font-medium text-slate-700">Group ID (optional)</label>
          <Input
            placeholder="Enter group ID if applicable"
            value={formData.groupId}
            onChange={(event) => handleChange('groupId', event.target.value)}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Company name</label>
            <Input
              placeholder="Company name"
              value={formData.companyName}
              onChange={(event) => handleChange('companyName', event.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Website</label>
            <Input
              placeholder="https://"
              value={formData.website}
              onChange={(event) => handleChange('website', event.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Industry</label>
            <Input
              placeholder="Industry"
              value={formData.industry}
              onChange={(event) => handleChange('industry', event.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Position type</label>
            <select
              className="mt-1 h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 text-sm"
              value={formData.positionType}
              onChange={(event) => handleChange('positionType', event.target.value as PositionType)}
            >
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
              <option value="PROJECT">Project-based</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm font-medium text-slate-700">Contact title</label>
            <Input
              placeholder="Title"
              value={formData.contactTitle}
              onChange={(event) => handleChange('contactTitle', event.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Contact name</label>
            <Input
              placeholder="Contact name"
              value={formData.contactName}
              onChange={(event) => handleChange('contactName', event.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Contact email</label>
            <Input
              type="email"
              placeholder="email@company.com"
              value={formData.contactEmail}
              onChange={(event) => handleChange('contactEmail', event.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm font-medium text-slate-700">Contact phone</label>
            <Input
              placeholder="(555) 555-5555"
              value={formData.contactPhone}
              onChange={(event) => handleChange('contactPhone', event.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Associated parent</label>
            <Input
              placeholder="Parent name"
              value={formData.associatedParentName}
              onChange={(event) => handleChange('associatedParentName', event.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Associated student</label>
            <Input
              placeholder="Student name"
              value={formData.associatedStudentName}
              onChange={(event) => handleChange('associatedStudentName', event.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Job title</label>
            <Input
              placeholder="Internship title"
              value={formData.jobTitle}
              onChange={(event) => handleChange('jobTitle', event.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Number of interns</label>
            <Input
              type="number"
              placeholder="1"
              value={formData.numberOfInterns}
              onChange={(event) => handleChange('numberOfInterns', event.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Job description</label>
          <Textarea
            placeholder="Describe the internship role."
            value={formData.jobDescription}
            onChange={(event) => handleChange('jobDescription', event.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm font-medium text-slate-700">Start date</label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(event) => handleChange('startDate', event.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">End date</label>
            <Input
              type="date"
              value={formData.endDate}
              onChange={(event) => handleChange('endDate', event.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Location type</label>
            <select
              className="mt-1 h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 text-sm"
              value={formData.locationType}
              onChange={(event) => handleChange('locationType', event.target.value as LocationType)}
            >
              <option value="IN_PERSON">In-person</option>
              <option value="REMOTE">Remote</option>
              <option value="HYBRID">Hybrid</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Job location</label>
          <Input
            placeholder="City, State or Remote"
            value={formData.locationDetails}
            onChange={(event) => handleChange('locationDetails', event.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Required duties or physical requirements</label>
          <Textarea
            placeholder="List any duties the intern must be able to perform."
            value={formData.dutiesRequired}
            onChange={(event) => handleChange('dutiesRequired', event.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Other information</label>
          <Textarea
            placeholder="Additional notes or expectations."
            value={formData.otherInfo}
            onChange={(event) => handleChange('otherInfo', event.target.value)}
          />
        </div>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        {successMessage && <p className="text-sm text-emerald-600">{successMessage}</p>}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-500">We will confirm receipt and next steps by email.</p>
          <button
            className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit internship offer'}
          </button>
        </div>
      </form>
    </div>
  );
}
