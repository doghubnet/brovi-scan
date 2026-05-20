import { createFileRoute } from "@tanstack/react-router";
import { TopNav } from "@/components/TopNav";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy — Brovi Scan" }] }),
  component: PrivacyPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mt-6"><h2 className="text-xl font-semibold">{title}</h2><div className="text-muted-foreground mt-2 text-sm leading-relaxed">{children}</div></section>;
}

function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <TopNav />
      <article className="container mx-auto px-4 py-10 max-w-3xl text-foreground">
        <h1 className="text-3xl font-semibold">Privacy</h1>
        <p className="text-muted-foreground mt-2">Preview mode — no real backend is connected.</p>
        <Section title="What data you enter"><p>You may enter profile details, document statuses, financial preparation notes, and interview answers. In preview mode, this data is stored only on your device via local storage.</p></Section>
        <Section title="Preview mode does not process real documents"><p>Uploaded files in preview are not transmitted or analyzed. They appear in a local file list for design testing only.</p></Section>
        <Section title="No bank login collection"><p>We never ask for bank passwords, card numbers, CVV, or online banking access. Do not enter such information anywhere in this app.</p></Section>
        <Section title="No official decision guarantee"><p>Brovi Scan does not guarantee visas, admissions, scholarships, or appointment outcomes.</p></Section>
        <Section title="User responsibility"><p>You are responsible for the accuracy of the information you provide and for following official requirements.</p></Section>
        <Section title="Future private storage plan"><p>When a backend is connected, your data will be stored privately under your account with access controls and deletion options.</p></Section>
        <Section title="Data deletion request"><p>You may clear your preview data at any time from Settings → Clear preview data.</p></Section>
      </article>
    </div>
  );
}