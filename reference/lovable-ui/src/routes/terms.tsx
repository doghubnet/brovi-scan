import { createFileRoute } from "@tanstack/react-router";
import { TopNav } from "@/components/TopNav";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms — Brovi Scan" }] }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen">
      <TopNav />
      <article className="container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="text-3xl font-semibold">Terms</h1>
        <ul className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <li><strong className="text-foreground">Preparation guidance only.</strong> Brovi Scan helps you prepare and self-check; it does not make official decisions.</li>
          <li><strong className="text-foreground">No official guarantee.</strong> Universities, embassies, consulates, and scholarship bodies decide independently.</li>
          <li><strong className="text-foreground">Accurate information.</strong> You must provide truthful data.</li>
          <li><strong className="text-foreground">No fake documents.</strong> Do not request or upload fabricated documents.</li>
          <li><strong className="text-foreground">No illegal advice.</strong> Brovi Scan does not provide advice that violates immigration law.</li>
          <li><strong className="text-foreground">Document responsibility.</strong> You are responsible for any uploaded content.</li>
          <li><strong className="text-foreground">AI limitation.</strong> Scores are heuristic and may be wrong. Verify on official sources.</li>
          <li><strong className="text-foreground">Consultant review.</strong> Consultant reviewers are independent of official authorities.</li>
        </ul>
      </article>
    </div>
  );
}