'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { internaroundClient, normalizeList } from '@/lib/internaroundClient';

type GroupType = 'OPEN' | 'CLOSED';
type OrganizationType = 'SCHOOL' | 'YPO' | 'CHURCH' | 'SCOUTS' | 'COMMUNITY' | 'OTHER';
type ApplicationStatus = 'SUBMITTED' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'WAITLISTED';
type PositionType = 'FULL_TIME' | 'PART_TIME' | 'PROJECT' | 'OTHER';
type LocationType = 'IN_PERSON' | 'REMOTE' | 'HYBRID';

type InternshipOption = {
  id: string;
  title: string;
  companyId: string;
  groupId?: string | null;
  status?: string | null;
};

type ApplicationType = 'group-leader' | 'student' | 'company';

export default function ApplicationDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const type = (searchParams.get('type') || '') as ApplicationType;

  const [loading, setLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const [internshipError, setInternshipError] = React.useState<string | null>(null);
  const [isLoadingInternships, setIsLoadingInternships] = React.useState(true);
  const [internships, setInternships] = React.useState<InternshipOption[]>([]);
  const [internshipFilter, setInternshipFilter] = React.useState('');
  const [selectedInternshipIds, setSelectedInternshipIds] = React.useState<string[]>([]);

  const [groupLeaderForm, setGroupLeaderForm] = React.useState({
    groupName: '',
    groupType: 'OPEN' as GroupType,
    organizationType: 'SCHOOL' as OrganizationType,
    organizationName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    leaderChildName: '',
    leaderOffersInternship: false,
    minimumGroupSize: '',
    notes: '',
    status: 'SUBMITTED' as ApplicationStatus,
  });

  const [studentForm, setStudentForm] = React.useState({
    groupId: '',
    studentName: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    excludedCompanies: '',
    status: 'SUBMITTED' as ApplicationStatus,
  });

  const [companyForm, setCompanyForm] = React.useState({
    groupId: '',
    companyName: '',
    website: '',
    industry: '',
    associatedParentName: '',
    associatedStudentName: '',
    contactTitle: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    positionType: 'FULL_TIME' as PositionType,
    jobTitle: '',
    jobDescription: '',
    numberOfInterns: '1',
    startDate: '',
    endDate: '',
    locationType: 'IN_PERSON' as LocationType,
    locationDetails: '',
    dutiesRequired: '',
    otherInfo: '',
    status: 'SUBMITTED' as ApplicationStatus,
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

  React.useEffect(() => {
    const loadApplication = async () => {
      if (!id || !type) {
        setLoading(false);
        setErrorMessage('Missing application id or type.');
        return;
      }

      setLoading(true);
      setErrorMessage(null);

      try {
        if (type === 'group-leader') {
          const result = await internaroundClient.models.GroupLeaderApplication.get({ id });
          if (result.errors?.length || !result.data) {
            throw new Error(result.errors?.map((err) => err.message).join(', ') || 'Application not found.');
          }
          const application = result.data;
          setGroupLeaderForm({
            groupName: application.groupName,
            groupType: application.groupType,
            organizationType: application.organizationType ?? 'SCHOOL',
            organizationName: application.organizationName ?? '',
            leaderName: application.leaderName,
            leaderEmail: application.leaderEmail,
            leaderPhone: application.leaderPhone,
            leaderChildName: application.leaderChildName ?? '',
            leaderOffersInternship: application.leaderOffersInternship ?? false,
            minimumGroupSize: application.minimumGroupSize ? String(application.minimumGroupSize) : '',
            notes: application.notes ?? '',
            status: application.status,
          });
        }

        if (type === 'student') {
          const [result, preferenceResult] = await Promise.all([
            internaroundClient.models.StudentApplication.get({ id }),
            internaroundClient.models.StudentInternshipPreference.list({
              filter: { studentApplicationId: { eq: id } },
            }),
          ]);

          if (result.errors?.length || !result.data) {
            throw new Error(result.errors?.map((err) => err.message).join(', ') || 'Application not found.');
          }
          if (preferenceResult.errors?.length) {
            throw new Error(preferenceResult.errors.map((err) => err.message).join(', '));
          }

          const application = result.data;
          const preferenceIds = (preferenceResult.data ?? [])
            .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
            .map((pref) => pref.internshipId);

          const excludedCompaniesValue = Array.isArray(application.excludedCompanyNames)
            ? application.excludedCompanyNames.join(', ')
            : typeof application.excludedCompanyNames === 'string'
              ? application.excludedCompanyNames
              : '';

          setStudentForm({
            groupId: application.groupId,
            studentName: application.studentName,
            parentName: application.parentName,
            parentEmail: application.parentEmail ?? '',
            parentPhone: application.parentPhone ?? '',
            excludedCompanies: excludedCompaniesValue,
            status: application.status,
          });
          setSelectedInternshipIds(preferenceIds);
        }

        if (type === 'company') {
          const result = await internaroundClient.models.CompanyApplication.get({ id });
          if (result.errors?.length || !result.data) {
            throw new Error(result.errors?.map((err) => err.message).join(', ') || 'Application not found.');
          }
          const application = result.data;
          setCompanyForm({
            groupId: application.groupId ?? '',
            companyName: application.companyName,
            website: application.website ?? '',
            industry: application.industry ?? '',
            associatedParentName: application.associatedParentName ?? '',
            associatedStudentName: application.associatedStudentName ?? '',
            contactTitle: application.contactTitle ?? '',
            contactName: application.contactName,
            contactEmail: application.contactEmail,
            contactPhone: application.contactPhone ?? '',
            positionType: application.positionType,
            jobTitle: application.jobTitle,
            jobDescription: application.jobDescription,
            numberOfInterns: String(application.numberOfInterns ?? 1),
            startDate: application.startDate,
            endDate: application.endDate,
            locationType: application.locationType,
            locationDetails: application.locationDetails ?? '',
            dutiesRequired: application.dutiesRequired ?? '',
            otherInfo: application.otherInfo ?? '',
            status: application.status,
          });
        }
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Unable to load application.');
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [id, type]);

  const filteredInternships = React.useMemo(() => {
    const filter = internshipFilter.trim().toLowerCase();
    return internships.filter((internship) => {
      if (studentForm.groupId && internship.groupId && internship.groupId !== studentForm.groupId) {
        return false;
      }
      if (!filter) return true;
      return (
        internship.title.toLowerCase().includes(filter) ||
        internship.companyId.toLowerCase().includes(filter)
      );
    });
  }, [internships, internshipFilter, studentForm.groupId]);

  const toggleInternship = (internshipId: string) => {
    setSelectedInternshipIds((prev) =>
      prev.includes(internshipId) ? prev.filter((item) => item !== internshipId) : [...prev, internshipId]
    );
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id || !type) {
      setErrorMessage('Missing application id or type.');
      return;
    }
    setIsSaving(true);
    setErrorMessage(null);

    try {
      if (type === 'group-leader') {
        const result = await internaroundClient.models.GroupLeaderApplication.update({
          id,
          groupName: groupLeaderForm.groupName,
          groupType: groupLeaderForm.groupType,
          organizationType: groupLeaderForm.organizationType,
          organizationName: groupLeaderForm.organizationName || undefined,
          leaderName: groupLeaderForm.leaderName,
          leaderEmail: groupLeaderForm.leaderEmail,
          leaderPhone: groupLeaderForm.leaderPhone,
          leaderChildName: groupLeaderForm.leaderChildName || undefined,
          leaderOffersInternship: groupLeaderForm.leaderOffersInternship,
          minimumGroupSize: groupLeaderForm.minimumGroupSize ? Number(groupLeaderForm.minimumGroupSize) : undefined,
          notes: groupLeaderForm.notes || undefined,
          status: groupLeaderForm.status,
        });
        if (result.errors?.length) {
          throw new Error(result.errors.map((err) => err.message).join(', '));
        }
      }

      if (type === 'student') {
        const excludedList = normalizeList(studentForm.excludedCompanies);
        const updateResult = await internaroundClient.models.StudentApplication.update({
          id,
          groupId: studentForm.groupId,
          studentName: studentForm.studentName,
          parentName: studentForm.parentName,
          parentEmail: studentForm.parentEmail || undefined,
          parentPhone: studentForm.parentPhone || undefined,
          excludedCompanyNames: JSON.stringify(excludedList),
          status: studentForm.status,
        });

        if (updateResult.errors?.length) {
          throw new Error(updateResult.errors.map((err) => err.message).join(', '));
        }

        const existingPreferences = await internaroundClient.models.StudentInternshipPreference.list({
          filter: { studentApplicationId: { eq: id } },
        });
        if (existingPreferences.errors?.length) {
          throw new Error(existingPreferences.errors.map((err) => err.message).join(', '));
        }

        await Promise.all(
          (existingPreferences.data ?? []).map((pref) =>
            internaroundClient.models.StudentInternshipPreference.delete({ id: pref.id })
          )
        );

        await Promise.all(
          selectedInternshipIds.map((internshipId, index) =>
            internaroundClient.models.StudentInternshipPreference.create({
              studentApplicationId: id,
              internshipId,
              rank: index + 1,
            })
          )
        );
      }

      if (type === 'company') {
        const result = await internaroundClient.models.CompanyApplication.update({
          id,
          groupId: companyForm.groupId || undefined,
          companyName: companyForm.companyName,
          website: companyForm.website || undefined,
          industry: companyForm.industry || undefined,
          associatedParentName: companyForm.associatedParentName || undefined,
          associatedStudentName: companyForm.associatedStudentName || undefined,
          contactTitle: companyForm.contactTitle || undefined,
          contactName: companyForm.contactName,
          contactEmail: companyForm.contactEmail,
          contactPhone: companyForm.contactPhone || undefined,
          positionType: companyForm.positionType,
          jobTitle: companyForm.jobTitle,
          jobDescription: companyForm.jobDescription,
          numberOfInterns: Number(companyForm.numberOfInterns),
          startDate: companyForm.startDate,
          endDate: companyForm.endDate,
          locationType: companyForm.locationType,
          locationDetails: companyForm.locationDetails || undefined,
          dutiesRequired: companyForm.dutiesRequired || undefined,
          otherInfo: companyForm.otherInfo || undefined,
          status: companyForm.status,
        });

        if (result.errors?.length) {
          throw new Error(result.errors.map((err) => err.message).join(', '));
        }
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save application.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-6">
        <div>
          <Button variant="outline" onClick={() => router.back()}>
            Back to applications
          </Button>
        </div>

        <Card className="p-6 space-y-4">
          <h1 className="text-2xl font-semibold text-slate-900">Application details</h1>
          {loading ? (
            <p className="text-sm text-slate-500">Loading...</p>
          ) : (
            <form className="space-y-4" onSubmit={handleSave}>
              {type === 'group-leader' && (
                <>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Group name</label>
                    <Input
                      placeholder="Group name"
                      value={groupLeaderForm.groupName}
                      onChange={(event) => setGroupLeaderForm((prev) => ({ ...prev, groupName: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Group type</label>
                    <select
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
                      value={groupLeaderForm.groupType}
                      onChange={(event) =>
                        setGroupLeaderForm((prev) => ({ ...prev, groupType: event.target.value as GroupType }))
                      }
                    >
                      <option value="OPEN">Open</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Organization type</label>
                    <select
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
                      value={groupLeaderForm.organizationType}
                      onChange={(event) =>
                        setGroupLeaderForm((prev) => ({ ...prev, organizationType: event.target.value as OrganizationType }))
                      }
                    >
                      <option value="SCHOOL">School</option>
                      <option value="YPO">YPO</option>
                      <option value="CHURCH">Church</option>
                      <option value="SCOUTS">Scouts</option>
                      <option value="COMMUNITY">Community</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Organization name</label>
                    <Input
                      placeholder="Organization name"
                      value={groupLeaderForm.organizationName}
                      onChange={(event) => setGroupLeaderForm((prev) => ({ ...prev, organizationName: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Leader name</label>
                    <Input
                      placeholder="Leader name"
                      value={groupLeaderForm.leaderName}
                      onChange={(event) => setGroupLeaderForm((prev) => ({ ...prev, leaderName: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Leader email</label>
                    <Input
                      placeholder="Leader email"
                      value={groupLeaderForm.leaderEmail}
                      onChange={(event) => setGroupLeaderForm((prev) => ({ ...prev, leaderEmail: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Leader phone</label>
                    <Input
                      placeholder="Leader phone"
                      value={groupLeaderForm.leaderPhone}
                      onChange={(event) => setGroupLeaderForm((prev) => ({ ...prev, leaderPhone: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Leader child name</label>
                    <Input
                      placeholder="Leader child name"
                      value={groupLeaderForm.leaderChildName}
                      onChange={(event) => setGroupLeaderForm((prev) => ({ ...prev, leaderChildName: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Minimum group size</label>
                    <Input
                      type="number"
                      placeholder="Minimum group size"
                      value={groupLeaderForm.minimumGroupSize}
                      onChange={(event) => setGroupLeaderForm((prev) => ({ ...prev, minimumGroupSize: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Status</label>
                    <select
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
                      value={groupLeaderForm.status}
                      onChange={(event) =>
                        setGroupLeaderForm((prev) => ({ ...prev, status: event.target.value as ApplicationStatus }))
                      }
                    >
                      <option value="SUBMITTED">Submitted</option>
                      <option value="IN_REVIEW">In review</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="WAITLISTED">Waitlisted</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={groupLeaderForm.leaderOffersInternship}
                      onChange={(event) => setGroupLeaderForm((prev) => ({ ...prev, leaderOffersInternship: event.target.checked }))}
                    />
                    Leader offers internship
                  </label>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Notes</label>
                    <Textarea
                      placeholder="Notes"
                      value={groupLeaderForm.notes}
                      onChange={(event) => setGroupLeaderForm((prev) => ({ ...prev, notes: event.target.value }))}
                    />
                  </div>
                </>
              )}

              {type === 'student' && (
                <>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Group ID</label>
                    <Input
                      placeholder="Group ID"
                      value={studentForm.groupId}
                      onChange={(event) => setStudentForm((prev) => ({ ...prev, groupId: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Student name</label>
                    <Input
                      placeholder="Student name"
                      value={studentForm.studentName}
                      onChange={(event) => setStudentForm((prev) => ({ ...prev, studentName: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Parent name</label>
                    <Input
                      placeholder="Parent name"
                      value={studentForm.parentName}
                      onChange={(event) => setStudentForm((prev) => ({ ...prev, parentName: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Parent email</label>
                    <Input
                      placeholder="Parent email"
                      value={studentForm.parentEmail}
                      onChange={(event) => setStudentForm((prev) => ({ ...prev, parentEmail: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Parent phone</label>
                    <Input
                      placeholder="Parent phone"
                      value={studentForm.parentPhone}
                      onChange={(event) => setStudentForm((prev) => ({ ...prev, parentPhone: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Select internship preferences</label>
                    <Input
                      placeholder="Filter internships by title or company ID"
                      value={internshipFilter}
                      onChange={(event) => setInternshipFilter(event.target.value)}
                    />
                    {internshipError && <p className="text-sm text-red-600">{internshipError}</p>}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
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
                                    {internship.title}{' '}
                                    <span className="text-xs text-slate-500">({internship.companyId})</span>
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
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Excluded companies</label>
                    <Textarea
                      placeholder="Excluded companies"
                      value={studentForm.excludedCompanies}
                      onChange={(event) => setStudentForm((prev) => ({ ...prev, excludedCompanies: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Status</label>
                    <select
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
                      value={studentForm.status}
                      onChange={(event) =>
                        setStudentForm((prev) => ({ ...prev, status: event.target.value as ApplicationStatus }))
                      }
                    >
                      <option value="SUBMITTED">Submitted</option>
                      <option value="IN_REVIEW">In review</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="WAITLISTED">Waitlisted</option>
                    </select>
                  </div>
                </>
              )}

              {type === 'company' && (
                <>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Group ID (optional)</label>
                    <Input
                      placeholder="Group ID (optional)"
                      value={companyForm.groupId}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, groupId: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Company name</label>
                    <Input
                      placeholder="Company name"
                      value={companyForm.companyName}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, companyName: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Website</label>
                    <Input
                      placeholder="Website"
                      value={companyForm.website}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, website: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Industry</label>
                    <Input
                      placeholder="Industry"
                      value={companyForm.industry}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, industry: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Associated parent</label>
                    <Input
                      placeholder="Associated parent"
                      value={companyForm.associatedParentName}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, associatedParentName: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Associated student</label>
                    <Input
                      placeholder="Associated student"
                      value={companyForm.associatedStudentName}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, associatedStudentName: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Contact title</label>
                    <Input
                      placeholder="Contact title"
                      value={companyForm.contactTitle}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, contactTitle: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Contact name</label>
                    <Input
                      placeholder="Contact name"
                      value={companyForm.contactName}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, contactName: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Contact email</label>
                    <Input
                      placeholder="Contact email"
                      value={companyForm.contactEmail}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, contactEmail: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Contact phone</label>
                    <Input
                      placeholder="Contact phone"
                      value={companyForm.contactPhone}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, contactPhone: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Position type</label>
                    <select
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
                      value={companyForm.positionType}
                      onChange={(event) =>
                        setCompanyForm((prev) => ({ ...prev, positionType: event.target.value as PositionType }))
                      }
                    >
                      <option value="FULL_TIME">Full-time</option>
                      <option value="PART_TIME">Part-time</option>
                      <option value="PROJECT">Project</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Job title</label>
                    <Input
                      placeholder="Job title"
                      value={companyForm.jobTitle}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, jobTitle: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Number of interns</label>
                    <Input
                      type="number"
                      placeholder="Number of interns"
                      value={companyForm.numberOfInterns}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, numberOfInterns: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Start date</label>
                    <Input
                      type="date"
                      value={companyForm.startDate}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, startDate: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">End date</label>
                    <Input
                      type="date"
                      value={companyForm.endDate}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, endDate: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Location type</label>
                    <select
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
                      value={companyForm.locationType}
                      onChange={(event) =>
                        setCompanyForm((prev) => ({ ...prev, locationType: event.target.value as LocationType }))
                      }
                    >
                      <option value="IN_PERSON">In-person</option>
                      <option value="REMOTE">Remote</option>
                      <option value="HYBRID">Hybrid</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Status</label>
                    <select
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
                      value={companyForm.status}
                      onChange={(event) =>
                        setCompanyForm((prev) => ({ ...prev, status: event.target.value as ApplicationStatus }))
                      }
                    >
                      <option value="SUBMITTED">Submitted</option>
                      <option value="IN_REVIEW">In review</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="WAITLISTED">Waitlisted</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Job description</label>
                    <Textarea
                      placeholder="Job description"
                      value={companyForm.jobDescription}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, jobDescription: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Required duties</label>
                    <Textarea
                      placeholder="Required duties"
                      value={companyForm.dutiesRequired}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, dutiesRequired: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Other info</label>
                    <Textarea
                      placeholder="Other info"
                      value={companyForm.otherInfo}
                      onChange={(event) => setCompanyForm((prev) => ({ ...prev, otherInfo: event.target.value }))}
                    />
                  </div>
                </>
              )}

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
