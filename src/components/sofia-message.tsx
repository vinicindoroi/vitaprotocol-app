import { useLang } from "@/i18n";

export function SofiaMessage({ children }: { children: React.ReactNode }) {
  const { pick } = useLang();
  return (
    <div className="rounded-2xl border border-border bg-primary-soft px-5 py-5">
      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "var(--primary)" }}>
        {pick("Sofia", "Sofia")}
      </p>
      <div className="mt-2 space-y-3 text-[15px] leading-relaxed text-foreground/90" style={{ fontFamily: "var(--font-display)" }}>
        {children}
      </div>
    </div>
  );
}
