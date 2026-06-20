import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import { SHOPPING_LISTS } from "@/data/shopping-lists";
import { LockedCard } from "@/components/locked-card";

export const Route = createFileRoute("/_authenticated/shopping")({
  component: ShoppingPage,
});

function ShoppingPage() {
  const { data: profile } = useProfile();
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

  if (!profile) return <div className="px-6 pt-12 text-muted-foreground">Cargando…</div>;
  if (profile.plan !== "complete") {
    return (
      <div className="px-5 pt-8">
        <h1 className="text-[24px] text-foreground" style={{ fontFamily: "var(--font-display)" }}>Lista de compras</h1>
        <div className="mt-6"><LockedCard /></div>
      </div>
    );
  }

  const data = SHOPPING_LISTS.find((w) => w.week === week)!;
  const allItems = data.categories.flatMap((c) => c.items.map((i) => `${c.name}::${i}`));
  const markAll = () => save(Object.fromEntries(allItems.map((k) => [k, true])));
  const clear = () => save({});

  return (
    <div className="px-5 pt-8 pb-6 animate-fade-up">
      <h1 className="text-[24px] text-foreground" style={{ fontFamily: "var(--font-display)" }}>Lista de compras</h1>
      <p className="mt-1 text-sm text-muted-foreground">{data.title}</p>

      <div className="mt-5 grid grid-cols-4 gap-2">
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

      <div className="mt-6 space-y-5">
        {data.categories.map((cat) => (
          <div key={cat.name}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{cat.name}</h3>
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
                      <span className="text-base" style={{ textDecoration: isChecked ? "line-through" : "none", color: isChecked ? "var(--muted-foreground)" : "var(--foreground)" }}>
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
        <button onClick={markAll} className="btn-primary">Marcar todos</button>
        <button onClick={clear} className="btn-outline">Limpiar lista</button>
      </div>
    </div>
  );
}
