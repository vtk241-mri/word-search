import readme from "../../README.md?raw";
import license from "../../LICENSE?raw";
import privacyPolicy from "../../PRIVACY_POLICY.md?raw";
import userGuide from "../../USER_GUIDE.md?raw";
import licenseReport from "../../THIRD_PARTY_LICENSES.md?raw";
import generatedDocs from "../../docs/PROJECT_DOCUMENTATION.generated.md?raw";

export const PROJECT_DOCUMENTS = [
  {
    id: "readme",
    label: "README",
    title: "README.md",
    content: readme,
  },
  {
    id: "license",
    label: "License",
    title: "LICENSE",
    content: license,
  },
  {
    id: "privacy-policy",
    label: "Privacy Policy",
    title: "PRIVACY_POLICY.md",
    content: privacyPolicy,
  },
  {
    id: "user-guide",
    label: "User Guide",
    title: "USER_GUIDE.md",
    content: userGuide,
  },
  {
    id: "license-report",
    label: "License Report",
    title: "THIRD_PARTY_LICENSES.md",
    content: licenseReport,
  },
  {
    id: "generated-docs",
    label: "Generated Docs",
    title: "PROJECT_DOCUMENTATION.generated.md",
    content: generatedDocs,
  },
];

export function getProjectDocument(documentId) {
  return (
    PROJECT_DOCUMENTS.find((document) => document.id === documentId) || null
  );
}
