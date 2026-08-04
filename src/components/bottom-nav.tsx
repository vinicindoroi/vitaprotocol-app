import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Calendar, Compass, ShoppingCart, User } from "lucide-react";
import { useLang } from "@/i18n";

const items = [
  { to: "/dashboard", key: "nav_today", Icon: Home },
  { to: "/protocol", key: "nav_protocol", Icon: Calendar },
  { to: "/progress", key: "nav_journey", Icon: Compass },
  { to: "/shopping", key: "nav_shopping", Icon: ShoppingCart },
  { to: "/profile", key: "nav_profile", Icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t, pick } = useLang();
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
    >
      <nav
        aria-label={pick("Navegación principal", "Main navigation")}
        data-tour="nav"
        className="glass pointer-events-auto flex w-full max-w-[420px] items-center justify-around rounded-full px-2 py-2"
        style={{ boxShadow: "var(--shadow-float)" }}
      >
        {items.map(({ to, key, Icon }) => {
          const active = pathname === to || pathname.startsWith(to + "/");
          const label = t(key);
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              className="tap group relative flex flex-1 flex-col items-center gap-0.5 rounded-full py-2"
              style={{ color: active ? "var(--primary)" : "rgba(27,58,46,0.45)" }}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                style={{ background: active ? "var(--primary-soft)" : "transparent" }}
              >
                <Icon size={19} strokeWidth={active ? 2.2 : 1.7} />
              </span>
              <span
                className="text-[9.5px] uppercase tracking-[0.12em]"
                style={{ fontWeight: active ? 700 : 500 }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
