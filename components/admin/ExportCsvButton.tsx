"use client";

export function ExportCsvButton() {
  function exportCsv() {
    const csv = "metric,value\nExport generated,Use BROVI admin reporting queries for operational exports\n";
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "brovi-scan-admin-summary.csv";
    link.click();
    URL.revokeObjectURL(url);
  }
  return <button className="btn-secondary mt-4" type="button" onClick={exportCsv}>Export CSV</button>;
}
