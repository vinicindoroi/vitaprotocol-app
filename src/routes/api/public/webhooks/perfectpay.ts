import { createFileRoute } from "@tanstack/react-router";

// PerfectPay sale status codes
// 1 pending | 2 approved | 3 in process | 4 declined | 5 expired
// 6 refunded | 7 chargeback | 8 in review | 9 canceled ...
const APPROVED = new Set([2, 12]);
const REVOKED = new Set([4, 5, 6, 7, 9, 11]);

function pickEmail(body: any): string | null {
  const email =
    body?.customer?.email ??
    body?.customers?.customer?.email ??
    body?.subscription?.customer?.email ??
    body?.email ??
    null;
  return typeof email === "string" && email.includes("@") ? email.trim().toLowerCase() : null;
}

export const Route = createFileRoute("/api/public/webhooks/perfectpay")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected = process.env["PERFECTPAY_TOKEN"];
        let body: any;
        try {
          body = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const token = body?.token ?? request.headers.get("x-perfectpay-token");
        if (!expected || token !== expected) {
          return new Response("Invalid token", { status: 401 });
        }

        const email = pickEmail(body);
        if (!email) return new Response("Missing customer email", { status: 400 });

        const statusEnum = Number(body?.sale_status_enum ?? body?.status_enum ?? 0);
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        if (APPROVED.has(statusEnum)) {
          const { error } = await supabaseAdmin.from("purchase_access").upsert(
            {
              email,
              status: "approved",
              plan: "complete",
              full_name:
                body?.customer?.full_name ?? body?.customers?.customer?.full_name ?? "",
              order_code: String(body?.code ?? body?.sale_code ?? ""),
              product_name: String(body?.product?.name ?? ""),
              raw: body,
              approved_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            { onConflict: "email" },
          );
          if (error) return new Response(error.message, { status: 500 });
          return new Response("ok:approved");
        }

        if (REVOKED.has(statusEnum)) {
          await supabaseAdmin
            .from("purchase_access")
            .update({ status: "revoked", raw: body, updated_at: new Date().toISOString() })
            .eq("email", email);
          return new Response("ok:revoked");
        }

        return new Response("ok:ignored");
      },
    },
  },
});
