import { AuthForm } from "@/components/auth/AuthForm";
import { DisclaimerBanner } from "@/components/layout/DisclaimerBanner";
import { TopNav } from "@/components/layout/TopNav";

export default function Login() {
  return <><TopNav /><main className="container-page grid min-h-[calc(100vh-5rem)] place-items-center py-10"><div className="card w-full max-w-md"><h1 className="text-3xl font-black">Login / Register</h1><p className="mt-2 muted">Supabase Auth-ready email sign-in, sign-up, and logout.</p><div className="mt-6"><AuthForm /></div><div className="mt-6"><DisclaimerBanner /></div></div></main></>;
}
