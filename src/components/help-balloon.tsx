import { useState } from "react";
import { MessageCircle, X, Mail } from "lucide-react";
import { useLang } from "@/i18n";
import { SUPPORT_EMAIL } from "@/lib/config";

export function HelpBalloon() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed right-4 z-50 flex flex-col items-end"
      style={{ bottom: "calc(96px + env(safe-area-inset-bottom))" }}
      aria-label={t("help_title")}
    >
      {open && (
        <div
          className="mb-3 w-[260px] animate-fade-up rounded-[24px] border bg-card p-5"
          style={{
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-float)",
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <h3
              className="text-[15px] font-semibold"
              style={{ color: "var(--primary-deep)" }}
            >
              {t("help_title")}
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="tap -mr-1 -mt-1 flex h-8 w-8 items-center justify-center rounded-full"
              aria-label={t("help_close")}
            >
              <X size={16} style={{ color: "var(--muted-foreground)" }} />
            </button>
          </div>
          <p
            className="mt-1 text-[13px] leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            {t("help_subtitle")}
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="btn-primary mt-4"
            style={{ minHeight: 46, fontSize: 14 }}
          >
            <Mail size={16} className="mr-2" />
            {t("help_contact")}
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="tap animate-help-pulse flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          background: "var(--primary)",
          color: "var(--primary-foreground)",
          boxShadow: "0 12px 32px -10px rgba(45,106,79,0.45)",
        }}
        aria-label={t("help_title")}
      >
        {open ? (
          <X size={24} strokeWidth={2} />
        ) : (
          <MessageCircle size={24} strokeWidth={2} />
        )}
      </button>
    </div>
  );
}
