"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PDFReportButton() {
  return (
    <Button type="button" variant="outline" onClick={() => window.print()}>
      <Printer className="mr-2 h-4 w-4" />
      Downloadable PDF report
    </Button>
  );
}
