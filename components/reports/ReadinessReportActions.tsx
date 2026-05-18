"use client";

import { Download, Printer, Share2, UserCheck } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";

export function ReadinessReportActions() {
  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Report link copied.");
    } catch {
      alert("Unable to copy link.");
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
      <Button type="button" onClick={handlePrint}>
        <Printer className="mr-2 h-4 w-4" />
        Print Report
      </Button>
      <Button type="button" variant="outline" onClick={handleCopyLink}>
        <Share2 className="mr-2 h-4 w-4" />
        Copy Link
      </Button>
      <Button type="button" variant="outline" onClick={handlePrint}>
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
      <ButtonLink href="/consultant-review" variant="secondary">
        <UserCheck className="mr-2 h-4 w-4" />
        Request BROVI Consultant Review
      </ButtonLink>
    </div>
  );
}
