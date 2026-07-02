// Los 5 pilares diarios del protocolo. Cada paso tiene texto corto,
// una explicación "¿Por qué esto?" y un comentario de Camila (validación científica).
export type StepKey = "food" | "habit" | "movement" | "sleep" | "water";

export interface StepContent {
  text: string;
  why: string;
  camila: string;
}

export interface DaySteps {
  day: number;
  title: string;
  food: StepContent;
  habit: StepContent;
  movement: StepContent;
  sleep: StepContent;
  water: StepContent;
}

export const STEP_META: Record<StepKey, { label: string; icon: string; color: string }> = {
  food:     { label: "Alimentación", icon: "🥗", color: "#2D6A4F" },
  habit:    { label: "Hábito",       icon: "🌿", color: "#52B788" },
  movement: { label: "Movimiento",   icon: "🚶‍♀️", color: "#40916C" },
  sleep:    { label: "Sueño",        icon: "🌙", color: "#1B4332" },
  water:    { label: "Agua",         icon: "💧", color: "#74C69D" },
};

export const STEP_ORDER: StepKey[] = ["food", "habit", "movement", "sleep", "water"];

// Contenido de los 30 días. Redactado en español neutro, tono acompañante.
export const DAY_STEPS: DaySteps[] = [
  {
    day: 1, title: "El primer paso",
    food:     { text: "Desayuna con proteína en los primeros 30 minutos al despertar.", why: "Hoy priorizamos estabilizar la energía desde el comienzo del día.", camila: "La proteína matutina regula la señal de saciedad de todo el día." },
    habit:    { text: "Antes de tomar el celular, respira profundo 5 veces.", why: "Bajamos los primeros picos de alerta del organismo.", camila: "El cuerpo interpreta las primeras señales de la mañana como orden del día." },
    movement: { text: "Camina 10 minutos, sin apuro, sin objetivo.", why: "El movimiento suave activa el metabolismo sin generar estrés.", camila: "El estímulo suave inicia la secuencia hormonal correcta." },
    sleep:    { text: "Apaga las pantallas 30 minutos antes de acostarte.", why: "La luz de la noche confunde el reloj interno.", camila: "La melatonina se prepara con oscuridad, no con horario." },
    water:    { text: "Un vaso de agua al despertar, antes del café.", why: "Recuperamos la hidratación perdida durante el sueño.", camila: "El primer sorbo del día reactiva las señales internas." },
  },
  {
    day: 2, title: "Reduciendo la alerta",
    food:     { text: "Evita azúcar en el desayuno. Proteína y grasa buena.", why: "Estabilizamos la energía por más horas.", camila: "El pico de azúcar temprano acelera la señal de estrés." },
    habit:    { text: "Sal a caminar 10 minutos después del desayuno.", why: "El sol de la mañana ordena el ritmo interno.", camila: "La luz temprana ajusta el reloj biológico." },
    movement: { text: "Estira brazos y cuello por 3 minutos al despertar.", why: "Liberamos la tensión acumulada durante la noche.", camila: "El cuerpo necesita señales físicas para despertar." },
    sleep:    { text: "Baja las luces de casa al anochecer.", why: "Preparamos al organismo para descansar.", camila: "La transición suave de luz sostiene el ritmo natural." },
    water:    { text: "Toma un vaso de agua entre cada comida.", why: "Sostenemos la hidratación de forma constante.", camila: "El agua distribuida es más efectiva que la concentrada." },
  },
  {
    day: 3, title: "Hidratación profunda",
    food:     { text: "Un vaso de agua con una pizca de sal al despertar.", why: "Reponemos los minerales que el cuerpo pide en la mañana.", camila: "Los minerales sostienen la respuesta hormonal del día." },
    habit:    { text: "Máximo una taza de café, antes del mediodía.", why: "Cuidamos los picos de alerta de la tarde.", camila: "El café tardío interfiere con la secuencia del sueño." },
    movement: { text: "5 minutos de estiramientos suaves antes del almuerzo.", why: "El movimiento intermedio mejora la circulación.", camila: "Las pausas activas reordenan la respuesta corporal." },
    sleep:    { text: "Escribe una preocupación pendiente antes de dormir.", why: "Sacamos del cuerpo lo que no necesita cargar.", camila: "La escritura reduce la actividad cerebral nocturna." },
    water:    { text: "2 litros de agua repartidos durante el día.", why: "Ayudamos al cuerpo a eliminar lo que ya no le sirve.", camila: "La hidratación regular mantiene el equilibrio interno." },
  },
  {
    day: 4, title: "Alimentando el sistema nervioso",
    food:     { text: "Incluye magnesio en la cena: hojas verdes, semillas o chocolate 70%+.", why: "El cuerpo necesita minerales para calmar por la noche.", camila: "El magnesio participa en la relajación muscular y nerviosa." },
    habit:    { text: "10 minutos sin pantalla antes de dormir.", why: "Damos espacio al organismo para bajar el ritmo.", camila: "El descanso auténtico empieza antes de acostarse." },
    movement: { text: "Estira piernas y espalda por 5 minutos antes de dormir.", why: "Liberamos las tensiones del día.", camila: "El cuerpo suelto entra más rápido en descanso profundo." },
    sleep:    { text: "Acuéstate a la misma hora de ayer.", why: "El ritmo se construye con repetición.", camila: "La regularidad supera a la duración total del sueño." },
    water:    { text: "Última hidratación 2 horas antes de dormir.", why: "Evitamos interrupciones nocturnas.", camila: "El sueño continuo repara más que el fragmentado." },
  },
  {
    day: 5, title: "Antiinflamatorio natural",
    food:     { text: "Agrega cúrcuma con pimienta a una comida de hoy.", why: "Ayudamos al cuerpo a bajar la inflamación silenciosa.", camila: "La pimienta multiplica la absorción de la cúrcuma." },
    habit:    { text: "Anota 3 cosas que salieron bien hoy.", why: "El foco positivo baja las señales de alerta.", camila: "La gratitud modula la respuesta al estrés." },
    movement: { text: "Camina 15 minutos al aire libre.", why: "Sumamos oxígeno y luz natural al día.", camila: "El aire libre regula varios sistemas a la vez." },
    sleep:    { text: "Habitación oscura y fresca esta noche.", why: "El descanso profundo pide condiciones mínimas.", camila: "La temperatura ideal para dormir está entre 18 y 20°C." },
    water:    { text: "Sustituye una bebida azucarada por agua o té sin azúcar.", why: "Reducimos las señales inflamatorias.", camila: "El azúcar líquido actúa más rápido que el sólido." },
  },
  {
    day: 6, title: "Descanso activo",
    food:     { text: "Comidas simples hoy: arroz, proteína, verduras al vapor.", why: "Le damos un respiro al sistema digestivo.", camila: "La digestión ligera libera energía para otros procesos." },
    habit:    { text: "Toma un baño tibio por la noche.", why: "La bajada de temperatura corporal favorece el sueño.", camila: "El descenso térmico dispara la señal de dormir." },
    movement: { text: "Elige una caminata larga o descanso completo. Escucha tu cuerpo.", why: "El movimiento no es obligatorio, la escucha sí.", camila: "El descanso también es parte activa del protocolo." },
    sleep:    { text: "Ve a la cama 30 minutos antes que ayer.", why: "Recuperamos horas de descanso profundo.", camila: "Cada 30 minutos extra mejora la reparación celular." },
    water:    { text: "Un vaso de agua con limón al despertar.", why: "Activamos suavemente el hígado desde el inicio.", camila: "El limón aporta vitamina C que apoya el metabolismo." },
  },
  {
    day: 7, title: "Primera semana concluida",
    food:     { text: "Come algo que disfrutes, con conciencia y sin culpa.", why: "El equilibrio se construye disfrutando el proceso.", camila: "La culpa alimentaria genera más desajuste que el alimento en sí." },
    habit:    { text: "Compara cómo te sientes hoy con el Día 1. Escribe una palabra.", why: "Registramos lo que el cuerpo ya está cambiando.", camila: "Las señales corporales aparecen antes que los cambios visibles." },
    movement: { text: "Movimiento libre 15 minutos: baila, camina, estira.", why: "El cuerpo pide moverse a su manera hoy.", camila: "El movimiento elegido es sostenido más tiempo." },
    sleep:    { text: "Duerme sin alarma si es posible.", why: "Escuchamos cuánto descanso pide el organismo.", camila: "El sueño espontáneo indica la verdadera necesidad." },
    water:    { text: "Mantén el ritmo de agua constante hoy.", why: "La consistencia es el motor del protocolo.", camila: "Los pequeños hábitos repetidos son los que transforman." },
  },
  {
    day: 8, title: "Orden en las comidas",
    food:     { text: "Empieza cada comida con verduras. Luego proteína. Al final carbohidratos.", why: "Reducimos las subidas rápidas de energía.", camila: "El orden puede bajar hasta 73% el pico de glucosa." },
    habit:    { text: "Espera 20 minutos antes de repetir plato.", why: "El cuerpo necesita tiempo para reconocer saciedad.", camila: "La señal de saciedad tarda entre 15 y 20 minutos en llegar." },
    movement: { text: "Camina 5 minutos después del almuerzo.", why: "Ayudamos al cuerpo a asimilar la comida.", camila: "El movimiento post-comida mejora la respuesta metabólica." },
    sleep:    { text: "Última comida al menos 3 horas antes de acostarte.", why: "El sueño reparador no coexiste con la digestión.", camila: "La digestión nocturna interrumpe el descanso profundo." },
    water:    { text: "Un vaso de agua 30 minutos antes de cada comida.", why: "Preparamos el sistema digestivo.", camila: "La hidratación previa mejora la digestión y la saciedad." },
  },
  {
    day: 9, title: "El desayuno que estabiliza",
    food:     { text: "Desayuno salado: proteína + grasa + fibra. Sin fruta sola.", why: "Sostenemos la energía por más horas.", camila: "La fruta sola en ayunas produce un pico rápido de energía." },
    habit:    { text: "Come sentada, sin pantalla, durante 10 minutos.", why: "La atención plena mejora la digestión.", camila: "Comer con atención activa las enzimas necesarias." },
    movement: { text: "Sube escaleras 3 veces hoy si puedes.", why: "El esfuerzo corto activa músculos grandes.", camila: "Los ejercicios breves e intensos ordenan el metabolismo." },
    sleep:    { text: "Cierra el día con 3 respiraciones profundas.", why: "Preparamos al cuerpo para descansar.", camila: "La respiración lenta activa el sistema de reposo." },
    water:    { text: "Agua a temperatura ambiente hoy.", why: "El cuerpo la absorbe con menos esfuerzo.", camila: "El agua muy fría contrae el sistema digestivo." },
  },
  {
    day: 10, title: "Los momentos entre comidas",
    food:     { text: "Si hay hambre entre comidas: nueces, huevo duro o aguacate.", why: "Elegimos alimentos que sostienen energía real.", camila: "Los alimentos densos calman el hambre sin generar picos." },
    habit:    { text: "Observa a qué hora aparece más ansiedad por dulce.", why: "Escuchamos el mensaje que envía tu cuerpo.", camila: "El deseo de dulce en horarios fijos indica un patrón hormonal." },
    movement: { text: "Camina 20 minutos hoy en dos tandas de 10.", why: "El movimiento repartido es más sostenible.", camila: "Las caminatas cortas se acumulan como una larga." },
    sleep:    { text: "Sin cafeína después de las 2pm.", why: "Cuidamos la calidad del sueño de esta noche.", camila: "La cafeína dura hasta 8 horas activa en el cuerpo." },
    water:    { text: "Reemplaza una bebida por infusión relajante en la tarde.", why: "Bajamos las señales de alerta acumuladas.", camila: "Las infusiones aportan agua e ingredientes calmantes." },
  },
  {
    day: 11, title: "Fibra como aliada",
    food:     { text: "Verduras verdes en cada comida principal.", why: "Alimentamos la microbiota intestinal.", camila: "La fibra vegetal regula varios sistemas hormonales a la vez." },
    habit:    { text: "Mastica 20 veces cada bocado.", why: "Activamos las enzimas digestivas.", camila: "La masticación es la primera fase de la digestión." },
    movement: { text: "Estira todo el cuerpo por 5 minutos al levantarte.", why: "Abrimos el cuerpo para el día que viene.", camila: "El estiramiento matutino mejora la postura completa." },
    sleep:    { text: "Anota mañana antes de acostarte lo que quieres hacer.", why: "Descargamos la mente antes del descanso.", camila: "La planificación reduce la actividad mental nocturna." },
    water:    { text: "Ten siempre una botella visible cerca.", why: "Lo que vemos, lo bebemos.", camila: "La disponibilidad visual duplica el consumo diario." },
  },
  {
    day: 12, title: "Proteína en cada comida",
    food:     { text: "Ninguna comida sin proteína hoy.", why: "La proteína es el ancla de tu energía estable.", camila: "La proteína sostiene la señal de saciedad varias horas." },
    habit:    { text: "Duerme al menos 7 horas esta noche.", why: "Recuperamos las horas que faltan para reparar.", camila: "Una mala noche altera la respuesta al azúcar del día siguiente." },
    movement: { text: "10 sentadillas suaves antes del almuerzo.", why: "Activamos los músculos grandes del cuerpo.", camila: "Las piernas fuertes mejoran el metabolismo general." },
    sleep:    { text: "Cama solo para dormir hoy: sin celular, sin trabajo.", why: "El cerebro asocia el lugar con el descanso.", camila: "El condicionamiento del espacio mejora la calidad del sueño." },
    water:    { text: "Suma un vaso extra hoy si sudaste.", why: "Adaptamos la hidratación a lo que el cuerpo pierde.", camila: "El equilibrio hídrico depende de la actividad del día." },
  },
  {
    day: 13, title: "Ventana de descanso digestivo",
    food:     { text: "12 horas entre cena y desayuno. Si cenas a las 8pm, desayuna a las 8am.", why: "El sistema digestivo descansa y se limpia.", camila: "El ayuno nocturno moderado favorece la reparación celular." },
    habit:    { text: "Sin snacks después de cenar hoy.", why: "El hígado necesita tiempo sin trabajo nuevo.", camila: "La detoxificación hepática ocurre en el ayuno nocturno." },
    movement: { text: "Camina 10 minutos después de cenar.", why: "Ayudamos al cuerpo antes de descansar.", camila: "La caminata post-cena mejora la digestión final." },
    sleep:    { text: "Acuéstate cuando aparezca el primer bostezo.", why: "Ese es tu momento natural de dormir.", camila: "El primer sueño es una ventana de fácil entrada al descanso." },
    water:    { text: "Agua tibia al despertar hoy.", why: "Activamos suavemente el sistema digestivo.", camila: "El agua tibia estimula el movimiento intestinal." },
  },
  {
    day: 14, title: "Dos semanas cumplidas",
    food:     { text: "Repite tu comida favorita de la primera semana.", why: "Reforzamos lo que ya te funcionó.", camila: "Los patrones repetidos se consolidan como hábito." },
    habit:    { text: "Observa: hinchazón, energía, sueño. ¿Qué cambió?", why: "El progreso real está en las señales, no solo en la balanza.", camila: "Los indicadores corporales son más precisos que el peso." },
    movement: { text: "Elige tu movimiento favorito hoy y hazlo 20 minutos.", why: "Lo que disfrutas, lo sostienes.", camila: "El placer es un motor más fuerte que la disciplina." },
    sleep:    { text: "Ritual de cierre del día: 3 respiraciones lentas.", why: "Marcamos el paso del día activo al descanso.", camila: "Los rituales previos condicionan el sueño." },
    water:    { text: "Mantén el ritmo hídrico consistente.", why: "La constancia es lo que da resultados.", camila: "El sistema hídrico se equilibra con el hábito diario." },
  },
  {
    day: 15, title: "Apoyando al hígado",
    food:     { text: "Verduras crucíferas hoy: brócoli, coliflor, col o rábano.", why: "Ayudamos al hígado a procesar excedentes hormonales.", camila: "Las crucíferas contienen compuestos que apoyan la detoxificación." },
    habit:    { text: "Reduce el alcohol esta semana.", why: "El hígado libera capacidad para otros procesos.", camila: "El alcohol compite con el metabolismo hormonal." },
    movement: { text: "Camina 25 minutos hoy, si es posible al aire libre.", why: "El movimiento sostenido activa el drenaje corporal.", camila: "La caminata moderada estimula el sistema linfático." },
    sleep:    { text: "Ventila la habitación antes de dormir.", why: "El aire fresco mejora el descanso.", camila: "El oxígeno adecuado favorece el sueño profundo." },
    water:    { text: "Té verde en la mañana en lugar de un café.", why: "Suave, hidratante y con antioxidantes.", camila: "El té verde aporta compuestos que apoyan al hígado." },
  },
  {
    day: 16, title: "Nutriendo la tiroides",
    food:     { text: "Alimentos con yodo natural: huevo, mariscos o algas.", why: "La tiroides necesita minerales específicos para funcionar.", camila: "El yodo es fundamental para la producción de hormonas tiroideas." },
    habit:    { text: "Evita el frío extremo en el cuello esta semana.", why: "La tiroides es sensible a la temperatura.", camila: "La zona del cuello concentra glándulas hormonales importantes." },
    movement: { text: "Movimiento moderado hoy, sin llegar al agotamiento.", why: "El ejercicio excesivo puede afectar la tiroides.", camila: "La intensidad debe adaptarse al estado hormonal actual." },
    sleep:    { text: "8 horas de sueño hoy si es posible.", why: "La tiroides se regula durante el descanso.", camila: "El sueño profundo optimiza las funciones metabólicas." },
    water:    { text: "Bebe agua a lo largo del día sin esperar sed.", why: "La sed ya es una señal de deshidratación.", camila: "La hidratación anticipada es más efectiva." },
  },
  {
    day: 17, title: "Activando la energía tiroidea",
    food:     { text: "2 o 3 nueces de Brasil hoy.", why: "Aportan selenio, clave para activar la energía.", camila: "Una sola nuez cubre el requerimiento diario de selenio." },
    habit:    { text: "Tómate una pausa consciente al mediodía.", why: "Prevenimos la caída de energía de la tarde.", camila: "Las pausas planeadas previenen el agotamiento." },
    movement: { text: "Movimiento breve pero enérgico: 5 minutos con música.", why: "Activamos el metabolismo de forma alegre.", camila: "El movimiento con música mejora la respuesta hormonal." },
    sleep:    { text: "Estira cuello y hombros antes de dormir.", why: "Liberamos tensión de la zona tiroidea.", camila: "Las áreas contraídas afectan órganos cercanos." },
    water:    { text: "Agua con una pizca de sal después de sudar.", why: "Reponemos los minerales perdidos.", camila: "El equilibrio mineral acompaña a la hidratación." },
  },
  {
    day: 18, title: "Fibra que limpia",
    food:     { text: "1 cucharada de linaza molida en el desayuno.", why: "Ayudamos al cuerpo a eliminar excedentes hormonales.", camila: "Las ligninas de la linaza favorecen la eliminación de estrógeno." },
    habit:    { text: "Hidrátate más de lo habitual hoy.", why: "La eliminación necesita mucha agua.", camila: "Sin hidratación, lo eliminado se reabsorbe." },
    movement: { text: "Camina 30 minutos hoy, en el momento que mejor te venga.", why: "El movimiento activa el drenaje del cuerpo.", camila: "La caminata prolongada apoya la eliminación natural." },
    sleep:    { text: "Duerme del lado izquierdo si puedes.", why: "Favorece el drenaje digestivo.", camila: "La posición corporal afecta órganos internos." },
    water:    { text: "2,5 litros hoy si es posible.", why: "Ayudamos a eliminar lo que ya no sirve.", camila: "El aumento moderado sostenido apoya la detoxificación." },
  },
  {
    day: 19, title: "Minerales que activan",
    food:     { text: "Fuentes de zinc: semillas de calabaza, carne magra o legumbres.", why: "El zinc participa en cientos de reacciones hormonales.", camila: "El zinc es cofactor esencial en múltiples sistemas." },
    habit:    { text: "5 minutos de sol directo en brazos o piernas.", why: "La vitamina D regula varias hormonas.", camila: "El sol directo produce la vitamina D activa." },
    movement: { text: "Camina 15 minutos al sol.", why: "Sumamos movimiento y vitamina D.", camila: "Combinar estímulos multiplica los beneficios." },
    sleep:    { text: "Habitación completamente oscura hoy.", why: "La melatonina se produce solo en oscuridad total.", camila: "Incluso una luz pequeña reduce la producción de melatonina." },
    water:    { text: "Bebe un vaso al llegar a casa por la tarde.", why: "Reponemos lo que se perdió durante el día.", camila: "La hidratación de la tarde previene el agotamiento nocturno." },
  },
  {
    day: 20, title: "Reduciendo la inflamación",
    food:     { text: "Omega 3 hoy: salmón, sardinas, chía o nueces.", why: "Bajamos la inflamación que bloquea los receptores hormonales.", camila: "El omega 3 modula la respuesta inflamatoria del cuerpo." },
    habit:    { text: "Antes de dormir, estira cuello y hombros 3 minutos.", why: "Liberamos el estrés acumulado del día.", camila: "La tensión física sostenida se traduce en tensión hormonal." },
    movement: { text: "Yoga suave o estiramientos por 15 minutos.", why: "El movimiento lento reduce la inflamación general.", camila: "Los estímulos suaves activan la reparación corporal." },
    sleep:    { text: "Anota lo que agradeces del día antes de acostarte.", why: "Cerramos el día en tono positivo.", camila: "La gratitud modula la respuesta al estrés nocturno." },
    water:    { text: "Infusión de manzanilla o menta después de cenar.", why: "Cierre calmante para el sistema digestivo.", camila: "Las infusiones digestivas favorecen la relajación." },
  },
  {
    day: 21, title: "Tres semanas de camino",
    food:     { text: "Integra lo aprendido: proteína, fibra y grasa buena en una comida.", why: "Consolidamos la fórmula que sostiene el equilibrio.", camila: "Esta combinación trabaja para varias hormonas a la vez." },
    habit:    { text: "Anota 3 cambios que notaste desde el Día 1.", why: "Registramos lo que ya es diferente.", camila: "Reconocer avances refuerza la continuidad del hábito." },
    movement: { text: "Elige tu forma favorita de moverte y hazlo 25 minutos.", why: "El disfrute sostiene el ritmo.", camila: "El movimiento placentero se mantiene en el tiempo." },
    sleep:    { text: "Duerme sin alarma hoy si puedes.", why: "Vemos qué tanto descanso pide el cuerpo.", camila: "El sueño espontáneo indica la recuperación real." },
    water:    { text: "Mantén el ritmo hídrico que ya funcionó.", why: "La consistencia es lo que consolida.", camila: "Los hábitos hídricos se instalan con la repetición diaria." },
  },
  {
    day: 22, title: "Escuchando la saciedad",
    food:     { text: "Come al menos una comida sin distracciones.", why: "El cerebro necesita registrar la comida para saciarse.", camila: "La leptina requiere atención plena para activarse bien." },
    habit:    { text: "Apaga TV o celular durante una comida hoy.", why: "Reconectamos con las señales del cuerpo.", camila: "Comer con distracción reduce la señal de saciedad." },
    movement: { text: "Camina 15 minutos concentrada solo en el caminar.", why: "El movimiento consciente calma el sistema nervioso.", camila: "La atención en el cuerpo mejora la percepción interna." },
    sleep:    { text: "Cena antes de las 8pm hoy.", why: "El sueño profundo pide digestión terminada.", camila: "La leptina se produce mejor con estómago liviano." },
    water:    { text: "Un vaso de agua entre bocado y bocado.", why: "Ralentizamos el ritmo natural de la comida.", camila: "La velocidad al comer influye en la saciedad." },
  },
  {
    day: 23, title: "Sueño que regula",
    food:     { text: "Cena ligera y temprana hoy: antes de las 7pm.", why: "El sueño reparador necesita digestión ligera.", camila: "La leptina se produce entre las 10pm y las 2am." },
    habit:    { text: "En cama antes de las 10:30pm.", why: "Aprovechamos las horas más reparadoras.", camila: "El sueño antes de medianoche tiene mayor efecto hormonal." },
    movement: { text: "Movimiento suave en la tarde, no en la noche.", why: "El ejercicio tardío eleva la alerta.", camila: "El cortisol tarda varias horas en bajar tras el ejercicio." },
    sleep:    { text: "Rutina previa al sueño: baño, lectura o música calma.", why: "Preparamos al cuerpo con señales de cierre.", camila: "Las rutinas condicionan la entrada al descanso." },
    water:    { text: "Última hidratación 2 horas antes de dormir.", why: "Evitamos despertares nocturnos.", camila: "El sueño continuo tiene mayor valor reparador." },
  },
  {
    day: 24, title: "Proteína que sacia",
    food:     { text: "Al menos 25g de proteína en el desayuno.", why: "La proteína matutina sostiene la saciedad todo el día.", camila: "La proteína temprana activa la leptina de forma sostenida." },
    habit:    { text: "Nota si hoy sientes más saciedad natural.", why: "El cuerpo ya está respondiendo a las señales correctas.", camila: "La regulación hormonal se refleja en la percepción interna." },
    movement: { text: "20 minutos de caminata a paso vivo.", why: "Mejoramos la sensibilidad a la leptina.", camila: "El movimiento moderado optimiza la respuesta hormonal." },
    sleep:    { text: "Habitación fresca hoy, entre 18 y 20°C.", why: "La temperatura ideal favorece el descanso profundo.", camila: "El sueño reparador ocurre con temperatura baja." },
    water:    { text: "Un vaso de agua antes del desayuno.", why: "Preparamos el sistema para recibir alimento.", camila: "La hidratación previa mejora la digestión inicial." },
  },
  {
    day: 25, title: "Movimiento consciente",
    food:     { text: "Día normal del protocolo: verduras, proteína, buena grasa.", why: "Sostenemos lo que ya está funcionando.", camila: "La constancia consolida los cambios hormonales." },
    habit:    { text: "Elige un solo hábito que quieras mantener para siempre.", why: "El futuro se construye con decisiones pequeñas.", camila: "Un hábito bien instalado supera a diez intentos dispersos." },
    movement: { text: "Caminata de 20 a 30 minutos a ritmo moderado.", why: "Activa el metabolismo sin estresar al cuerpo.", camila: "El movimiento suave regular mejora la sensibilidad hormonal." },
    sleep:    { text: "Duerme mínimo 7 horas hoy.", why: "El descanso es el pilar de todo lo demás.", camila: "El sueño insuficiente altera todas las hormonas del día siguiente." },
    water:    { text: "Ritmo hídrico estable durante todo el día.", why: "Lo que ya funciona, se mantiene.", camila: "Los hábitos consolidados requieren menos esfuerzo." },
  },
  {
    day: 26, title: "Bajando las señales inflamatorias",
    food:     { text: "Cero azúcar añadida hoy. Lee las etiquetas.", why: "Reducimos las señales inflamatorias del día.", camila: "El azúcar se esconde en salsas, yogures y panes." },
    habit:    { text: "Si aparece ansiedad por dulce, come fruta con grasa buena.", why: "La combinación frena el pico.", camila: "La grasa buena modera la absorción del azúcar natural." },
    movement: { text: "Camina 20 minutos después de la comida más grande.", why: "Suavizamos la respuesta del cuerpo al alimento.", camila: "La caminata post-comida reduce el pico glucémico." },
    sleep:    { text: "Sin pantallas la última hora del día.", why: "La luz azul altera la producción de melatonina.", camila: "La oscuridad progresiva prepara el sueño natural." },
    water:    { text: "Sustituye por completo las bebidas azucaradas hoy.", why: "Bajamos la carga inflamatoria diaria.", camila: "Las bebidas dulces son la mayor fuente oculta de azúcar." },
  },
  {
    day: 27, title: "Consolidando lo aprendido",
    food:     { text: "Proteína + fibra + grasa buena en cada comida.", why: "Esta fórmula trabaja para todas las hormonas.", camila: "La combinación completa sostiene la energía y la saciedad." },
    habit:    { text: "Escribe tu rutina alimentaria ideal para después del Día 30.", why: "Preparamos la continuidad de lo aprendido.", camila: "La planificación transforma la intención en hábito." },
    movement: { text: "Diseña tu semana de movimiento: 3 días, la actividad que amas.", why: "Lo que se planea con placer, se cumple.", camila: "El movimiento agendado tiene mayor tasa de cumplimiento." },
    sleep:    { text: "Define tu hora ideal para dormir de aquí en adelante.", why: "La consistencia horaria vale más que la duración.", camila: "Los horarios estables entrenan al reloj biológico." },
    water:    { text: "Consolida el ritmo hídrico que ya elegiste.", why: "Convertimos el hábito temporal en permanente.", camila: "Los hábitos hídricos se automatizan tras 3 semanas." },
  },
  {
    day: 28, title: "Preparando la continuidad",
    food:     { text: "Haz una comida que ames, con plena conciencia.", why: "Aprender a comer bien no es privarse.", camila: "El disfrute consciente es parte del equilibrio real." },
    habit:    { text: "Identifica el hábito que más impacto tuvo.", why: "Ese es el que vale la pena sostener.", camila: "Los hábitos de mayor impacto son los que consolidan resultados." },
    movement: { text: "Movimiento libre 20 minutos: lo que el cuerpo pida.", why: "La escucha corporal se afina con el tiempo.", camila: "El cuerpo entrenado sabe lo que necesita." },
    sleep:    { text: "Duerme siguiendo el horario que ya definiste.", why: "Practicamos el ritmo que sostendremos.", camila: "El ensayo del hábito futuro facilita su continuidad." },
    water:    { text: "Ritmo hídrico natural, sin forzar.", why: "El cuerpo ya reconoce lo que necesita.", camila: "El hábito bien instalado se percibe como propio." },
  },
  {
    day: 29, title: "Casi cumplido",
    food:     { text: "Repite la comida del Día 1. ¿Se siente diferente ahora?", why: "Registramos hasta dónde llegó tu cuerpo.", camila: "La misma comida en cuerpos diferentes produce respuestas distintas." },
    habit:    { text: "Compara: energía, sueño, humor y hinchazón hoy vs. Día 1.", why: "Reconocemos lo que ya es diferente.", camila: "Los cambios corporales se registran en múltiples dimensiones." },
    movement: { text: "20 minutos de tu forma favorita de moverte.", why: "Celebramos lo que el cuerpo puede hoy.", camila: "El cuerpo entrenado responde mejor a cualquier estímulo." },
    sleep:    { text: "Ritual completo de cierre del día.", why: "Reafirmamos el patrón para el futuro.", camila: "Los rituales sostenidos se convierten en identidad." },
    water:    { text: "Mantén tu ritmo, ya es parte de ti.", why: "Lo que hoy es esfuerzo, mañana será natural.", camila: "El hábito consolidado libera energía para otras áreas." },
  },
  {
    day: 30, title: "Has llegado",
    food:     { text: "El desayuno que más disfrutaste en estos 30 días.", why: "Cerramos con lo que tu cuerpo ya pide.", camila: "El cuerpo aprende a preferir lo que le sienta bien." },
    habit:    { text: "Escribe una carta a ti misma sobre lo que aprendiste.", why: "Guardamos la sabiduría de este proceso.", camila: "La escritura fija los aprendizajes de manera duradera." },
    movement: { text: "Elige cómo quieres moverte hoy. Sin regla.", why: "Cerramos con libertad plena.", camila: "El cuerpo entrenado puede confiar en sus propias señales." },
    sleep:    { text: "Duerme como una persona que ya conoce su ritmo.", why: "El descanso es parte de tu vida ahora.", camila: "El sueño regular es el pilar del equilibrio a largo plazo." },
    water:    { text: "El agua ya es una compañera diaria.", why: "Lo que empezó como esfuerzo ahora es parte tuya.", camila: "Los hábitos integrados se sostienen sin voluntad activa." },
  },
];
