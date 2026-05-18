import { DashboardShell } from "@/components/layout/DashboardShell";
import { ScanForm } from "@/components/forms/ScanForm";
import { UploadBox } from "@/components/forms/UploadBox";
import { currencies } from "@/lib/constants/copy";

const fields = [
  { label: "Sponsor name", name: "sponsorName" },
  { label: "Sponsor relation", name: "sponsorRelation", helper: "Example: father, mother, uncle, employer, self." },
  { label: "Bank name", name: "bankName" },
  { label: "Statement period", name: "statementPeriod", helper: "Example: 6 months, Jan–Jun 2026." },
  { label: "Currency", name: "currency", options: currencies },
  { label: "Opening balance", name: "openingBalance", numeric: true },
  { label: "Closing balance", name: "closingBalance", numeric: true },
  { label: "Average balance", name: "averageBalance", numeric: true },
  { label: "Large deposits", name: "largeDeposits", textarea: true, helper: "Explain large deposits. Do not include passwords or account access." },
  { label: "Monthly income estimate", name: "monthlyIncome", numeric: true },
  { label: "Monthly expenses estimate", name: "monthlyExpenses", numeric: true },
  { label: "Source of funds explanation", name: "sourceOfFunds", textarea: true },
  { label: "Tuition fee amount", name: "tuitionFeeAmount", numeric: true },
  { label: "Living cost amount", name: "livingCostAmount", numeric: true },
  { label: "Accommodation proof", name: "accommodationProof", options: ["Available", "Missing", "In progress", "Not required yet"] },
  { label: "Sponsor business or job proof", name: "sponsorJobProof", options: ["Available", "Missing", "In progress"] },
];

export default function Page() {
  return <DashboardShell><h1 className="section-title">Bank Statement Scan</h1><div className="card"><p className="font-semibold">Safe information only: account holder name, bank name, statement period, balances, inflows/outflows, sponsor relation, and source-of-funds explanation. Do not enter card numbers, bank login details, passwords, or private account access.</p></div><UploadBox label="Optional private bank statement support file" /><ScanForm fields={fields} endpoint="/api/analyze-finance" submitLabel="Review financial readiness" tableName="financial_reviews" /></DashboardShell>;
}
