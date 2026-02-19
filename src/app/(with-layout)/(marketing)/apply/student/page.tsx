"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { internaroundClient, normalizeList } from '@/lib/internaroundClient';

type InternshipOption = {
  id: string;
  title: string;
  companyId: string;
  groupId?: string | null;
  status?: string | null;
};

export default function StudentApplyPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLoadingInternships, setIsLoadingInternships] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [internshipError, setInternshipError] = React.useState<string | null>(null);
  const [internshipFilter, setInternshipFilter] = React.useState('');
  const [internships, setInternships] = React.useState<InternshipOption[]>([]);
  const [selectedInternshipIds, setSelectedInternshipIds] = React.useState<string[]>([]);
  const [formData, setFormData] = React.useState({
    groupId: '',
    studentName: '',
    age: '',
    gender: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    schoolYearEnd: '',
    schoolYearStart: '',
    availabilityStart: '',
    availabilityEnd: '',
    resumeUrl: '',
    coverLetter: '',
    excludedCompanies: '',
    accommodationsNeeded: '',
    appliedOutsideGroup: false,
  });

  React.useEffect(() => {
    const loadInternships = async () => {
      setIsLoadingInternships(true);
      setInternshipError(null);
      try {
        const result = await internaroundClient.models.Internship.list({
          filter: { status: { eq: 'OPEN' } },
        });
        if (result.errors?.length) {
          throw new Error(result.errors.map((err) => err.message).join(', '));
        }
        setInternships(result.data ?? []);
      } catch (error) {
        setInternshipError(error instanceof Error ? error.message : 'Unable to load internships.');
      } finally {
        setIsLoadingInternships(false);
      }
    };

    loadInternships();
  }, []);

  const filteredInternships = React.useMemo(() => {
    const filter = internshipFilter.trim().toLowerCase();
    return internships.filter((internship) => {
      if (formData.groupId && internship.groupId && internship.groupId !== formData.groupId) {
        return false;
      }
      if (!filter) return true;
      return (
        internship.title.toLowerCase().includes(filter) ||
        internship.companyId.toLowerCase().includes(filter)
      );
    });
  }, [internships, internshipFilter, formData.groupId]);

  const toggleInternship = (id: string) => {
    setSelectedInternshipIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.groupId || !formData.studentName || !formData.parentName) {
      setErrorMessage('Group ID, student name, and parent name are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const rankedList = selectedInternshipIds;
      const excludedList = normalizeList(formData.excludedCompanies);

      const result = await internaroundClient.models.StudentApplication.create(
        {
          groupId: formData.groupId,
          studentName: formData.studentName,
          age: formData.age ? Number(formData.age) : undefined,
          gender: formData.gender || undefined,
          parentName: formData.parentName,
          parentEmail: formData.parentEmail || undefined,
          parentPhone: formData.parentPhone || undefined,
          schoolYearEnd: formData.schoolYearEnd || undefined,
          schoolYearStart: formData.schoolYearStart || undefined,
          availabilityStart: formData.availabilityStart || undefined,
          availabilityEnd: formData.availabilityEnd || undefined,
          resumeUrl: formData.resumeUrl || undefined,
          coverLetter: formData.coverLetter || undefined,
          rankedInternshipIds: JSON.stringify(rankedList),
          excludedCompanyNames: JSON.stringify(excludedList),
          appliedOutsideGroup: formData.appliedOutsideGroup,
          accommodationsNeeded: formData.accommodationsNeeded || undefined,
          status: 'SUBMITTED',
        },
        { authMode: 'identityPool' }
      );

      if (result.errors?.length) {
        throw new Error(result.errors.map((err) => err.message).join(', '));
      }

      if (result.data?.id && rankedList.length > 0) {
        await Promise.all(
          rankedList.map((internshipId, index) =>
            internaroundClient.models.StudentInternshipPreference.create(
              {
                studentApplicationId: result.data!.id,
                internshipId,
                rank: index + 1,
              },
              { authMode: 'identityPool' }
            )
          )
        );
      }

      setSuccessMessage('Application submitted successfully.');
      setFormData({
        groupId: '',
        studentName: '',
        age: '',
        gender: '',
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        schoolYearEnd: '',
        schoolYearStart: '',
        availabilityStart: '',
        availabilityEnd: '',
        resumeUrl: '',
        coverLetter: '',
        excludedCompanies: '',
        accommodationsNeeded: '',
        appliedOutsideGroup: false,
      });
      setSelectedInternshipIds([]);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Student application</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-900">Apply for group internships.</h1>
        <p className="mt-4 text-lg text-slate-600">
          Students submit their information, availability, and internship preferences. Rankings remain confidential.
        </p>
      </div>

      <form
        className="mt-10 grid gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="text-sm font-medium text-slate-700">Group ID</label>
          <Input
            placeholder="Enter your group ID"
            value={formData.groupId}
            onChange={(event) => handleChange('groupId', event.target.value)}
            required
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm font-medium text-slate-700">Student name</label>
            <Input
              placeholder="Student name"
              value={formData.studentName}
              onChange={(event) => handleChange('studentName', event.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Age</label>
            <Input
              type="number"
              placeholder="16"
              value={formData.age}
              onChange={(event) => handleChange('age', event.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Gender</label>
            <Input
              placeholder="Optional"
              value={formData.gender}
              onChange={(event) => handleChange('gender', event.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm font-medium text-slate-700">Parent/guardian name</label>
            <Input
              placeholder="Parent name"
              value={formData.parentName}
              onChange={(event) => handleChange('parentName', event.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Parent email</label>
            <Input
              type="email"
              placeholder="parent@email.com"
              value={formData.parentEmail}
              onChange={(event) => handleChange('parentEmail', event.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Parent phone</label>
            <Input
              placeholder="(555) 555-5555"
              value={formData.parentPhone}
              onChange={(event) => handleChange('parentPhone', event.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">School year end date</label>
            <Input
              type="date"
              value={formData.schoolYearEnd}
              onChange={(event) => handleChange('schoolYearEnd', event.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Next school year start date</label>
            <Input
              type="date"
              value={formData.schoolYearStart}
              onChange={(event) => handleChange('schoolYearStart', event.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Availability start date</label>
            <Input
              type="date"
              value={formData.availabilityStart}
              onChange={(event) => handleChange('availabilityStart', event.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Availability end date</label>
            <Input
              type="date"
              value={formData.availabilityEnd}
              onChange={(event) => handleChange('availabilityEnd', event.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Resume link</label>
            <Input
              placeholder="https://"
              value={formData.resumeUrl}
              onChange={(event) => handleChange('resumeUrl', event.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Cover letter</label>
            <Textarea
              placeholder="Short cover letter"
              value={formData.coverLetter}
              onChange={(event) => handleChange('coverLetter', event.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <label className="text-sm font-medium text-slate-700">Select internship preferences</label>
            <span className="text-xs text-slate-500">Selected order becomes your ranking.</span>
          </div>
          <Input
            placeholder="Filter internships by title or company ID"
            value={internshipFilter}
            onChange={(event) => setInternshipFilter(event.target.value)}
          />
          {internshipError && <p className="text-sm text-red-600">{internshipError}</p>}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            {isLoadingInternships ? (
              <p className="text-sm text-slate-500">Loading internships...</p>
            ) : filteredInternships.length === 0 ? (
              <p className="text-sm text-slate-500">No internships match this filter.</p>
            ) : (
              <ul className="space-y-2 text-sm text-slate-700">
                {filteredInternships.map((internship) => {
                  const isSelected = selectedInternshipIds.includes(internship.id);
                  const rank = isSelected ? selectedInternshipIds.indexOf(internship.id) + 1 : null;
                  return (
                    <li key={internship.id} className="flex items-center justify-between gap-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300"
                          checked={isSelected}
                          onChange={() => toggleInternship(internship.id)}
                        />
                        <span>
                          {internship.title} <span className="text-xs text-slate-500">({internship.companyId})</span>
                        </span>
                      </label>
                      {rank && (
                        <span className="text-xs font-semibold text-slate-500">Rank {rank}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Companies you cannot work for</label>
          <Textarea
            placeholder="List any exclusions."
            value={formData.excludedCompanies}
            onChange={(event) => handleChange('excludedCompanies', event.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Accommodations needed</label>
          <Textarea
            placeholder="Share any accessibility or accommodation needs."
            value={formData.accommodationsNeeded}
            onChange={(event) => handleChange('accommodationsNeeded', event.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300"
            checked={formData.appliedOutsideGroup}
            onChange={(event) => handleChange('appliedOutsideGroup', event.target.checked)}
          />
          <span className="text-sm text-slate-600">
            I have applied for at least one internship outside this group.
          </span>
        </div>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        {successMessage && <p className="text-sm text-emerald-600">{successMessage}</p>}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-500">We will confirm your submission by email.</p>
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
