import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PRODUCT_NAME } from "@/lib/config";
import { useLang } from "@/i18n";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({ meta: [{ title: "Acceso — vitaprotocol" }] }),
  component: AuthPage,
});

const COUNTRIES = ["México", "Colombia", "Argentina", "Chile", "Perú", "Otro"];
const COUNTRIES_EN = ["Mexico", "Colombia", "Argentina", "Chile", "Peru", "Other"];

function AuthPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const { pick } = useLang();
  return (
    <div className="app-shell px-6 pt-12 pb-10">
      <div className="text-center">
        <h1 className="text-3xl text-primary" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>{PRODUCT_NAME}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{pick("Reequilibrio hormonal · 30 días", "Hormone rebalancing · 30 days")}</p>
      </div>

      <div className="mt-8 grid grid-cols-2 rounded-xl bg-muted p-1">
        {(["login", "signup"] as const).map((tKey) => (
          <button
            key={tKey}
            onClick={() => setTab(tKey)}
            className="rounded-lg py-2.5 text-sm font-semibold transition-all"
            style={{
              background: tab === tKey ? "var(--background)" : "transparent",
              color: tab === tKey ? "var(--foreground)" : "var(--muted-foreground)",
              boxShadow: tab === tKey ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {tKey === "login" ? pick("Iniciar sesión", "Log in") : pick("Crear cuenta", "Create account")}
          </button>
        ))}
      </div>

      <div className="mt-6 animate-fade-up" key={tab}>
        {tab === "login" ? <LoginForm /> : <SignupForm onDone={() => setTab("login")} />}
      </div>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-primary"
      />
    </label>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { pick } = useLang();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success(pick("Bienvenida de vuelta", "Welcome back"));
    nav({ to: "/" });
  }

  async function reset() {
    if (!email) { toast.error(pick("Escribe tu email primero", "Enter your email first")); return; }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) toast.error(error.message);
    else toast.success(pick("Revisa tu correo para restablecer la contraseña", "Check your email to reset your password"));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{pick("Contraseña", "Password")}</span>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-base outline-none focus:border-primary"
          />
          <button type="button" aria-label={pick("Mostrar contraseña", "Show password")} onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </label>
      <button type="button" onClick={reset} className="text-sm font-medium text-primary">{pick("¿Olvidaste tu contraseña?", "Forgot your password?")}</button>
      <button type="submit" disabled={loading} className="btn-primary">{loading ? pick("Entrando…", "Signing in…") : pick("Entrar →", "Log in →")}</button>
    </form>
  );
}

function SignupForm({ onDone }: { onDone: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { pick, lang } = useLang();
  const countries = lang === "en" ? COUNTRIES_EN : COUNTRIES;
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) { toast.error(pick("La contraseña debe tener al menos 8 caracteres", "Password must be at least 8 characters")); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: fullName, country, plan: "basic" },
      },
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success(pick("Cuenta creada", "Account created"));
    // Auto-confirm is on; user should be signed in already
    nav({ to: "/" });
    onDone();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label={pick("Nombre completo", "Full name")} required value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <Field label="Email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{pick("Contraseña (mín. 8 caracteres)", "Password (min. 8 characters)")}</span>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-base outline-none focus:border-primary"
          />
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{pick("País", "Country")}</span>
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base">
          {countries.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>
      <button type="submit" disabled={loading} className="btn-primary">{loading ? pick("Creando…", "Creating…") : pick("Crear mi cuenta →", "Create my account →")}</button>
      <p className="text-xs text-muted-foreground">{pick("Al crear tu cuenta, aceptas nuestros Términos de uso y Política de privacidad.", "By creating your account, you agree to our Terms of Use and Privacy Policy.")}</p>
    </form>
  );
}
