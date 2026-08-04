import { Sparkles } from "lucide-react";
import { useLang } from "@/i18n";

export function CamilaNote({ text }: { text: string }) {
  const { pick } = useLang();
  return (
    <div
      className="mt-3 rounded-xl px-3 py-2.5"
      style={{
        background: "rgba(45, 106, 79, 0.06)",
        border: "1px solid rgba(45, 106, 79, 0.15)",
      }}
    >
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide" style={{ color: "var(--primary)" }}>
        <Sparkles size={12} strokeWidth={2.4} />
        {pick("Comentario de Camila", "Camila's note")}
      </div>
      <p className="mt-1 text-[13px] leading-snug text-foreground/85">{text}</p>
    </div>
  );
}
