import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ThemeToggle";
import { clearAllPreviewData, STORAGE_KEYS } from "@/lib/storage";
import { toast } from "sonner";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — Brovi Scan" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggle } = useTheme();

  const exportData = () => {
    const out: Record<string, unknown> = {};
    Object.entries(STORAGE_KEYS).forEach(([k, key]) => {
      const raw = localStorage.getItem(key);
      if (raw) try { out[k] = JSON.parse(raw); } catch { out[k] = raw; }
    });
    const blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "brovi-preview-data.json"; a.click();
    URL.revokeObjectURL(url);
    toast.success("Preview data exported");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <Card title="Theme">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Dark mode</span>
          <Switch checked={theme === "dark"} onCheckedChange={toggle} />
        </div>
      </Card>
      <Card title="Language preference">
        <p className="text-sm text-muted-foreground">English (more languages coming soon).</p>
      </Card>
      <Card title="Email notification preference">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Send me readiness updates</span>
          <Switch defaultChecked />
        </div>
      </Card>
      <Card title="Your preview data">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={exportData}>Export preview data</Button>
          <Button variant="destructive" onClick={() => { clearAllPreviewData(); toast.success("Preview data cleared"); }}>Clear preview data</Button>
          <Button variant="ghost" disabled title="Available after backend connection">Delete account request</Button>
        </div>
      </Card>
    </div>
  );
}
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-xl border bg-card p-5"><h2 className="font-semibold mb-3">{title}</h2>{children}</section>;
}