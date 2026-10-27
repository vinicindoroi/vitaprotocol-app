# Vital App

Crea una PWA (Progressive Web App) completa para un protocolo de reequilibrio hormonal femenino llamado [NOMBRE]. 

La app es el producto entregado después de la compra. Tiene dos niveles de acceso:

- Plan BÁSICO ($5): acceso al diagnóstico hormonal + días 1 al 7 del protocolo

- Plan COMPLETO ($27): acceso a todo — 30 días completos + guía de alimentación + lista de compras + guía de síntomas

Stack obligatorio:

- React + TypeScript

- Tailwind CSS

- Supabase (auth + database)

- PWA completa (manifest.json + service worker para funcionar offline)

Idioma: español neutro latinoamericano.

Público: mujeres 30-55 años — diseño simple, letras legibles, sin tecnicismos.

Dispositivo principal: celular (mobile-first absoluto).

---

DISEÑO VISUAL:

Paleta:

- Fondo principal: #FFFFFF

- Verde primario: #2D6A4F

- Verde claro acento: #52B788

- Verde muy suave fondo: #F0FAF5

- Texto principal: #1A1A1A

- Texto secundario: #6B7280

- Borde sutil: #E5E7EB

- Error/alerta: #DC2626

- Éxito: #16A34A

Tipografía:

- Títulos: "Playfair Display" (serif — autoridad femenina)

- Cuerpo y UI: "Inter" (limpio, legible)

- Tamaño mínimo cuerpo: 16px

- Line-height: 1.7

Componentes UI:

- Border-radius cards: 16px

- Border-radius botones: 10px

- Sombra cards: 0 2px 8px rgba(0,0,0,0.06)

- Botón primario: fondo #2D6A4F, texto blanco, altura mínima 52px

- Botón secundario: outline verde, fondo transparente

- Bottom navigation bar: fondo blanco, borde top #E5E7EB, ícones outline verdes

Elemento de firma: barra vertical izquierda #2D6A4F (3px) en todos los bloques de contenido del protocolo — diferencia visual clara, look clínico-editorial.

---

ESTRUCTURA DEL APP — PANTALLAS EN ESTE ORDEN:

═══════════════════════════════

PANTALLA 1: ONBOARDING (solo primera vez)

═══════════════════════════════

Aparece solo cuando la usuaria entra por primera vez (controlar con localStorage 'onboarding_done').

3 slides con swipe horizontal y dots de progreso abajo.

Slide 1:

Ícono SVG inline: silueta femenina con símbolo de equilibrio

Título (Playfair Display, 28px): "Bienvenida a [NOMBRE]"

Subtítulo (Inter, 16px, #6B7280): "Tu protocolo personal de reequilibrio hormonal — diseñado para mujeres de 30 a 55 años."

Slide 2:

Ícono SVG inline: calendario con check

Título: "30 días. Un paso a la vez."

Subtítulo: "Cada día te decimos exactamente qué comer, en qué horario y qué hábito incluir. Sin adivinar. Sin complicaciones."

Slide 3:

Ícono SVG inline: gráfico ascendente

Título: "Tu cuerpo no está roto"

Subtítulo: "Solo necesitaba el mapa correcto. Empieza hoy."

Botón primario verde: "Comenzar mi diagnóstico →"

═══════════════════════════════

PANTALLA 2: AUTH — LOGIN / REGISTRO

═══════════════════════════════

Usar Supabase Auth con email + password.

Layout: logo [NOMBRE] centrado arriba, formulario centralizado, fondo blanco.

Tabs: "Iniciar sesión" | "Crear cuenta"

CREAR CUENTA:

- Campo: Nombre completo

- Campo: Email

- Campo: Contraseña (mínimo 8 caracteres, mostrar/ocultar con ícono ojo)

- Campo: País (select: México, Colombia, Argentina, Chile, Perú, Otro)

- Botón: "Crear mi cuenta →"

- Texto debajo: "Al crear tu cuenta, aceptas nuestros Términos de uso y Política de privacidad."

INICIAR SESIÓN:

- Campo: Email

- Campo: Contraseña

- Link: "¿Olvidaste tu contraseña?" (trigger Supabase reset password)

- Botón: "Entrar →"

Después del registro exitoso:

→ Ir directo al Quiz de Diagnóstico (Pantalla 3)

Después del login exitoso:

→ Ir al Dashboard (Pantalla 4) si ya completó el diagnóstico

→ Ir al Quiz (Pantalla 3) si aún no lo completó

SUPABASE — tabla `profiles`:

- id (uuid, FK auth.users)

- full_name (text)

- email (text)

- country (text)

- plan (text, default: 'basic') — valores: 'basic' | 'complete'

- quiz_completed (boolean, default: false)

- dominant_hormone (text) — guardado después del quiz

- current_day (int, default: 1)

- joined_at (timestamp)

- last_active (timestamp)

═══════════════════════════════

PANTALLA 3: QUIZ DE DIAGNÓSTICO HORMONAL

═══════════════════════════════

Aparece después del registro, solo una vez.

5 preguntas. Una por pantalla con barra de progreso animada arriba (0% → 100%).

Transición entre preguntas: slide horizontal suave.

Al seleccionar opción: resalta en verde y avanza automáticamente después de 350ms.

Pregunta 1 — "¿Cuál es tu principal síntoma?"

A) Cansancio extremo aunque duerma bien → apunta a cortisol

B) Hinchazón y retención de líquidos → apunta a estrógeno

C) Caída de cabello y metabolismo lento → apunta a tiroides

D) Ansiedad por dulce y hambre constante → apunta a insulina

E) Me siento satisfecha pero igual subo de peso → apunta a leptina

Pregunta 2 — "¿Cómo describes tu nivel de estrés diario?"

A) Alto — trabajo, familia, siempre ocupada → cortisol +2

B) Moderado — algunos días más que otros → cortisol +1

C) Bajo — soy bastante tranquila → cortisol 0

Pregunta 3 — "¿Cómo es tu sueño?"

A) Duermo mal, me despierto de noche → cortisol +1, leptina +1

B) Duermo bien pero me levanto cansada → tiroides +2

C) Duermo bien y me levanto con energía → 0

Pregunta 4 — "¿Tienes ciclo menstrual regular?" (si respondió Otro país o tiene más de 45 — mostrar opción menopausia)

A) Sí, regular → 0

B) Irregular, con dolor → estrógeno +2

C) En menopausia o perimenopausia → estrógeno +2, cortisol +1

D) No tengo ciclo (DIU hormonal, etc.) → 0

Pregunta 5 — "¿Qué describes mejor tu relación con la comida?"

A) Como poco pero engorde igual → tiroides +2, leptina +1

B) Tengo muchas ganas de comer dulce → insulina +2

C) Como normal pero me hincho siempre → estrógeno +2

D) Como bien pero no pierdo peso → cortisol +1, insulina +1

LÓGICA DE RESULTADO:

Sumar puntos por hormona. La hormona con mayor puntuación = dominant_hormone.

Guardar en Supabase: profiles.dominant_hormone + profiles.quiz_completed = true.

PANTALLA DE RESULTADO DEL QUIZ:

Título (Playfair Display): "Tu diagnóstico está listo ✓"

Subtítulo: "Tu principal desequilibrio hormonal es:"

Card de resultado según dominant_hormone:

CORTISOL:

Nombre: "Patrón de Cortisol Elevado"

Ícono: 🧠

Color badge: naranja suave

Descripción: "Tu cuerpo está en modo de alerta constante. El cortisol elevado acumula grasa abdominal y bloquea la quema de energía — aunque comas poco."

Enfoque del protocolo: "Las primeras 2 semanas priorizamos reducir el cortisol con ajustes de horario y alimentación anti-inflamatoria."

ESTRÓGENO:

Nombre: "Patrón de Estrógeno Dominante"

Ícono: 💧

Color badge: lila suave

Descripción: "La retención de líquidos, el inchazo y el ciclo irregular son señales de que el estrógeno está fuera de balance respecto a la progesterona."

Enfoque: "Tu protocolo empieza con alimentos que ayudan al hígado a procesar el exceso de estrógeno."

TIROIDES:

Nombre: "Patrón de Tiroides Lenta"

Ícono: 🔋

Color badge: azul suave

Descripción: "Metabolismo lento, cabello débil, cansancio constante — tu tiroides necesita los nutrientes correctos para acelerar sin medicación."

Enfoque: "Priorizamos minerales clave y horarios de comida que activan la función tiroidea."

INSULINA:

Nombre: "Patrón de Resistencia a la Insulina"

Ícono: 🍬

Color badge: amarillo suave

Descripción: "El hambre constante y la ansiedad por dulce no son falta de fuerza de voluntad — es tu insulina desregulada enviando señales equivocadas."

Enfoque: "Reorganizamos el orden y la composición de tus comidas para estabilizar la glucosa."

LEPTINA:

Nombre: "Patrón de Resistencia a la Leptina"

Ícono: 🔕

Color badge: verde suave

Descripción: "Tu cerebro no recibe la señal de saciedad correctamente — por eso sientes que nunca estás satisfecha aunque hayas comido suficiente."

Enfoque: "El protocolo restaura la sensibilidad a la leptina con hábitos de sueño y alimentación estratégica."

Botón primario debajo del resultado:

"Comenzar el Día 1 de mi protocolo →"

═══════════════════════════════

PANTALLA 4: DASHBOARD — HOME

═══════════════════════════════

Header:

- Saludo: "Buenos días, [nombre] 👋" (Playfair Display, 22px)

- Subtexto: "Día [X] de 30 — Semana [Y]" (Inter, 14px, verde)

- Barra de progreso horizontal: porcentaje completado (dias_completados / 30 * 100)

Card principal — DÍA DE HOY:

Fondo #F0FAF5, borde verde izquierdo (3px), border-radius 16px, padding 20px.

Badge superior: "📅 Día [X] — [nombre del día de la semana]"

Título del día (Playfair Display, 20px): título temático del día (ver contenido abajo)

Preview de 2 líneas del contenido del día

Botón: "Ver el protocolo de hoy →" → abre Pantalla 5

Card secundaria — TU HORMONA PRIORITARIA:

Fondo blanco, borde #E5E7EB.

Ícono + nombre de la hormona dominante + frase de 1 línea del enfoque.

Link: "Ver más sobre tu perfil →"

Grid 2x2 — ACCESO RÁPIDO:

- 📅 Mi protocolo → Pantalla 5

- 📊 Mi progreso → Pantalla 7

- 🛒 Lista de compras → Pantalla 8 (solo plan COMPLETE — bloqueado con lock icon para BASIC)

- 💬 Comunidad → link externo Telegram (solo plan COMPLETE)

Banner de upgrade (solo para plan BASIC, abajo de todo):

Fondo degradê sutil de #F0FAF5 a branco, borde verde tracejado.

Texto: "🔓 Desbloquea los 30 días completos + lista de compras + guía de síntomas"

Botón outline verde: "Ver oferta especial →" → [URL_UPGRADE]

═══════════════════════════════

PANTALLA 5: PROTOCOLO DIÁRIO — DÍA ACTUAL

═══════════════════════════════

Header: "Día [X] de 30" + progresso visual (dots ou barra)

Três blocos com borde esquerdo verde (3px firma visual):

BLOCO ALIMENTAÇÃO:

Ícono 🍽 + título "Alimentación de hoy"

Conteúdo do dia (ver lista de 30 dias abaixo)

BLOCO HÁBITO:

Ícono 🌿 + título "Hábito del día"

Descrição do hábito + tempo estimado ("5 minutos")

BLOCO HORÁRIO:

Ícono ⏰ + título "Horarios recomendados"

Tabela simples: Desayuno / Almuerzo / Cena com horários sugeridos

Botão ao final:

"✓ Marcar día como completado"

→ ao clicar: animação de check, incrementa current_day no Supabase, mostra mensagem de encorajamento aleatória

Navegação entre dias:

← Día anterior | Día siguiente → (día siguiente só disponível se dia atual foi marcado como completo)

CONTROLE DE ACESSO POR PLANO:

- Plan BASIC: dias 1-7 acessíveis normalmente

- Plan BASIC + dia 8 em diante: mostra card de bloqueio com cadeado

  Card bloqueado: "Este contenido está disponible en el Protocolo Completo"

  Botão: "Desbloquear ahora →" → [URL_UPGRADE]

- Plan COMPLETE: todos os 30 dias acessíveis

═══════════════════════════════

PANTALLA 6: LISTA COMPLETA DO PROTOCOLO (Calendário)

═══════════════════════════════

Grid de 30 cards em 5 colunas (desktop) / 4 colunas (mobile).

Cada card: número do dia + título curto + status (completo ✓ / atual 🔵 / bloqueado 🔒 / disponível)

Ao clicar em um dia: abre Pantalla 5 naquele dia específico.

Dias bloqueados (plan BASIC após dia 7): ícone cadeado, ao clicar mostra modal de upgrade.

═══════════════════════════════

PANTALLA 7: MEU PROGRESSO

═══════════════════════════════

Título: "Tu progreso" (Playfair Display)

Card resumo:

- Días completados: X de 30

- Racha actual: X días seguidos

- Miembro desde: [data]

- Tu hormona prioritaria: [nome]

Gráfico de consistencia:

Grid de 30 quadrados (tipo GitHub contribution graph) — verde escuro se completado, verde claro se disponível, cinza se bloqueado ou futuro.

Seção de conquistas (badges CSS simples):

- 🌱 Primera semana completa (7 días)

- 🌿 Dos semanas (14 días)  

- 💪 Tres semanas (21 días)

- 🏆 Protocolo completo (30 días)

Badges em cinza até serem desbloqueadas, verde quando conquistadas.

Frase motivacional do dia (array de 30 frases, rotaciona por dia):

═══════════════════════════════

PANTALLA 8: LISTA DE COMPRAS (só plan COMPLETE)

═══════════════════════════════

Se plan BASIC: mostrar tela de bloqueio com botão de upgrade.

Se plan COMPLETE:

Header: "Lista de compras — Semana [X]"

Tabs: Semana 1 | Semana 2 | Semana 3 | Semana 4

Lista de itens com checkbox (estado salvo em localStorage):

Categorias: Verduras y vegetales / Proteínas / Frutas / Despensa / Otros

Botão: "Marcar todos como comprados"

Botão outline: "Limpiar lista"

═══════════════════════════════

PANTALLA 9: PERFIL

═══════════════════════════════

Avatar CSS (círculo com inicial do nome, fundo verde claro)

Nome completo + email + país + data de entrada

Card "Tu plan":

- Plan BASIC: badge cinza "Plan Básico" + botão verde "Actualizar a Completo →"

- Plan COMPLETE: badge verde "Plan Completo ✓"

Card "Tu hormona":

Resumo do resultado do quiz com botão "Repetir diagnóstico" (reseta quiz_completed = false)

Seção configurações:

- Cambiar contraseña

- Notificaciones (toggle — para futura implementação)

- Cerrar sesión (Supabase signOut)

- Link: Política de privacidad | Términos de uso

═══════════════════════════════

BOTTOM NAVIGATION BAR (fixa em todas as telas pós-login)

═══════════════════════════════

5 ícones outline, label abaixo, ativo em verde:

🏠 Inicio | 📅 Protocolo | 📊 Progreso | 🛒 Compras | 👤 Perfil

Altura: 64px. Fundo branco. Borda top #E5E7EB. Safe area padding para iPhone (env(safe-area-inset-bottom)).

---

CONTEÚDO DOS 30 DIAS DO PROTOCOLO:

SEMANA 1 — RESET DO CORTISOL (Días 1-7)

Día 1 — "El primer paso"

Alimentación: Desayuno con proteína dentro de los primeros 30 minutos de despertar. Ejemplo: 2 huevos + aguacate + café sin azúcar.

Hábito: Cuando te despiertes, antes de ver el celular, respira profundo 5 veces con los ojos cerrados. Solo 5 respiraciones.

Horarios: Desayuno 7-8am | Almuerzo 12-1pm | Cena 6-7pm

Día 2 — "Elimina el pico de cortisol matutino"

Alimentación: Evita el azúcar en el desayuno. Nada de jugos, cereales o pan dulce por ahora. Proteína + grasa buena.

Hábito: Sal a caminar 10 minutos después del desayuno. No tiene que ser ejercicio — solo caminar.

Horarios: Desayuno 7-8am | Almuerzo 12-1pm | Cena antes de las 7pm

Día 3 — "Hidratación hormonal"

Alimentación: Toma un vaso de agua con una pizca de sal del Himalaya al despertar, antes del café. Hidrata las glándulas suprarrenales.

Hábito: Reduce el café a máximo 1 taza, antes del mediodía. El café después de las 2pm eleva el cortisol de la tarde.

Horarios: Agua con sal al despertar | Desayuno 7-8am | Sin café después de las 2pm

Día 4 — "Alimenta tu sistema nervioso"

Alimentación: Incluye magnesio en la cena: chocolate negro +70%, espinacas, semillas de calabaza o almendras.

Hábito: 10 minutos sin pantalla antes de dormir. El cortisol nocturno se dispara con luz azul.

Horarios: Cena con magnesio 6-7pm | Apagar pantallas 9pm

Día 5 — "Antiinflamatorio natural"

Alimentación: Agrega cúrcuma + pimienta negra a una comida de hoy. En huevo, arroz, sopa o lo que prepares.

Hábito: Anota 3 cosas que salieron bien hoy antes de dormir. El cerebro en gratitud baja el cortisol nocturno.

Horarios: Cúrcuma en el almuerzo o cena | Diario de gratitud antes de dormir

Día 6 — "Descanso activo"

Alimentación: Día de comidas más simples — arroz, pollo, verduras al vapor. Dale un descanso al sistema digestivo.

Hábito: Toma un baño tibio por la noche. La caída de temperatura corporal señala al cuerpo que es hora de bajar el cortisol.

Horarios: Comidas ligeras | Baño tibio 8-9pm

Día 7 — "Primera semana completada"

Alimentación: Día libre dentro de lo razonable. Come algo que disfrutes sin culpa — el cortisol del estrés por la dieta es peor que el alimento en sí.

Hábito: Revisa cómo te sientes comparado al día 1. Escribe una palabra que describa cómo está tu energía ahora.

Horarios: Flexible — escucha tu cuerpo hoy

SEMANA 2 — ESTABILIZACIÓN DE INSULINA (Días 8-14)

Día 8 — "Orden de los alimentos"

Alimentación: Come siempre en este orden: verduras primero, proteína segundo, carbohidratos al final. Reduce el pico de glucosa hasta 73%.

Hábito: Espera 20 minutos antes de repetir el plato. La saciedad tarda en llegar.

Horarios: Mantén los horarios de la semana 1

Día 9 — "El desayuno que estabiliza"

Alimentación: Desayuno salado hoy. Proteína + grasa + fibra. Sin frutas solas, sin avena con azúcar.

Hábito: Después del almuerzo, camina 5-10 minutos. Baja la glucosa postprandial de forma natural.

Horarios: Desayuno antes de las 9am obligatorio

Día 10 — "Snacks inteligentes"

Alimentación: Si tienes hambre entre comidas: nueces, queso, huevo duro o aguacate. Evita frutas solas o galletas.

Hábito: Nota a qué hora del día sientes más ansiedad por dulce. Esa hora es la señal de tu pico de insulina.

Horarios: Snack si es necesario: a las 10am o 4pm — nunca después de las 7pm

Día 11 — "Fibra como aliada"

Alimentación: Agrega una ración de vegetales verdes en cada comida principal. Brócoli, espinaca, acelga, chayote, ejotes.

Hábito: Mastica más lento. 20 masticadas por bocado activa las enzimas que regulan la insulina.

Horarios: Vegetales verdes en almuerzo y cena obligatorio

Día 12 — "Proteína en cada comida"

Alimentación: Ninguna comida sin proteína. Huevo, pollo, pescado, legumbres, queso. La proteína es el ancla de la glucosa.

Hábito: Duerme mínimo 7 horas esta noche. Una noche mal dormida eleva la insulina al día siguiente como si hubieras comido azúcar.

Horarios: Cena con proteína antes de las 7:30pm

Día 13 — "Intermitente suave"

Alimentación: Deja pasar 12 horas entre la cena y el desayuno. Si cenas a las 7pm, desayuna a las 7am. Nada más — no es ayuno extremo.

Hábito: Sin snacks después de cenar. El hígado necesita ese tiempo para limpiar.

Horarios: Ventana de 12 horas entre cena y desayuno

Día 14 — "Dos semanas"

Alimentación: Repite tu desayuno favorito de la semana pasada — el que más te gustó y te dejó con energía.

Hábito: Pésate si quieres, pero observa también: ¿cómo está el inchazo? ¿la energía? ¿el sueño? El peso es solo uno de los indicadores.

Horarios: Flexible con continuidad

SEMANA 3 — SOPORTE A ESTRÓGENO Y TIROIDES (Días 15-21)

Día 15 — "Hígado y estrógeno"

Alimentación: Verduras crucíferas hoy: brócoli, coliflor, col, rábano. Ayudan al hígado a procesar el exceso de estrógeno.

Hábito: Reduce el alcohol esta semana si lo consumes. El hígado ocupa energía para metabolizar alcohol — y deja de procesar estrógeno.

Horarios: Crucíferas en almuerzo o cena

Día 16 — "Yodo y tiroides"

Alimentación: Incluye alimentos con yodo natural: huevo, mariscos, lácteos o algas (si consigues). La tiroides los necesita para funcionar.

Hábito: Revisa si tomas algún medicamento que interfiera con la tiroides (habla con tu médico si tienes dudas).

Horarios: Alimento con yodo en cualquier comida

Día 17 — "Selenio para activar T3"

Alimentación: Come 2-3 nueces de Brasil hoy. Son la fuente más densa de selenio — activa la conversión de T4 a T3 (la tiroides activa).

Hábito: Evita el frío extremo en el cuello esta semana — la tiroides es sensible.

Horarios: Nueces de Brasil como snack de la mañana

Día 18 — "Fibra y estrógeno"

Alimentación: Semillas de linaza molida: 1 cucharada en el desayuno. Las ligninas de la linaza ayudan a eliminar el estrógeno excedente.

Hábito: Toma agua suficiente hoy — el estrógeno se elimina por orina y heces. Sin hidratación, se recircula.

Horarios: Linaza en desayuno cada mañana desde hoy

Día 19 — "Zinc para hormonas"

Alimentación: Fuentes de zinc hoy: carne roja magra, semillas de calabaza, legumbres. El zinc es cofactor de más de 300 reacciones hormonales.

Hábito: 5 minutos de sol directo en brazos o piernas hoy. La vitamina D regula el estrógeno y la tiroides.

Horarios: Proteína con zinc en almuerzo

Día 20 — "Antiinflamatorio profundo"

Alimentación: Omega 3 hoy: salmón, sardinas, semillas de chía o nueces de Castilla. Reduce la inflamación que bloquea los receptores hormonales.

Hábito: Antes de dormir: estira suavemente el cuello y los hombros por 3 minutos. El estrés se acumula ahí y afecta la tiroides.

Horarios: Omega 3 en almuerzo o cena

Día 21 — "Tres semanas"

Alimentación: Día de integración — combina todo lo de las últimas 3 semanas en un día de comidas que se sientan bien y sostenibles.

Hábito: Anota 3 cambios que has notado en tu cuerpo desde el día 1. Pueden ser pequeños — el sueño, la energía, el inchazo, el humor.

Horarios: Flexible

SEMANA 4 — LEPTINA Y CONSOLIDACIÓN (Días 22-30)

Día 22 — "Restaurar la saciedad"

Alimentación: Come despacio y sin distracciones en al menos una comida de hoy. La leptina necesita que el cerebro "escuche" las señales del cuerpo.

Hábito: Apaga la televisión o el celular durante el almuerzo o la cena hoy.

Horarios: Una comida sin pantalla obligatorio

Día 23 — "Sueño y leptina"

Alimentación: Cena ligera y temprana hoy — antes de las 7pm. La leptina se produce principalmente entre las 10pm y las 2am.

Hábito: En cama antes de las 10:30pm esta noche. No negociable para la leptina.

Horarios: Cena antes de las 7pm | Dormir antes de las 10:30pm

Día 24 — "Proteína y saciedad"

Alimentación: Desayuno con al menos 25g de proteína. Calcula: 3 huevos = ~18g + 100g de queso fresco = ~11g. La proteína es el mayor activador de la leptina.

Hábito: Nota si hoy sientes más saciedad natural entre comidas comparado a las semanas anteriores.

Horarios: Desayuno proteico antes de las 8:30am

Día 25 — "Movimiento suave"

Alimentación: Día normal del protocolo.

Hábito: Caminata de 20-30 minutos a ritmo moderado. No intenso — el ejercicio suave activa la sensibilidad a la leptina sin estresar el cortisol.

Horarios: Caminata después del almuerzo o antes de las 6pm

Día 26 — "Reducir el azúcar inflamatorio"

Alimentación: Hoy: cero azúcar añadida. Lee las etiquetas — el azúcar se esconde en salsas, yogures, panes y jugos "naturales".

Hábito: Si sientes ansiedad por dulce hoy, come una fruta entera con mantequilla de maní. La combinación frena el pico.

Horarios: Sin azúcar añadida en ninguna comida

Día 27 — "Consolidación hormonal"

Alimentación: Combina los aprendizajes: proteína + fibra + grasa buena en cada comida. Esa fórmula trabaja para los 5 hormonas a la vez.

Hábito: Escribe tu rutina de alimentación ideal para mantener después del día 30. Tu protocolo personalizado.

Horarios: Tus horarios elegidos — mantén consistencia

Día 28 — "Preparar la vida después del protocolo"

Alimentación: Haz una comida que disfrutes profundamente — sin culpa, con conciencia. Aprender a comer bien no es privarse.

Hábito: Identifica el hábito del protocolo que más impacto tuvo en cómo te sientes. Ese es el que más importa mantener.

Horarios: Flexible con conciencia

Día 29 — "Casi ahí"

Alimentación: Repite la comida del día 1 — el mismo desayuno de proteína. ¿Se siente diferente ahora?

Hábito: Compara cómo te sientes hoy vs el día 1. Energía, inchazo, sueño, humor, relación con la comida.

Horarios: Tus horarios optimizados

Día 30 — "Has llegado"

Alimentación: El desayuno que más disfrutaste en estos 30 días. Lo que tu cuerpo pide.

Hábito: Escribe una carta corta a ti misma sobre lo que aprendiste de tu cuerpo en estos 30 días. Guárdala.

Horarios: Los tuyos — ya los conoces

---

LISTA DE COMPRAS POR SEMANA:

SEMANA 1 (Cortisol):

Verduras y vegetales: Espinaca, brócoli, aguacate, pepino

Proteínas: Huevos (12), pollo (500g), atún en lata

Frutas: Limones, manzanas verdes

Despensa: Aceite de oliva, sal del Himalaya, cúrcuma, pimienta negra, café (sin azúcar), chocolate negro +70%

Otros: Almendras, semillas de calabaza

SEMANA 2 (Insulina):

Verduras y vegetales: Brócoli, ejotes/judías verdes, chayote, lechuga, tomate

Proteínas: Huevos, pollo, pescado blanco, queso fresco

Frutas: Fresas, arándanos (frutas de bajo índice glucémico)

Despensa: Aceite de oliva, avena sin azúcar, lentejas, frijoles negros

Otros: Nueces de Castilla, mantequilla de maní sin azúcar

SEMANA 3 (Estrógeno + Tiroides):

Verduras y vegetales: Coliflor, col/repollo, rábano, acelga, espinaca

Proteínas: Salmón o sardinas, huevos, mariscos (si es posible)

Frutas: Frutos rojos, naranja (vitamina C para tiroides)

Despensa: Semillas de linaza (moler en casa), semillas de chía, nueces de Brasil

Otros: Algas marinas (si consigues), suplemento de vitamina D (opcional)

SEMANA 4 (Leptina):

Verduras y vegetales: Los favoritos de las semanas anteriores

Proteínas: Fuentes altas en proteína: pollo, huevo, queso cottage, legumbres

Frutas: Frutas enteras (no jugos)

Despensa: Mantequilla de maní sin azúcar, semillas de calabaza, aceite de coco

Otros: Todo lo que ya tienes — esta semana es de consolidación

---

PWA TÉCNICO — CONFIGURACIÓN OBLIGATORIA:

manifest.json:

{

  "name": "[NOMBRE]",

  "short_name": "[NOMBRE]",

  "start_url": "/",

  "display": "standalone",

  "background_color": "#FFFFFF",

  "theme_color": "#2D6A4F",

  "orientation": "portrait",

  "icons": [

    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },

    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }

  ]

}

Service Worker (básico):

- Cache de assets estáticos (CSS, JS, fontes)

- Fallback offline: mostrar página "Sin conexión — tu protocolo estará disponible cuando vuelvas"

- Estratégia: Cache First para assets, Network First para dados do Supabase

SUPABASE — TABELAS NECESSÁRIAS:

1. profiles (já descrita acima)

2. day_completions:

   - id (uuid)

   - user_id (uuid, FK profiles)

   - day_number (int)

   - completed_at (timestamp)

RLS (Row Level Security): ativar em ambas as tabelas — usuária só lê e escreve seus próprios dados.

VARIÁVEIS DE AMBIENTE:

VITE_SUPABASE_URL=[sua URL do Supabase]

VITE_SUPABASE_ANON_KEY=[sua chave anon do Supabase]

VARIÁVEIS GLOBAIS NO CÓDIGO:

const PRODUCT_NAME = "[NOMBRE]"

const UPGRADE_URL = "[URL_CHECKOUT_OTO1]"

const TELEGRAM_URL = "[URL_GRUPO_TELEGRAM]"

const SUPPORT_EMAIL = "[EMAIL_SUPORTE]"

Stack: React + TypeScript + Tailwind CSS + Supabase.

Organizar em componentes por tela.

Código limpo, comentado em inglês.

Todas as rotas protegidas (redirect para login se não autenticado).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://vitaprotocol-app.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/406f72f9-2b8a-4fad-9a19-797d2b4a6911).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
