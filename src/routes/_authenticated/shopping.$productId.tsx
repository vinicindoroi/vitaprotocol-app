import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { getProduct, PRODUCTS } from "@/data/products";
import { getProductEn, PRODUCTS_EN } from "@/data/products.en";
import { useLang } from "@/i18n";
import { ArrowLeft, Check, ShieldCheck, Truck } from "lucide-react";

export const Route = createFileRoute("/_authenticated/shopping/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} · vitaprotocol` },
          { name: "description", content: loaderData.product.tagline },
        ]
      : [{ title: "Producto no encontrado" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
  notFoundComponent: ProductNotFound,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    const { pick } = useLang();
    return (
      <div className="px-6 pt-16">
        <p className="text-sm text-muted-foreground">{pick("Algo interrumpió la carga.", "Something interrupted the loading.")}</p>
        <p className="mt-2 text-xs opacity-60">{error.message}</p>
        <button
          className="btn-primary mt-6"
          onClick={() => {
            reset();
            router.invalidate();
          }}
        >
          {pick("Intentar de nuevo", "Try again")}
        </button>
      </div>
    );
  },
});

function ProductPage() {
  const { pick } = useLang();
  const { product: esProduct } = Route.useLoaderData();
  const product = pick(esProduct, getProductEn(esProduct.id) ?? esProduct);
  const relatedList = pick(PRODUCTS, PRODUCTS_EN);
  const related = relatedList.filter((p) => p.id !== product.id).slice(0, 3);
  const isDark = product.accent.includes("2D6A4F") || product.accent.includes("1B3A2E");

  return (
    <div className="pb-10 animate-fade-up">
      {/* Header con back */}
      <div className="flex items-center justify-between px-5 pt-6">
        <Link
          to="/shopping"
          className="tap flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
          aria-label={pick("Volver a la tienda", "Back to the store")}
        >
          <ArrowLeft size={18} />
        </Link>
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: "rgba(45,106,79,0.6)" }}
        >
          {product.category}
        </p>
      </div>

      {/* Hero visual */}
      <div className="mt-5 px-5">
        <div
          className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-[32px]"
          style={{ background: product.accent, boxShadow: "var(--shadow-float)" }}
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
            style={{ background: "rgba(255,255,255,0.18)" }}
          />
          <span
            className="relative text-[120px] leading-none"
            style={{
              color: isDark ? "#fff" : "var(--primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            {product.image}
          </span>
          {product.badge && (
            <span
              className="absolute left-5 top-5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ background: "rgba(255,255,255,0.9)", color: "var(--primary-deep)" }}
            >
              {product.badge}
            </span>
          )}
        </div>
      </div>

      {/* Título y precio */}
      <section className="mt-7 px-5 animate-fade-up delay-1">
        <h1
          className="text-[28px] leading-[1.15]"
          style={{ fontFamily: "var(--font-display)", color: "var(--primary-deep)" }}
        >
          {product.name}
        </h1>
        <p
          className="mt-2 text-[15px] italic"
          style={{ fontFamily: "var(--font-display)", color: "var(--muted-foreground)" }}
        >
          {product.tagline}
        </p>
        <p
          className="mt-4 text-[26px] font-bold"
          style={{ color: "var(--primary)" }}
        >
          ${product.price}{" "}
          <span
            className="text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{ color: "var(--muted-foreground)" }}
          >
            {product.currency}
          </span>
        </p>
      </section>

      {/* Descripción */}
      <section className="mt-6 px-5 animate-fade-up delay-2">
        <p
          className="text-[15px] leading-relaxed"
          style={{ color: "var(--foreground)" }}
        >
          {product.description}
        </p>
      </section>

      {/* Highlights */}
      <section className="mt-6 px-5 animate-fade-up delay-3">
        <h2
          className="text-[11px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: "var(--primary)" }}
        >
          {pick("Lo que incluye", "What's included")}
        </h2>
        <ul className="mt-3 space-y-2.5">
          {product.highlights.map((h: string) => (
            <li key={h} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
              >
                <Check size={12} strokeWidth={2.6} />
              </span>
              <span className="text-[14px]" style={{ color: "var(--primary-deep)" }}>
                {h}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Ingredientes */}
      {product.ingredients && (
        <section className="mt-6 px-5 animate-fade-up delay-4">
          <h2
            className="text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--primary)" }}
          >
            {pick("Ingredientes", "Ingredients")}
          </h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.ingredients.map((ing: string) => (
              <span
                key={ing}
                className="rounded-full px-3 py-1 text-[12px]"
                style={{ background: "var(--muted)", color: "var(--primary-deep)" }}
              >
                {ing}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Cómo se usa */}
      <section className="mt-6 px-5">
        <div
          className="rounded-[24px] p-5"
          style={{ background: "var(--primary-soft)" }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{ color: "var(--primary)" }}
          >
            {pick("Cómo se usa", "How to use it")}
          </p>
          <p
            className="mt-1.5 text-[14px] leading-relaxed"
            style={{ color: "var(--primary-deep)" }}
          >
            {product.usage}
          </p>
        </div>
      </section>

      {/* Trust */}
      <section className="mt-5 grid grid-cols-2 gap-3 px-5">
        <div
          className="flex items-center gap-2.5 rounded-2xl border p-3"
          style={{ borderColor: "var(--border)" }}
        >
          <Truck size={16} style={{ color: "var(--primary)" }} />
          <p className="text-[11.5px]" style={{ color: "var(--primary-deep)" }}>
            {pick("Envío en 48h", "Shipping in 48h")}
          </p>
        </div>
        <div
          className="flex items-center gap-2.5 rounded-2xl border p-3"
          style={{ borderColor: "var(--border)" }}
        >
          <ShieldCheck size={16} style={{ color: "var(--primary)" }} />
          <p className="text-[11.5px]" style={{ color: "var(--primary-deep)" }}>
            {pick("Devolución 30 días", "30-day return")}
          </p>
        </div>
      </section>

      {/* Relacionados */}
      <section className="mt-8 px-5">
        <h2
          className="text-[11px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: "var(--primary)" }}
        >
          {pick("También te puede acompañar", "You might also like")}
        </h2>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {related.map((r) => (
            <Link
              key={r.id}
              to="/shopping/$productId"
              params={{ productId: r.id }}
              className="tap w-32 shrink-0"
            >
              <div
                className="flex h-24 items-center justify-center rounded-[20px]"
                style={{ background: r.accent }}
              >
                <span
                  className="text-[40px]"
                  style={{
                    color:
                      r.accent.includes("2D6A4F") || r.accent.includes("1B3A2E")
                        ? "#fff"
                        : "var(--primary)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {r.image}
                </span>
              </div>
              <p
                className="mt-2 truncate text-[12px] font-semibold"
                style={{ color: "var(--primary-deep)" }}
              >
                {r.name}
              </p>
              <p className="text-[11px]" style={{ color: "var(--primary)" }}>
                ${r.price}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA fijo — respeta bottom nav */}
      <div
        className="pointer-events-none fixed inset-x-0 z-30 flex justify-center px-4"
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 92px)" }}
      >
        <a
          href={product.ctaUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary pointer-events-auto max-w-[420px]"
          style={{ boxShadow: "var(--shadow-float)" }}
        >
          {pick("Comprar ahora", "Buy now")} · ${product.price} {product.currency}
        </a>
      </div>
      {/* Spacer para que el CTA no tape contenido */}
      <div className="h-24" />
    </div>
  );
}

function ProductNotFound() {
  const { pick } = useLang();
  return (
    <div className="px-6 pt-16 animate-fade-up">
      <h1
        className="text-[24px]"
        style={{ fontFamily: "var(--font-display)", color: "var(--primary-deep)" }}
      >
        {pick("Este producto ya no está disponible.", "This product is no longer available.")}
      </h1>
      <p className="mt-2 text-[14px]" style={{ color: "var(--muted-foreground)" }}>
        {pick("Vuelve a la tienda para ver el catálogo actualizado.", "Go back to the store to see the updated catalog.")}
      </p>
      <Link to="/shopping" className="btn-primary mt-8">
        {pick("Ir a la tienda", "Go to the store")}
      </Link>
    </div>
  );
}
