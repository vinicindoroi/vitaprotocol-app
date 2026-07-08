import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import { SHOPPING_LISTS } from "@/data/shopping-lists";
import { PRODUCTS } from "@/data/products";
import { LockedCard } from "@/components/locked-card";
import { TutorialWizard } from "@/components/tutorial-wizard";
import { SHOPPING_TOUR } from "@/data/tours";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/shopping")({
  component: ShoppingPage,
});

type Tab = "store" | "list";

function ShoppingPage() {
  const { data: profile } = useProfile();
  const [tab, setTab] = useState<Tab>("store");

  if (!profile) return <div className="px-6 pt-12 text-muted-foreground">Cargando…</div>;

  return (
    <div className="px-5 pt-8 pb-6 animate-fade-up">
      <TutorialWizard steps={SHOPPING_TOUR} storageKey="vp.tour.shopping.v2" />

      <p
        className="text-[11px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: "rgba(45,106,79,0.6)" }}
      >
        Compras
      </p>
      <h1
        className="mt-1 text-[26px] leading-[1.15]"
        style={{ fontFamily: "var(--font-display)", color: "var(--primary-deep)" }}
      >
        Todo lo que <span className="italic" style={{ color: "var(--primary)" }}>tu cuerpo pide</span>.
      </h1>

      <div
        className="mt-6 grid grid-cols-2 gap-1.5 rounded-full p-1"
        style={{ background: "var(--primary-soft)" }}
      >
        {(
          [
            { id: "store", label: "Tienda" },
            { id: "list", label: "Lista" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="tap rounded-full py-2 text-[13px] font-semibold transition"
            style={{
              background: tab === t.id ? "var(--primary)" : "transparent",
              color: tab === t.id ? "var(--primary-foreground)" : "var(--primary)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "store" ? <StoreTab /> : <ShoppingListTab plan={profile.plan} />}
    </div>
  );
}

function StoreTab() {
  return (
    <div className="mt-6 space-y-4" data-tour="store-grid">
      {PRODUCTS.map((p, i) => (
        <Link
          key={p.id}
          to="/shopping/$productId"
          params={{ productId: p.id }}
          className={`tap animate-fade-up delay-${Math.min(i + 1, 5)} block overflow-hidden rounded-[28px] border bg-card`}
          style={{ borderColor: "var(--border)", boxShadow: "var(--shadow-soft)" }}
        >
          <div className="flex gap-4 p-4">
            <div
              className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-[22px]"
              style={{ background: p.accent }}
            >
              <span
                className="text-[38px] leading-none"
                style={{
                  color:
                    p.accent.includes("2D6A4F") || p.accent.includes("1B3A2E")
                      ? "#fff"
                      : "var(--primary)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {p.image}
              </span>
              {p.badge && (
                <span
                  className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em]"
                  style={{ background: "var(--primary-deep)", color: "#fff" }}
                >
                  {p.badge}
                </span>
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
              <div className="min-w-0">
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "rgba(45,106,79,0.6)" }}
                >
                  {p.category}
                </p>
                <h3
                  className="mt-0.5 truncate text-[16px] font-semibold"
                  style={{ color: "var(--primary-deep)" }}
                >
                  {p.name}
                </h3>
                <p
                  className="mt-1 line-clamp-2 text-[12.5px] leading-snug"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {p.tagline}
                </p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p
                  className="text-[15px] font-bold"
                  style={{ color: "var(--primary)" }}
                >
                  ${p.price}{" "}
                  <span
                    className="text-[10px] font-medium uppercase tracking-[0.12em]"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {p.currency}
                  </span>
                </p>
                <ArrowRight size={16} style={{ color: "var(--primary)" }} />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ShoppingListTab({ plan }: { plan: string }) {
  const [week, setWeek] = useState(1);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const storageKey = `shopping_week_${week}`;

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    setChecked(raw ? JSON.parse(raw) : {});
  }, [storageKey]);

  function save(next: Record<string, boolean>) {
    setChecked(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  }

  if (plan !== "complete") {
    return (
      <div className="mt-6">
        <LockedCard />
      </div>
    );
  }

  const data = SHOPPING_LISTS.find((w) => w.week === week)!;
  const allItems = data.categories.flatMap((c) => c.items.map((i) => `${c.name}::${i}`));
  const markAll = () => save(Object.fromEntries(allItems.map((k) => [k, true])));
  const clear = () => save({});

  return (
    <div className="mt-6">
      <p className="text-sm text-muted-foreground">{data.title}</p>

      <div className="mt-4 grid grid-cols-4 gap-2" data-tour="shopping-weeks">
        {[1, 2, 3, 4].map((w) => (
          <button
            key={w}
            onClick={() => setWeek(w)}
            className="rounded-lg px-2 py-2 text-sm font-semibold transition"
            style={{
              background: w === week ? "var(--primary)" : "var(--primary-soft)",
              color: w === week ? "var(--primary-foreground)" : "var(--primary)",
            }}
          >
            Sem. {w}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-5" data-tour="shopping-list">
        {data.categories.map((cat) => (
          <div key={cat.name}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {cat.name}
            </h3>
            <ul className="mt-2 space-y-1.5">
              {cat.items.map((item) => {
                const key = `${cat.name}::${item}`;
                const isChecked = !!checked[key];
                return (
                  <li key={key}>
                    <label className="flex items-center gap-3 rounded-lg px-2 py-2.5 active:bg-muted">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => save({ ...checked, [key]: e.target.checked })}
                        className="h-5 w-5 accent-[var(--primary)]"
                      />
                      <span
                        className="text-base"
                        style={{
                          textDecoration: isChecked ? "line-through" : "none",
                          color: isChecked ? "var(--muted-foreground)" : "var(--foreground)",
                        }}
                      >
                        {item}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3">
        <button onClick={markAll} className="btn-primary">
          Marcar todos
        </button>
        <button onClick={clear} className="btn-outline">
          Limpiar lista
        </button>
      </div>
    </div>
  );
}
