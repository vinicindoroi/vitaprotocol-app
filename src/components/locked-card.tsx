import { Lock } from "lucide-react";
import { UPGRADE_URL } from "@/lib/config";

export function LockedCard({ title = "Contenido bloqueado", message = "Este contenido está disponible en el Protocolo Completo." }: { title?: string; message?: string }) {
  return (
    <div className="card-soft p-6 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft">
        <Lock size={20} color="var(--primary)" />
      </div>
      <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      <a href={UPGRADE_URL} target="_blank" rel="noreferrer" className="btn-primary mt-5">Desbloquear ahora →</a>
    </div>
  );
}
