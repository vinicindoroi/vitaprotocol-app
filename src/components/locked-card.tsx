import { Lock } from "lucide-react";
import { UPGRADE_URL } from "@/lib/config";
import { useLang } from "@/i18n";

export function LockedCard({ title, message }: { title?: string; message?: string }) {
  const { pick } = useLang();
  const finalTitle = title ?? pick("Contenido bloqueado", "Locked content");
  const finalMessage = message ?? pick("Este contenido está disponible en el Protocolo Completo.", "This content is available in the Complete Protocol.");
  return (
    <div className="card-soft p-6 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft">
        <Lock size={20} color="var(--primary)" />
      </div>
      <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>{finalTitle}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{finalMessage}</p>
      <a href={UPGRADE_URL} target="_blank" rel="noreferrer" className="btn-primary mt-5">{pick("Desbloquear ahora →", "Unlock now →")}</a>
    </div>
  );
}
