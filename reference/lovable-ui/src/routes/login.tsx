import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { TopNav } from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Brovi Scan" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <div className="flex-1 grid place-items-center px-4 py-10">
        <form
          className="w-full max-w-sm rounded-xl border bg-card p-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Signed in (preview mode)");
            navigate({ to: "/app" });
          }}
        >
          <div>
            <h1 className="text-xl font-semibold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your Brovi Scan workspace.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required defaultValue="student@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required defaultValue="preview" />
          </div>
          <Button type="submit" className="w-full">Continue</Button>
          <Button type="button" variant="outline" className="w-full" onClick={() => { toast("Google sign-in is preview-only"); navigate({ to: "/app" }); }}>
            Continue with Google
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            New here? <Link to="/register" className="text-primary hover:underline">Create account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}