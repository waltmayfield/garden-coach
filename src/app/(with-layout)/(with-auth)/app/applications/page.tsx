'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { internaroundClient, normalizeList } from '@/lib/internaroundClient';
import Link from 'next/link';

type GroupType = 'OPEN' | 'CLOSED';
type OrganizationType = 'SCHOOL' | 'YPO' | 'CHURCH' | 'SCOUTS' | 'COMMUNITY' | 'OTHER';
type PositionType = 'FULL_TIME' | 'PART_TIME' | 'PROJECT' | 'OTHER';
type LocationType = 'IN_PERSON' | 'REMOTE' | 'HYBRID';
type GroupApplicationItem = {
  id: string;
  groupName: string;
  leaderName: string;
  status?: string | null;
};
type StudentApplicationItem = {
  id: string;
  studentName: string;
  parentName: string;
  status?: string | null;
};
type CompanyApplicationItem = {
  id: string;
  companyName: string;
  jobTitle: string;
  status?: string | null;
};

type InternshipOption = {
  id: string;
  title: string;
  companyId: string;
  groupId?: string | null;
  status?: string | null;
};

export default function ApplicationsPage() {
  const [loading, setLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const [groupApplications, setGroupApplications] = React.useState<GroupApplicationItem[]>([]);
  const [studentApplications, setStudentApplications] = React.useState<StudentApplicationItem[]>([]);
  const [companyApplications, setCompanyApplications] = React.useState<CompanyApplicationItem[]>([]);

  const [internshipError, setInternshipError] = React.useState<string | null>(null);
  const [isLoadingInternships, setIsLoadingInternships] = React.useState(true);
  const [internships, setInternships] = React.useState<InternshipOption[]>([]);
  const [internshipFilter, setInternshipFilter] = React.useState('');
  const [selectedInternshipIds, setSelectedInternshipIds] = React.useState<string[]>([]);

  const [groupForm, setGroupForm] = React.useState({
    groupName: '',
    groupType: 'OPEN' as GroupType,
    organizationType: 'SCHOOL' as OrganizationType,
    organizationName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    leaderOffersInternship: false,
  });

  const [studentForm, setStudentForm] = React.useState({
    groupId: '',
    studentName: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    excludedCompanies: '',
  });

  const [companyForm, setCompanyForm] = React.useState({
    groupId: '',
    companyName: '',
    contactName: '',
    contactEmail: '',
    positionType: 'FULL_TIME' as PositionType,
    jobTitle: '',
    jobDescription: '',
    numberOfInterns: '1',
    startDate: '',
    endDate: '',
    locationType: 'IN_PERSON' as LocationType,
  });

  const loadData = React.useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const [groupsResult, studentsResult, companiesResult] = await Promise.all([
        internaroundClient.models.GroupLeaderApplication.list(),
        internaroundClient.models.StudentApplication.list(),
        internaroundClient.models.CompanyApplication.list(),
      ]);

      if (groupsResult.errors?.length || studentsResult.errors?.length || companiesResult.errors?.length) {
        const errors = [
          ...(groupsResult.errors ?? []),
          ...(studentsResult.errors ?? []),
          ...(companiesResult.errors ?? []),
        ];
        throw new Error(errors.map((err) => err.message).join(', '));
      }

      setGroupApplications(groupsResult.data ?? []);
      setStudentApplications(studentsResult.data ?? []);
      setCompanyApplications(companiesResult.data ?? []);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to load applications.');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

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

  const handleCreateGroupApplication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const result = await internaroundClient.models.GroupLeaderApplication.create({
        groupName: groupForm.groupName,
        groupType: groupForm.groupType,
        organizationType: groupForm.organizationType,
        organizationName: groupForm.organizationName || undefined,
        leaderName: groupForm.leaderName,
        leaderEmail: groupForm.leaderEmail,
        leaderPhone: groupForm.leaderPhone,
        leaderOffersInternship: groupForm.leaderOffersInternship,
        status: 'SUBMITTED',
      });

      if (result.errors?.length) {
        throw new Error(result.errors.map((err) => err.message).join(', '));
      }

      setGroupForm({
        groupName: '',
        groupType: 'OPEN',
        organizationType: 'SCHOOL',
        organizationName: '',
        leaderName: '',
        leaderEmail: '',
        leaderPhone: '',
        leaderOffersInternship: false,
      });

      await loadData();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to add group application.');
    }
  };

  const handleCreateStudentApplication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const excludedList = normalizeList(studentForm.excludedCompanies);
      const rankedList = selectedInternshipIds;

      const result = await internaroundClient.models.StudentApplication.create({
        groupId: studentForm.groupId,
        studentName: studentForm.studentName,
        parentName: studentForm.parentName,
        parentEmail: studentForm.parentEmail || undefined,
        parentPhone: studentForm.parentPhone || undefined,
        rankedInternshipIds: JSON.stringify(rankedList),
        excludedCompanyNames: JSON.stringify(excludedList),
        status: 'SUBMITTED',
      });

      if (result.errors?.length) {
        throw new Error(result.errors.map((err) => err.message).join(', '));
      }

      if (result.data?.id && rankedList.length > 0) {
        await Promise.all(
          rankedList.map((internshipId, index) =>
            internaroundClient.models.StudentInternshipPreference.create({
              studentApplicationId: result.data!.id,
              internshipId,
              rank: index + 1,
            })
          )
        );
      }

      setStudentForm({
        groupId: '',
        studentName: '',
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        excludedCompanies: '',
      });
      setSelectedInternshipIds([]);
      setInternshipFilter('');

      await loadData();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to add student application.');
    }
  };

  const handleCreateCompanyApplication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const result = await internaroundClient.models.CompanyApplication.create({
        groupId: companyForm.groupId || undefined,
        companyName: companyForm.companyName,
        contactName: companyForm.contactName,
        contactEmail: companyForm.contactEmail,
        positionType: companyForm.positionType,
        jobTitle: companyForm.jobTitle,
        jobDescription: companyForm.jobDescription,
        numberOfInterns: Number(companyForm.numberOfInterns),
        startDate: companyForm.startDate,
        endDate: companyForm.endDate,
        locationType: companyForm.locationType,
        status: 'SUBMITTED',
      });

      if (result.errors?.length) {
        throw new Error(result.errors.map((err) => err.message).join(', '));
      }

      setCompanyForm({
        groupId: '',
        companyName: '',
        contactName: '',
        contactEmail: '',
        positionType: 'FULL_TIME',
        jobTitle: '',
        jobDescription: '',
        numberOfInterns: '1',
        startDate: '',
        endDate: '',
        locationType: 'IN_PERSON',
      });

      await loadData();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to add company application.');
    }
  };

  const handleDeleteGroupApplication = async (id: string) => {
    setErrorMessage(null);
    try {
      const result = await internaroundClient.models.GroupLeaderApplication.delete({ id });
      if (result.errors?.length) {
        throw new Error(result.errors.map((err) => err.message).join(', '));
      }
      await loadData();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to delete application.');
    }
  };

  const handleDeleteStudentApplication = async (id: string) => {
    setErrorMessage(null);
    try {
      const result = await internaroundClient.models.StudentApplication.delete({ id });
      if (result.errors?.length) {
        throw new Error(result.errors.map((err) => err.message).join(', '));
      }
      await loadData();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to delete application.');
    }
  };

  const handleDeleteCompanyApplication = async (id: string) => {
    setErrorMessage(null);
    try {
      const result = await internaroundClient.models.CompanyApplication.delete({ id });
      if (result.errors?.length) {
        throw new Error(result.errors.map((err) => err.message).join(', '));
      }
      await loadData();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to delete application.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12 space-y-10">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">Applications</p>
          <h1 className="text-3xl font-semibold text-slate-900">Review and add new applications</h1>
          <p className="text-slate-600 mt-2">
            Create new entries and monitor incoming submissions from groups, students, and companies.
          </p>
        </div>

        {errorMessage && (
          <Card className="p-4 border border-red-200 bg-red-50 text-red-700">{errorMessage}</Card>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Add group leader application</h2>
            <form className="space-y-3" onSubmit={handleCreateGroupApplication}>
              <Input
                placeholder="Group name"
                value={groupForm.groupName}
                onChange={(event) => setGroupForm((prev) => ({ ...prev, groupName: event.target.value }))}
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
                  value={groupForm.groupType}
                  onChange={(event) =>
                    setGroupForm((prev) => ({ ...prev, groupType: event.target.value as GroupType }))
                  }
                >
                  <option value="OPEN">Open</option>
                  <option value="CLOSED">Closed</option>
                </select>
                <select
                  className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
                  value={groupForm.organizationType}
                  onChange={(event) =>
                    setGroupForm((prev) => ({ ...prev, organizationType: event.target.value as OrganizationType }))
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
              <Input
                placeholder="Organization name"
                value={groupForm.organizationName}
                onChange={(event) => setGroupForm((prev) => ({ ...prev, organizationName: event.target.value }))}
              />
              <Input
                placeholder="Leader name"
                value={groupForm.leaderName}
                onChange={(event) => setGroupForm((prev) => ({ ...prev, leaderName: event.target.value }))}
                required
              />
              <Input
                type="email"
                placeholder="Leader email"
                value={groupForm.leaderEmail}
                onChange={(event) => setGroupForm((prev) => ({ ...prev, leaderEmail: event.target.value }))}
                required
              />
              <Input
                placeholder="Leader phone"
                value={groupForm.leaderPhone}
                onChange={(event) => setGroupForm((prev) => ({ ...prev, leaderPhone: event.target.value }))}
                required
              />
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={groupForm.leaderOffersInternship}
                  onChange={(event) => setGroupForm((prev) => ({ ...prev, leaderOffersInternship: event.target.checked }))}
                />
                Leader offers internship
              </label>
              <Button type="submit">Add application</Button>
            </form>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Add student application</h2>
            <form className="space-y-3" onSubmit={handleCreateStudentApplication}>
              <Input
                placeholder="Group ID"
                value={studentForm.groupId}
                onChange={(event) => setStudentForm((prev) => ({ ...prev, groupId: event.target.value }))}
                required
              />
              <Input
                placeholder="Student name"
                value={studentForm.studentName}
                onChange={(event) => setStudentForm((prev) => ({ ...prev, studentName: event.target.value }))}
                required
              />
              <Input
                placeholder="Parent name"
                value={studentForm.parentName}
                onChange={(event) => setStudentForm((prev) => ({ ...prev, parentName: event.target.value }))}
                required
              />
              <Input
                placeholder="Parent email"
                value={studentForm.parentEmail}
                onChange={(event) => setStudentForm((prev) => ({ ...prev, parentEmail: event.target.value }))}
              />
              <Input
                placeholder="Parent phone"
                value={studentForm.parentPhone}
                onChange={(event) => setStudentForm((prev) => ({ ...prev, parentPhone: event.target.value }))}
              />
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
                            {rank && <span className="text-xs font-semibold text-slate-500">Rank {rank}</span>}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
              <Textarea
                placeholder="Excluded companies"
                value={studentForm.excludedCompanies}
                onChange={(event) => setStudentForm((prev) => ({ ...prev, excludedCompanies: event.target.value }))}
              />
              <Button type="submit">Add application</Button>
            </form>
          </Card>
        </div>

        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Add company application</h2>
          <form className="grid gap-3 md:grid-cols-2" onSubmit={handleCreateCompanyApplication}>
            <Input
              placeholder="Group ID (optional)"
              value={companyForm.groupId}
              onChange={(event) => setCompanyForm((prev) => ({ ...prev, groupId: event.target.value }))}
            />
            <Input
              placeholder="Company name"
              value={companyForm.companyName}
              onChange={(event) => setCompanyForm((prev) => ({ ...prev, companyName: event.target.value }))}
              required
            />
            <Input
              placeholder="Contact name"
              value={companyForm.contactName}
              onChange={(event) => setCompanyForm((prev) => ({ ...prev, contactName: event.target.value }))}
              required
            />
            <Input
              placeholder="Contact email"
              value={companyForm.contactEmail}
              onChange={(event) => setCompanyForm((prev) => ({ ...prev, contactEmail: event.target.value }))}
              required
            />
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
            <Input
              placeholder="Job title"
              value={companyForm.jobTitle}
              onChange={(event) => setCompanyForm((prev) => ({ ...prev, jobTitle: event.target.value }))}
              required
            />
            <Input
              placeholder="Job description"
              value={companyForm.jobDescription}
              onChange={(event) => setCompanyForm((prev) => ({ ...prev, jobDescription: event.target.value }))}
              required
            />
            <Input
              type="number"
              placeholder="Number of interns"
              value={companyForm.numberOfInterns}
              onChange={(event) => setCompanyForm((prev) => ({ ...prev, numberOfInterns: event.target.value }))}
            />
            <Input
              type="date"
              value={companyForm.startDate}
              onChange={(event) => setCompanyForm((prev) => ({ ...prev, startDate: event.target.value }))}
              required
            />
            <Input
              type="date"
              value={companyForm.endDate}
              onChange={(event) => setCompanyForm((prev) => ({ ...prev, endDate: event.target.value }))}
              required
            />
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
            <Button type="submit" className="md:col-span-2">Add application</Button>
          </form>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-slate-700">Group leader applications</h3>
            {loading ? (
              <p className="text-sm text-slate-500 mt-3">Loading...</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {groupApplications.map((item) => (
                  <li key={item.id} className="border-b border-slate-100 pb-2">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-medium text-slate-800">{item.groupName}</p>
                        <p>{item.leaderName} · {item.status}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/app/applications/view?type=group-leader&id=${item.id}`}>View</Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteGroupApplication(item.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
                {!groupApplications.length && <li>No applications yet.</li>}
              </ul>
            )}
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-semibold text-slate-700">Student applications</h3>
            {loading ? (
              <p className="text-sm text-slate-500 mt-3">Loading...</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {studentApplications.map((item) => (
                  <li key={item.id} className="border-b border-slate-100 pb-2">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-medium text-slate-800">{item.studentName}</p>
                        <p>{item.parentName} · {item.status}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/app/applications/view?type=student&id=${item.id}`}>View</Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteStudentApplication(item.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
                {!studentApplications.length && <li>No applications yet.</li>}
              </ul>
            )}
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-semibold text-slate-700">Company applications</h3>
            {loading ? (
              <p className="text-sm text-slate-500 mt-3">Loading...</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {companyApplications.map((item) => (
                  <li key={item.id} className="border-b border-slate-100 pb-2">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-medium text-slate-800">{item.companyName}</p>
                        <p>{item.jobTitle} · {item.status}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/app/applications/view?type=company&id=${item.id}`}>View</Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCompanyApplication(item.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
                {!companyApplications.length && <li>No applications yet.</li>}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
