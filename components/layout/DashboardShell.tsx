import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { DisclaimerBanner } from "./DisclaimerBanner";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main className="container-page grid gap-6 py-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <Sidebar />
        <section className="min-w-0 space-y-6">
          <DisclaimerBanner />
          {children}
        </section>
      </main>
    </>
  );
}
