import { AuthCard } from "@/components/auth/auth-card";
import { DisclaimerBanner } from "@/components/layout/DisclaimerBanner";
import { TopNav } from "@/components/layout/TopNav";
import { PageTransition } from "@/components/motion/page-transition";

export const dynamic = "force-dynamic";

export default function Login() {
  return (
    <>
      <TopNav />
      <main className="container-page grid min-h-[calc(100vh-5rem)] place-items-center py-10">
        <PageTransition className="w-full max-w-md space-y-5">
          <AuthCard />
          <DisclaimerBanner />
        </PageTransition>
      </main>
    </>
  );
}
