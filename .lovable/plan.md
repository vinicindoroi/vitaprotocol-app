# Rediseño VitalProtocol — Acompañamiento, no dieta

Objetivo: transformar la app de "checklist de dieta" a "acompañamiento personal" con Sofia (voz emocional) y Camila (voz científica). Todo en español, tono cálido, mínimo texto, jornada visual.

## 1. Lenguaje global (barrido de copy)
Reemplazar en toda la app:
- "completado / tareas / meta" → "paso de hoy / ritmo / secuencia"
- "protocolo de X días" queda, pero sin "porcentaje" ni "progreso %"
- Prohibidas: calorías, déficit, prohibido, falla, castigo, meta
- Permitidas: señales del cuerpo, equilibrio, secuencia, organismo, ritmo

## 2. Home (`/dashboard`) — rediseño total
Nueva estructura, sin grid de 4 quick-actions ni tarjeta de hormona:
- Saludo: "Buenos días, {Nombre}"
- "Hoy es tu Día {N} de VitalProtocol"
- Frase: "Hoy solo necesitas completar tres pasos."
- 3 tarjetas grandes verticales (Alimentación, Hábito, Movimiento) con estado (pendiente/hecho)
- Debajo: mini indicador de Jornada (etapa actual, no %)
- Enlace discreto a comunidad/upgrade al final

## 3. Jornada (reemplaza `/progress`)
Cinco etapas con progresión visual (línea vertical con nodos):
- Diagnóstico (día 0) · Reequilibrio (1-7) · Activación (8-15) · Transformación (16-24) · Consolidación (25-30)
- Etapa actual iluminada, pasadas con check suave, futuras en gris
- Sin barras de %, sin "X de 30". Texto: "Estás en Reequilibrio"
- Mantener grid de 30 días como sub-sección discreta

## 4. Diagnóstico (`/quiz`) — rediseño consulta
- Cada pregunta ocupa toda la pantalla, tipografía grande, mucho aire
- Transición fade + slide entre preguntas (350ms)
- Reformular preguntas en tono conversacional: "¿Cómo has despertado estos últimos días?"
- Pantalla final en 3 tiempos animados:
  1. "Estamos identificando qué señales está mostrando tu cuerpo…" (2s)
  2. "Preparando tu protocolo…" (2s)
  3. Resultado (hormona) con mensaje de Sofia

## 5. Plan Diario (`/protocol/$day`) — 5 pasos simples
Reemplazar bloques actuales (food/habit/schedule) por 5 tarjetas iconográficas:
1. 🥗 Alimentación · 2. 🌿 Hábito · 3. 🚶 Movimiento · 4. 🌙 Sueño · 5. 💧 Agua

Cada tarjeta:
- Título + una línea de acción (máx 15 palabras)
- Botón "Concluir" → animación check + micro dopamina (scale + color)
- Botón secundario "¿Por qué esto?" → abre card colapsable máx 5 líneas
- Dentro del "¿Por qué?": sello "Comentario de Camila" con nota corta

Datos: extender `protocol-days.ts` con `movement`, `sleep`, `water`, y por paso un `why` + `camila` (frases cortas). Genero contenido para los 30 días.

Estado de conclusión: guardar por-paso en nueva tabla `day_step_completions (user_id, day_number, step)` con RLS. Día se marca completo cuando los 5 pasos están hechos → dispara mensaje de cierre.

## 6. Cierre del día
Al completar los 5 pasos, modal suave (no toast "¡Bien!"):
- Rotar entre: "Tu cuerpo recibió las señales correctas hoy." / "Un paso más concluido." / "Continúa mañana. El protocolo funciona por consistencia."

## 7. Final de 30 días (nueva ruta `/journey-complete`)
Se activa al completar día 30:
- Mensaje largo de Sofia (el texto del brief, traducido)
- Línea de tiempo Día 1 → Día 30
- 7 dimensiones con slider "antes/ahora" auto-declarado: energía, sueño, hinchazón, bienestar, ropa, humor, autoestima
- Guardar en tabla `journey_reflection`
- Sin foco en peso

## 8. Componentes nuevos
- `<JourneyStages />` — línea vertical de 5 etapas
- `<DayStepCard />` — tarjeta paso con concluir + por qué
- `<CamilaNote />` — sello con nota
- `<SofiaMessage />` — bloque de mensaje emocional
- `<DiagnosisIntro />` — pantalla de 3 tiempos animada

## 9. Fuera de alcance (no toco)
- Auth, onboarding, shopping, perfil (solo copy si hay palabras prohibidas)
- Sistema de planes/upgrade (se mantiene)
- PWA/service worker

## Detalles técnicos
- Migración Supabase: `day_step_completions` con RLS + GRANT; `journey_reflection` con RLS + GRANT
- Extender `PROTOCOL_DAYS` con campos: `movement`, `sleep`, `water`, y para cada uno de los 5 pasos: `{ text, why, camila }`
- Hook `useDaySteps(day)` para leer/marcar pasos
- Animaciones: `framer-motion` (ya considerar añadir) o CSS puro con keyframes existentes
- Etapa derivada de `current_day` (helper `getStage(day)`)

## Orden de ejecución
1. Migración BD + tipos
2. Datos: extender protocol-days con 5 pasos × 30 días (contenido generado)
3. Componentes nuevos
4. Rediseño Home, Jornada, Diagnóstico, Día
5. Ruta final de 30 días
6. Barrido de copy
