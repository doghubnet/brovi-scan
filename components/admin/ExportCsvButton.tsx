"use client";

const rows = [
  { user: "demo@student.com", country: "Italy", program: "Data Science", readiness: "76", risk: "Strong" },
  { user: "applicant@example.com", country: "Canada", program: "MBA", readiness: "58", risk: "Needs Work" },
];

export function ExportCsvButton() {
  function exportCsv() {
    const csv = [Object.keys(rows[0]).join(","), ...rows.map((row) => Object.values(row).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "brovi-scan-user-summary.csv";
    link.click();
    URL.revokeObjectURL(url);
  }
  return <button className="btn-secondary mt-4" type="button" onClick={exportCsv}>Export user summary as CSV</button>;
}
