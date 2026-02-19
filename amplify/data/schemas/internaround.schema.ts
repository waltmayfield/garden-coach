import { a } from '@aws-amplify/backend';

/**
 * InternAround Schema
 * Models for group-based student internship matching
 */
export const internaroundSchema = a.schema({
  GroupType: a.enum(["OPEN", "CLOSED"]),
  OrganizationType: a.enum(["SCHOOL", "YPO", "CHURCH", "SCOUTS", "COMMUNITY", "OTHER"]),
  InternshipLocationType: a.enum(["IN_PERSON", "REMOTE", "HYBRID"]),
  PositionType: a.enum(["FULL_TIME", "PART_TIME", "PROJECT", "OTHER"]),
  ApplicationStatus: a.enum(["SUBMITTED", "IN_REVIEW", "APPROVED", "REJECTED", "WAITLISTED"]),
  InternshipStatus: a.enum(["DRAFT", "OPEN", "FILLED", "CLOSED"]),

  Group: a.model({
    name: a.string().required(),
    description: a.string(),
    type: a.ref("GroupType").required(),
    organizationType: a.ref("OrganizationType"),
    organizationName: a.string(),
    location: a.string(),
    minimumGroupSize: a.integer(),

    leaderName: a.string().required(),
    leaderEmail: a.string().required(),
    leaderPhone: a.string().required(),
    leaderChildName: a.string(),
    leaderOffersInternship: a.boolean().default(false),

    isActive: a.boolean().default(false),

    internships: a.hasMany("Internship", "groupId"),
    studentApplications: a.hasMany("StudentApplication", "groupId"),
  })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read", "create", "update", "delete"]),
      allow.guest().to(["read"]),
    ]),

  GroupLeaderApplication: a.model({
    groupName: a.string().required(),
    groupType: a.ref("GroupType").required(),
    organizationType: a.ref("OrganizationType"),
    organizationName: a.string(),
    leaderName: a.string().required(),
    leaderEmail: a.string().required(),
    leaderPhone: a.string().required(),
    leaderChildName: a.string(),
    leaderOffersInternship: a.boolean().default(false),
    minimumGroupSize: a.integer(),
    notes: a.string(),
    status: a.ref("ApplicationStatus").required(),
  })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read", "create", "update", "delete"]),
      allow.guest().to(["create"]),
    ]),

  Company: a.model({
    name: a.string().required(),
    website: a.string(),
    industry: a.string(),
    contactName: a.string().required(),
    contactTitle: a.string(),
    contactEmail: a.string().required(),
    contactPhone: a.string(),
    associatedParentName: a.string(),
    associatedStudentName: a.string(),

    isActive: a.boolean().default(false),

    internships: a.hasMany("Internship", "companyId"),
  })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read", "create", "update", "delete"]),
      allow.guest().to(["read"]),
    ]),

  Internship: a.model({
    companyId: a.id().required(),
    company: a.belongsTo("Company", "companyId"),

    groupId: a.id(),
    group: a.belongsTo("Group", "groupId"),

    title: a.string().required(),
    description: a.string().required(),
    positionType: a.ref("PositionType").required(),
    numberOfInterns: a.integer().required(),
    startDate: a.date().required(),
    endDate: a.date().required(),
    locationType: a.ref("InternshipLocationType").required(),
    locationDetails: a.string(),
    dutiesRequired: a.string(),
    otherInfo: a.string(),

    status: a.ref("InternshipStatus").required(),

    preferences: a.hasMany("StudentInternshipPreference", "internshipId"),
  })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read", "create", "update", "delete"]),
      allow.guest().to(["read"]),
    ]),

  StudentApplication: a.model({
    groupId: a.id().required(),
    group: a.belongsTo("Group", "groupId"),

    studentName: a.string().required(),
    age: a.integer(),
    gender: a.string(),
    parentName: a.string().required(),
    parentEmail: a.string(),
    parentPhone: a.string(),

    schoolYearEnd: a.date(),
    schoolYearStart: a.date(),
    availabilityStart: a.date(),
    availabilityEnd: a.date(),

    resumeUrl: a.string(),
    coverLetter: a.string(),

    rankedInternshipIds: a.json(),
    excludedCompanyNames: a.json(),

    appliedOutsideGroup: a.boolean().default(false),
    accommodationsNeeded: a.string(),

    status: a.ref("ApplicationStatus").required(),

    preferences: a.hasMany("StudentInternshipPreference", "studentApplicationId"),
  })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read", "create", "update", "delete"]),
      allow.guest().to(["create"]),
    ]),

  StudentInternshipPreference: a.model({
    studentApplicationId: a.id().required(),
    studentApplication: a.belongsTo("StudentApplication", "studentApplicationId"),

    internshipId: a.id().required(),
    internship: a.belongsTo("Internship", "internshipId"),

    rank: a.integer(),
  })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read", "create", "update", "delete"]),
      allow.guest().to(["create"]),
    ]),

  CompanyApplication: a.model({
    groupId: a.id(),

    companyName: a.string().required(),
    associatedParentName: a.string(),
    associatedStudentName: a.string(),
    website: a.string(),
    industry: a.string(),

    contactTitle: a.string(),
    contactName: a.string().required(),
    contactEmail: a.string().required(),
    contactPhone: a.string(),

    positionType: a.ref("PositionType").required(),
    jobTitle: a.string().required(),
    jobDescription: a.string().required(),
    numberOfInterns: a.integer().required(),
    startDate: a.date().required(),
    endDate: a.date().required(),
    locationType: a.ref("InternshipLocationType").required(),
    locationDetails: a.string(),
    dutiesRequired: a.string(),
    otherInfo: a.string(),

    status: a.ref("ApplicationStatus").required(),
  })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(["read", "create", "update", "delete"]),
      allow.guest().to(["create"]),
    ]),
});
