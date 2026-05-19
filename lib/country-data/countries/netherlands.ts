import type { CountryData } from "../types";
import { baseDisclaimer, createOfficialVerificationMessage, interviewGroups, riskFlags, taskTemplates, withBase } from "../shared";

export const netherlandsPack: CountryData = withBase({
  countryCode: "NL",
  countrySlug: "netherlands",
  countryName: "Netherlands",
  status: "active",
  lastReviewed: "2026-05-19",
  officialSourceNotes: ['The educational institution must generally be recognised as sponsor by IND for study residence procedures.', 'Students must have sufficient funds.', 'IND income requirements for study say students must have enough money to live and study for 12 months.', 'The educational institution usually asks for proof of income.'],
  requiredVerificationMessage: createOfficialVerificationMessage("Netherlands"),
  admissionNotes: ["Admission evidence may be required and should match institution records.","Program and intake details should be consistent across all forms."],
  visaRouteNotes: ["Visa route requirements may differ by applicant profile.","Always verify mission-specific document instructions before booking submission."],
  documentGroups: [
    { key:"identity", title:"Identity documents", description:"Identity records used across admission and visa stages.", documents:[
      {key:"passport",label:"Passport",importance:"critical",notes:"Valid passport covering intended timeline.",verificationLevel:"official_source",verifyOfficially:true,mayBeRequired:false},
      {key:"passport_photo",label:"Passport photo",importance:"important",notes:"Photo format may be required by route.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"national_id",label:"National ID",importance:"supporting",notes:"May support identity consistency checks.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"birth_record",label:"Birth record",importance:"case_specific",notes:"May be required for specific profiles.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
    ]},
    { key:"academic", title:"Academic documents", description:"Records proving academic background.", documents:[
      {key:"transcripts",label:"Academic transcripts",importance:"critical",notes:"Official grade records.",verificationLevel:"official_source",verifyOfficially:true,mayBeRequired:false},
      {key:"degree_certificate",label:"Degree/certificate",importance:"important",notes:"Completion evidence when applicable.",verificationLevel:"institution_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"language_proof",label:"Language proof",importance:"important",notes:"English or local language evidence.",verificationLevel:"institution_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"exam_results",label:"Exam results",importance:"case_specific",notes:"Standardized or entrance tests when applicable.",verificationLevel:"institution_specific",verifyOfficially:true,mayBeRequired:true},
    ]},
    { key:"admission", title:"Admission documents", description:"Institution-side acceptance evidence.", documents:[
      {key:"admission_letter",label:"Admission letter",importance:"critical",notes:"Official acceptance or eligibility letter.",verificationLevel:"official_source",verifyOfficially:true,mayBeRequired:false},
      {key:"program_details",label:"Program details",importance:"important",notes:"Program duration, intake, and mode.",verificationLevel:"institution_specific",verifyOfficially:true,mayBeRequired:false},
      {key:"offer_conditions",label:"Offer conditions",importance:"important",notes:"Conditional requirements if any.",verificationLevel:"institution_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"application_portal_proof",label:"Application portal proof",importance:"supporting",notes:"Proof of submitted forms/steps.",verificationLevel:"general_guidance",verifyOfficially:true,mayBeRequired:true},
    ]},
    { key:"financial", title:"Financial and sponsor documents", description:"Proof of funding and source consistency.", documents:[
      {key:"financial_proof",label:"Financial proof",importance:"critical",notes:"Show ability to cover tuition and living costs.",verificationLevel:"official_source",verifyOfficially:true,mayBeRequired:false},
      {key:"bank_statements",label:"Bank statements",importance:"critical",notes:"Recent statement history for funding review.",verificationLevel:"official_source",verifyOfficially:true,mayBeRequired:false},
      {key:"sponsor_letter",label:"Sponsor letter",importance:"important",notes:"Required when funds are sponsored.",verificationLevel:"institution_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"sponsor_relationship",label:"Sponsor relationship proof",importance:"important",notes:"Relationship/legal link to sponsor.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
    ]},
    { key:"visa", title:"Visa or residence preparation", description:"Submission and route preparation files.", documents:[
      {key:"visa_form",label:"Visa/residence form",importance:"critical",notes:"Use the latest official form.",verificationLevel:"official_source",verifyOfficially:true,mayBeRequired:false},
      {key:"appointment_proof",label:"Appointment proof",importance:"supporting",notes:"Booking evidence when appointment is required.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"accommodation_proof",label:"Accommodation proof",importance:"case_specific",notes:"Initial housing may be required.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"insurance",label:"Insurance proof",importance:"case_specific",notes:"Health or travel insurance may be required.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
    ]},
    { key:"writing", title:"Writing and supporting files", description:"Narrative and supporting statements.", documents:[
      {key:"cv",label:"CV",importance:"supporting",notes:"Keep it current and relevant.",verificationLevel:"general_guidance",verifyOfficially:false,mayBeRequired:true},
      {key:"motivation_letter",label:"Motivation letter",importance:"important",notes:"Explain study rationale and fit.",verificationLevel:"institution_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"study_plan",label:"Study plan",importance:"important",notes:"Outline academic path and post-study plan.",verificationLevel:"general_guidance",verifyOfficially:false,mayBeRequired:true},
      {key:"recommendation_letter",label:"Recommendation letter",importance:"supporting",notes:"May strengthen file quality.",verificationLevel:"institution_specific",verifyOfficially:true,mayBeRequired:true},
    ]},
  ],
  interviewQuestionGroups: interviewGroups,
  financialReviewNotes: [
    { key:"funding_coverage", title:"Funding coverage", description:"Check that tuition and living plans are realistic for the full timeline.", severity:"warning" },
    { key:"source_of_funds", title:"Source of funds clarity", description:"Document fund origin and avoid unexplained transfers.", severity:"critical" },
    { key:"sponsor_evidence", title:"Sponsor evidence", description:"Keep sponsor relationship and income evidence consistent.", severity:"warning" },
  ],
  commonRiskFlags: riskFlags.slice(0,7),
  recommendedTasks: taskTemplates,
  disclaimer: baseDisclaimer,
});
