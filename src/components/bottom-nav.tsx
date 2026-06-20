import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Calendar, BarChart3, ShoppingCart, User } from "lucide-react";

const items = [
  { to: "/dashboard", label: "Inicio", Icon: Home },
  { to: "/protocol", label: "Protocolo", Icon: Calendar },
  { to: "/progress", label: "Progreso", Icon: BarChart3 },
  { to: "/shopping", label: "Compras", Icon: ShoppingCart },
  { to: "/profile", label: "Perfil", Icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      className="fixed bottom-0 left-1/2 z-40 w-full -translate-x-1/2 border-t border-border bg-background"
      style={{ maxWidth: 480, paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Navegación principal"
    >
      <ul className="grid grid-cols-5">
        {items.map(({ to, label, Icon }) => {
          const active = pathname === to || pathname.startsWith(to + "/");
          return (
            <li key={to}>
              <Link
                to={to}
                className="flex flex-col items-center gap-1 py-2.5 text-[11px]"
                style={{ color: active ? "var(--primary)" : "var(--muted-foreground)" }}
              >
                <Icon size={22} strokeWidth={active ? 2.2 : 1.6} />
                <span style={{ fontWeight: active ? 600 : 500 }}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
