import type { CountryData } from "../types";
import { baseDisclaimer, createOfficialVerificationMessage, interviewGroups, riskFlags, taskTemplates, withBase } from "../shared";

export const polandPack: CountryData = withBase({
  countryCode: "PL",
  countrySlug: "poland",
  countryName: "Poland",
  status: "active",
  lastReviewed: "2026-05-19",
  officialSourceNotes: [
    "Use official immigration and embassy channels for the latest student visa or residence requirements.",
    "University-specific admission and enrollment evidence may be required depending on institution policy.",
    "Financial evidence format may vary by route and applicant profile.",
    "Medical, police, insurance, and translation items may be required based on nationality or case details.",
  ],
  requiredVerificationMessage: createOfficialVerificationMessage("Poland"),
  admissionNotes: ["Admission evidence should match institution records.","Conditional documents may be required depending on program and intake."],
  visaRouteNotes: ["Visa and residence steps vary by case.","Verify mission-specific checklists before booking appointment."],
  documentGroups: [
    { key:"identity", title:"Identity", description:"Identity records used across admission and visa routes.", documents:[
      {key:"passport",label:"Passport",importance:"critical",notes:"Valid passport is required.",verificationLevel:"official_source",verifyOfficially:true,mayBeRequired:false},
      {key:"passport_photo",label:"Passport photo",importance:"important",notes:"Required format may vary.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"visa_form",label:"Visa or residence application form",importance:"important",notes:"Use latest official version.",verificationLevel:"official_source",verifyOfficially:true,mayBeRequired:false},
      {key:"national_id",label:"National ID",importance:"supporting",notes:"May be required for some profiles.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
    ]},
    { key:"academic", title:"Academic", description:"Academic eligibility records.", documents:[
      {key:"transcripts",label:"Transcripts",importance:"critical",notes:"Official transcripts from prior study.",verificationLevel:"official_source",verifyOfficially:true,mayBeRequired:false},
      {key:"certificates",label:"Certificates",importance:"important",notes:"Completion certificates may be required.",verificationLevel:"institution_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"diploma",label:"Diploma",importance:"important",notes:"Diploma or degree evidence, when applicable.",verificationLevel:"institution_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"language_proof",label:"Language proof",importance:"important",notes:"Language evidence may be required.",verificationLevel:"institution_specific",verifyOfficially:true,mayBeRequired:true},
    ]},
    { key:"admission", title:"Admission", description:"University admission documents.", documents:[
      {key:"admission_letter",label:"Admission letter",importance:"critical",notes:"Official admission confirmation.",verificationLevel:"official_source",verifyOfficially:true,mayBeRequired:false},
      {key:"enrollment_certificate",label:"Enrollment certificate",importance:"important",notes:"Enrollment evidence may be required.",verificationLevel:"institution_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"tuition_payment_proof",label:"Tuition payment proof",importance:"case_specific",notes:"May be required by route or institution.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"course_details",label:"Course details or study plan",importance:"important",notes:"Program details may be required.",verificationLevel:"institution_specific",verifyOfficially:true,mayBeRequired:true},
    ]},
    { key:"financial", title:"Financial", description:"Funding and sponsor documentation.", documents:[
      {key:"bank_statement",label:"Bank statement",importance:"critical",notes:"Show funding history for readiness checks.",verificationLevel:"official_source",verifyOfficially:true,mayBeRequired:false},
      {key:"sponsor_letter",label:"Sponsor letter",importance:"important",notes:"Required when sponsored.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"sponsor_relationship",label:"Sponsor relationship proof",importance:"important",notes:"Relationship evidence may be required.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"scholarship_letter",label:"Scholarship letter",importance:"supporting",notes:"May be required if scholarship-backed.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"cost_plan",label:"Tuition and living cost plan",importance:"important",notes:"Provide realistic cost coverage plan.",verificationLevel:"general_guidance",verifyOfficially:true,mayBeRequired:false},
    ]},
    { key:"visa_residence", title:"Visa or residence", description:"Visa/residence route preparation.", documents:[
      {key:"appointment_proof",label:"Visa appointment proof",importance:"case_specific",notes:"May be required.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"residence_form",label:"Residence permit form",importance:"case_specific",notes:"May be required by route.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"accommodation",label:"Accommodation proof",importance:"important",notes:"May be required.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"insurance",label:"Health insurance",importance:"important",notes:"May be required.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"medical_certificate",label:"Medical certificate",importance:"case_specific",notes:"May be required by profile or route.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"police_clearance",label:"Police clearance",importance:"case_specific",notes:"May be required by route.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
    ]},
    { key:"writing", title:"Writing", description:"Supporting narrative documents.", documents:[
      {key:"cv",label:"CV",importance:"supporting",notes:"Current CV recommended.",verificationLevel:"general_guidance",verifyOfficially:true,mayBeRequired:true},
      {key:"motivation_letter",label:"Motivation letter",importance:"important",notes:"Motivation statement may be required.",verificationLevel:"institution_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"study_plan",label:"Study plan",importance:"important",notes:"Study plan may be required.",verificationLevel:"institution_specific",verifyOfficially:true,mayBeRequired:true},
      {key:"refusal_explanation",label:"Previous refusal explanation",importance:"case_specific",notes:"May be required if refusals exist.",verificationLevel:"case_specific",verifyOfficially:true,mayBeRequired:true},
    ]},
  ],
  interviewQuestionGroups: interviewGroups,
  financialReviewNotes: [
    { key:"coverage", title:"Tuition and living coverage", description:"Confirm funding coverage for planned study timeline.", severity:"warning" },
    { key:"source_funds", title:"Source of funds", description:"Document and explain fund origin and sponsor path.", severity:"critical" },
    { key:"statement_pattern", title:"Statement pattern", description:"Unusual movements may need documented explanation.", severity:"warning" },
  ],
  commonRiskFlags: riskFlags.slice(0,8),
  recommendedTasks: taskTemplates,
  disclaimer: baseDisclaimer,
});
