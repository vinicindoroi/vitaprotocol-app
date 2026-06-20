
# vitaprotocol — Plan de construcción

Stack: TanStack Start + React + TS + Tailwind v4 + Lovable Cloud (Supabase) + PWA (manifest + service worker generado con vite-plugin-pwa, offline shell).

URLs faltantes (upgrade / Telegram / soporte): quedarán como constantes placeholder en `src/lib/config.ts` para que las edites después en un solo archivo.

## 1. Backend (Lovable Cloud)
- Activar Cloud.
- Migración: tablas `profiles` y `day_completions`, RLS + GRANTs, trigger `handle_new_user` para crear profile al signup.
- Auth: email + password (sin confirmación de email para flujo directo).

## 2. Design system (`src/styles.css`)
- Paleta verde clínica-editorial (#2D6A4F, #52B788, #F0FAF5, #1A1A1A, #6B7280, #E5E7EB, #DC2626, #16A34A).
- Tipografía: Playfair Display (display) + Inter (body) vía `<link>` en `__root.tsx`.
- Tokens: radius cards 16px, botones 10px, shadow card suave, altura botón 52px.
- Utilidad `.content-block` con barra vertical izquierda verde 3px (elemento de firma).
- Mobile-first, safe-area iOS.

## 3. Datos del contenido
- `src/data/protocol-days.ts` — 30 días (alimentación / hábito / horarios).
- `src/data/shopping-lists.ts` — 4 semanas categorizadas.
- `src/data/hormones.ts` — 5 perfiles (cortisol, estrógeno, tiroides, insulina, leptina) con nombre, ícono, color, descripción, enfoque.
- `src/data/quiz.ts` — 5 preguntas con scoring.
- `src/data/motivational.ts` — 30 frases.

## 4. Rutas (TanStack file-based)
- `__root.tsx` — providers, fonts, manifest, SW registration guard, AuthListener.
- `/` (index) — redirige según estado (onboarding → auth → quiz → dashboard).
- `/onboarding` — 3 slides swipe + dots, controlado por localStorage.
- `/auth` — tabs login/registro + reset password.
- `/reset-password` — formulario nueva contraseña.
- `/_authenticated/route.tsx` — gate managed.
- `/_authenticated/quiz` — 5 preguntas + resultado.
- `/_authenticated/dashboard` — home.
- `/_authenticated/protocol` — calendario 30 días.
- `/_authenticated/protocol/$day` — día específico (con bloqueo plan basic >7).
- `/_authenticated/progress` — racha, grid 30, badges.
- `/_authenticated/shopping` — tabs semanas (bloqueado para basic).
- `/_authenticated/profile` — datos + plan + logout + repetir quiz.

## 5. Componentes
- `BottomNav` (5 íconos, safe-area).
- `ContentBlock` (barra verde izquierda).
- `LockedCard` (CTA upgrade).
- `ProgressBar`, `Badge`, `HormoneCard`.

## 6. Lógica de plan
- `profile.plan` (`basic` | `complete`). Hook `usePlan()`.
- BASIC: días 1–7, sin shopping/comunidad, banner upgrade visible.
- COMPLETE: todo.
- Repetir quiz resetea `quiz_completed` y `dominant_hormone`.
- `current_day` solo avanza si el día actual fue marcado completo (registro en `day_completions`).

## 7. PWA
- `vite-plugin-pwa` con `generateSW`, `registerType: autoUpdate`, fallback offline en `/offline.html`.
- Wrapper de registro con guards (no registrar en preview Lovable / iframe / dev / `?sw=off`).
- `manifest.webmanifest` con tema #2D6A4F.
- Iconos generados (192, 512) con imagegen.

## 8. SEO / metadata
- `head()` en cada ruta pública (onboarding/auth) con título + descripción.
- `sitemap.xml` + `robots.txt`.

## Detalles técnicos
- Server fns para lecturas/escrituras críticas con `requireSupabaseAuth` (`getMyProfile`, `completeDay`, `saveQuizResult`, `resetQuiz`, `getCompletions`).
- TanStack Query como capa de datos.
- localStorage: `onboarding_done`, checks de shopping por semana.
- Validación Zod en inputs.

## Lo que NO incluiré (a menos que pidas)
- Notificaciones push reales (toggle es solo UI).
- Sistema de comunidad propio (link externo a Telegram placeholder).
- Pagos (URL externa de checkout).

¿Aprueba? Tras OK, ejecuto todo de corrido.
