export type StudentPreference = {
  id: string;
  studentName: string;
  rankedInternshipIds: string[];
};

export type InternshipSlot = {
  id: string;
  title: string;
  numberOfInterns: number;
};

export type MatchResult = {
  studentId: string;
  studentName: string;
  internshipId: string | null;
  internshipTitle: string | null;
  reason: string;
};

export function parseJsonList(value?: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item)).filter(Boolean);
    }
    return [];
  } catch {
    return [];
  }
}

export function runMatching(
  students: StudentPreference[],
  internships: InternshipSlot[]
): MatchResult[] {
  const capacity = new Map<string, number>();
  const titleById = new Map<string, string>();

  internships.forEach((internship) => {
    capacity.set(internship.id, Math.max(0, internship.numberOfInterns || 0));
    titleById.set(internship.id, internship.title);
  });

  return students.map((student) => {
    for (const preferredId of student.rankedInternshipIds) {
      const remaining = capacity.get(preferredId);
      if (remaining && remaining > 0) {
        capacity.set(preferredId, remaining - 1);
        return {
          studentId: student.id,
          studentName: student.studentName,
          internshipId: preferredId,
          internshipTitle: titleById.get(preferredId) ?? null,
          reason: 'Matched to ranked preference',
        };
      }
    }

    return {
      studentId: student.id,
      studentName: student.studentName,
      internshipId: null,
      internshipTitle: null,
      reason: 'No available ranked internships',
    };
  });
}
