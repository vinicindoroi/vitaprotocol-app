import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/use-profile";
import { useLang } from "@/i18n";
import { SUPPORT_EMAIL } from "@/lib/config";
import { ArrowLeft, Check, ImageUp, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/refund")({
  component: RefundPage,
  head: () => ({
    meta: [
      { title: "Solicitar reembolso · VitaProtocol" },
      {
        name: "description",
        content:
          "Solicita el reembolso de tu compra en VitaProtocol en pocos pasos: datos personales, comprobante de pago y número de pedido.",
      },
      { property: "og:title", content: "Solicitar reembolso · VitaProtocol" },
      {
        property: "og:description",
        content: "Pide tu reembolso en pocos pasos, con acompañamiento del equipo VitaProtocol.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

const MAX_FILE = 5 * 1024 * 1024;

const schema = z.object({
  full_name: z.string().trim().min(3).max(120),
  document_id: z.string().trim().min(3).max(60),
  phone: z.string().trim().min(6).max(40),
  country: z.string().trim().min(2).max(60),
  email: z.string().trim().email().max(255),
  order_id: z.string().trim().min(2).max(120),
  reason: z.string().trim().max(1000),
});

type Form = z.infer<typeof schema>;

function RefundPage() {
  const { pick } = useLang();
  const nav = useNavigate();
  const { data: profile } = useProfile();

  const [step, setStep] = useState(0);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<Form>({
    full_name: profile?.full_name ?? "",
    document_id: "",
    phone: "",
    country: profile?.country ?? "",
    email: profile?.email ?? "",
    order_id: "",
    reason: "",
  });
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [orderProof, setOrderProof] = useState<File | null>(null);

  const set = (k: keyof Form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const steps = [
    pick("Datos personales", "Personal details"),
    pick("Contacto y pedido", "Contact & order"),
    pick("Comprobantes", "Proof images"),
    pick("Revisión", "Review"),
  ];

  function validStep(i: number) {
    if (i === 0)
      return (
        form.full_name.trim().length >= 3 &&
        form.document_id.trim().length >= 3 &&
        form.phone.trim().length >= 6 &&
        form.country.trim().length >= 2
      );
    if (i === 1)
      return /^\S+@\S+\.\S+$/.test(form.email.trim()) && form.order_id.trim().length >= 2;
    if (i === 2) return !!paymentProof && !!orderProof;
    return true;
  }

  function pickFile(setter: (f: File | null) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast.error(pick("Sube una imagen (PNG o JPG)", "Upload an image (PNG or JPG)"));
        return;
      }
      if (file.size > MAX_FILE) {
        toast.error(pick("La imagen debe pesar menos de 5 MB", "Image must be under 5 MB"));
        return;
      }
      setter(file);
    };
  }

  async function submit() {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(pick("Revisa los datos ingresados", "Please review your details"));
      return;
    }
    if (!paymentProof || !orderProof) return;
    setSending(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("no session");
      const uid = u.user.id;
      const stamp = Date.now();

      async function upload(file: File, tag: string) {
        const ext = file.name.split(".").pop()?.toLowerCase() || "png";
        const path = `${uid}/${stamp}-${tag}.${ext}`;
        const { error } = await supabase.storage
          .from("refund-proofs")
          .upload(path, file, { contentType: file.type, upsert: false });
        if (error) throw error;
        return path;
      }

      const [payPath, orderPath] = await Promise.all([
        upload(paymentProof, "payment"),
        upload(orderProof, "order"),
      ]);

      const { error } = await supabase.from("refund_requests").insert({
        user_id: uid,
        ...parsed.data,
        payment_proof_path: payPath,
        order_proof_path: orderPath,
      });
      if (error) throw error;
      setDone(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : pick("No pudimos enviar tu solicitud", "We couldn't send your request"));
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="px-5 pt-16 pb-10 animate-fade-up text-center">
        <div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
        >
          <Check size={34} strokeWidth={2.2} />
        </div>
        <h1
          className="mt-6 text-[24px] leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--primary-deep)" }}
        >
          {pick("Solicitud recibida", "Request received")}
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          {pick(
            "Nuestro equipo revisará tus comprobantes y te responderá por correo en un plazo de hasta 5 días hábiles.",
            "Our team will review your proofs and reply by email within 5 business days.",
          )}
        </p>
        <p className="mt-2 text-[13px]" style={{ color: "var(--muted-foreground)" }}>
          {SUPPORT_EMAIL}
        </p>
        <button className="btn-primary mt-8" onClick={() => nav({ to: "/profile" })}>
          {pick("Volver al perfil", "Back to profile")}
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 pt-8 pb-10 animate-fade-up">
      <button
        onClick={() => (step === 0 ? nav({ to: "/profile" }) : setStep((s) => s - 1))}
        className="tap flex items-center gap-1.5 text-[13px] font-medium"
        style={{ color: "var(--muted-foreground)" }}
      >
        <ArrowLeft size={16} />
        {pick("Volver", "Back")}
      </button>

      <p
        className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: "rgba(45,106,79,0.6)" }}
      >
        {pick("Reembolso", "Refund")}
      </p>
      <h1
        className="mt-1 text-[26px] leading-[1.15]"
        style={{ fontFamily: "var(--font-display)", color: "var(--primary-deep)" }}
      >
        {pick("Solicitar", "Request a")}{" "}
        <span className="italic" style={{ color: "var(--primary)" }}>
          {pick("tu reembolso", "refund")}
        </span>
        .
      </h1>

      <div className="mt-6 flex gap-1.5">
        {steps.map((s, i) => (
          <div
            key={s}
            className="h-1.5 flex-1 rounded-full transition-all"
            style={{ background: i <= step ? "var(--primary)" : "var(--primary-soft)" }}
          />
        ))}
      </div>
      <p className="mt-2 text-[12px]" style={{ color: "var(--muted-foreground)" }}>
        {pick("Paso", "Step")} {step + 1}/{steps.length} · {steps[step]}
      </p>

      <div className="card-soft mt-6 space-y-4 p-5">
        {step === 0 && (
          <>
            <Field label={pick("Nombre completo", "Full name")} value={form.full_name} onChange={set("full_name")} placeholder={pick("Como aparece en tu documento", "As on your ID")} />
            <Field label={pick("Documento de identidad", "ID number")} value={form.document_id} onChange={set("document_id")} placeholder="CC / DNI / CPF" />
            <Field label={pick("Teléfono", "Phone")} value={form.phone} onChange={set("phone")} placeholder="+52 55 0000 0000" />
            <Field label={pick("País", "Country")} value={form.country} onChange={set("country")} />
          </>
        )}

        {step === 1 && (
          <>
            <Field label={pick("Correo de la compra", "Purchase email")} value={form.email} onChange={set("email")} type="email" />
            <Field label={pick("ID del pedido", "Order ID")} value={form.order_id} onChange={set("order_id")} placeholder="#000000" />
            <div>
              <label className="text-[12px] font-semibold" style={{ color: "var(--primary-deep)" }}>
                {pick("Motivo (opcional)", "Reason (optional)")}
              </label>
              <textarea
                value={form.reason}
                maxLength={1000}
                onChange={(e) => set("reason")(e.target.value)}
                rows={4}
                className="mt-1.5 w-full rounded-[18px] border bg-background px-4 py-3 text-[14px] outline-none"
                style={{ borderColor: "var(--border)" }}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <Upload
              label={pick("Print del comprobante de pago", "Payment receipt screenshot")}
              file={paymentProof}
              onChange={pickFile(setPaymentProof)}
              hint={pick("PNG o JPG, máx. 5 MB", "PNG or JPG, max 5 MB")}
            />
            <Upload
              label={pick("Print del ID del pedido", "Order ID screenshot")}
              file={orderProof}
              onChange={pickFile(setOrderProof)}
              hint={pick("PNG o JPG, máx. 5 MB", "PNG or JPG, max 5 MB")}
            />
          </>
        )}

        {step === 3 && (
          <div className="space-y-2.5 text-[13.5px]">
            <Review k={pick("Nombre", "Name")} v={form.full_name} />
            <Review k={pick("Documento", "ID")} v={form.document_id} />
            <Review k={pick("Teléfono", "Phone")} v={form.phone} />
            <Review k={pick("País", "Country")} v={form.country} />
            <Review k={pick("Correo", "Email")} v={form.email} />
            <Review k={pick("Pedido", "Order")} v={form.order_id} />
            <Review k={pick("Comprobante de pago", "Payment proof")} v={paymentProof?.name ?? "—"} />
            <Review k={pick("Print del pedido", "Order proof")} v={orderProof?.name ?? "—"} />
            {form.reason && <Review k={pick("Motivo", "Reason")} v={form.reason} />}
          </div>
        )}
      </div>

      <button
        disabled={!validStep(step) || sending}
        onClick={() => (step === 3 ? submit() : setStep((s) => s + 1))}
        className="btn-primary mt-6 disabled:opacity-45"
      >
        {sending && <Loader2 size={16} className="mr-2 animate-spin" />}
        {step === 3 ? pick("Enviar solicitud", "Send request") : pick("Continuar", "Continue")}
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[12px] font-semibold" style={{ color: "var(--primary-deep)" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        maxLength={255}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-full border bg-background px-4 py-3 text-[14px] outline-none"
        style={{ borderColor: "var(--border)" }}
      />
    </div>
  );
}

function Upload({
  label,
  file,
  onChange,
  hint,
}: {
  label: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint: string;
}) {
  return (
    <label className="tap block cursor-pointer rounded-[22px] border border-dashed p-4" style={{ borderColor: "var(--primary)" }}>
      <div className="flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
          style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
        >
          {file ? <Check size={20} /> : <ImageUp size={20} />}
        </span>
        <div className="min-w-0">
          <p className="text-[13.5px] font-semibold" style={{ color: "var(--primary-deep)" }}>
            {label}
          </p>
          <p className="truncate text-[12px]" style={{ color: "var(--muted-foreground)" }}>
            {file ? file.name : hint}
          </p>
        </div>
      </div>
      <input type="file" accept="image/*" className="hidden" onChange={onChange} />
    </label>
  );
}

function Review({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span style={{ color: "var(--muted-foreground)" }}>{k}</span>
      <span className="text-right font-medium" style={{ color: "var(--foreground)" }}>
        {v}
      </span>
    </div>
  );
}
