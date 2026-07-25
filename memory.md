# 🧠 Memory & Context: Multi-Catalog Project: AI & Unreal Engine

> **Frontera de uso (Memory vs. Tasks):**
> - `task.md` → progreso **operativo**: checklist de tareas, Snapshot de Contexto (el paso exacto siguiente), y estado de la sesión.
> - `memory.md` → contexto **cualitativo y temático**: conocimiento persistente, decisiones técnicas profundas, lecciones, y el área del producto en foco (no el paso específico).
>
> *Instrucción para la IA: Consulta este archivo al inicio de cada sesión para recuperar el hilo técnico. Actualiza las secciones correspondientes cuando el workflow lo indique (triggers en `/plan`, `/build`, `/test` y gate en `/ship`).*

---

## 🎯 Contexto Activo
- **Estado actual del desarrollo:** Adopción completada de la metodología Spec-Driven Development (SDD). Planificando la transición de la aplicación de catálogos simples hacia un Dashboard/Hub moderno con un tema oscuro futurista (glassmorphism).
- **Foco inmediato:** Diseñar y debatir la solución técnica para el ranking de popularidad sin comprometer la naturaleza estática (Zero-Backend) del proyecto.

## 🏗️ Log de Decisiones Técnicas (ADR Ligero)

- **2026-07-25 - Modal de ficha + accesibilidad + estado en URL:** Se añade una ficha de detalle (`#resource-modal` en `app/index.html`, funciones `abrirFicha`/`cerrarFicha` en `app/js/script.js`) para que "Top Picks" (antes "Most Popular"), "Recently Updated" y el grid de resultados abran una vista previa del recurso en lugar de salir directamente al enlace externo. Decisiones clave:
  - **Id canónico sin cambios:** se mantiene `curso.name.replace(/[^a-zA-Z0-9]/g, '')` para no romper los votos ya guardados en `localStorage` (`cursosVotosIA`); se añade un `Map` (`cursosPorId`) con política *first-wins* + `console.warn` ante colisiones. Se detectó una colisión real y preexistente en `data/ai/courses.json`: la entrada "Generative AI for Everyone" está duplicada literalmente (mismo nombre dos veces); no se ha tocado el dato, queda pendiente de curación.
  - **Reutilización de markup:** el modal reutiliza las clases `.curso-tipo`, `.curso-dificultad`, `.etiqueta-clickable`, `.vote-btn`, `.share-btn` de la tarjeta de resultados en vez de duplicar estilos.
  - **Rename honesto del widget:** "Most Popular" pasa a llamarse "Top Picks" (con nota "Based on your votes and latest additions") porque el ranking solo usa votos locales del dispositivo; para un visitante nuevo mostraba simplemente lo más reciente, duplicando "Recently Updated". La lógica de puntuación no se tocó.
  - **Accesibilidad:** los ítems de sidebar/hub que eran `<div>`/`<span>` con solo `click` pasan a `<button>` nativos (path-item, tag-cloud-item, popular-btn, etiquetas) o a `role="button" + tabindex="0" + keydown Enter/Space` cuando no pueden ser botones (hub cards, recent-card). Foco visible vía `:focus-visible` con los tokens de acento existentes. El modal implementa `aria-modal`, guarda/restaura el foco previo y hace *focus trap* básico con Tab.
  - **Estado en la URL:** los filtros, el orden, "ver todo" y la ficha abierta se serializan en `location.hash` con `URLSearchParams` (multivalor vía parámetros repetidos: `type=`, `cat=`, `diff=`). `pushState` solo ocurre al abrir el modal (así el botón Atrás lo cierra); el resto de cambios usa `replaceState` para no ensuciar el historial. Esto hace las búsquedas/fichas compartibles por URL y persistentes al refrescar.
  - **Nuevas funcionalidades pedidas por el usuario:** selector de orden (`#orden-select`: fecha asc/desc, nombre A–Z/Z–A) en la vista de resultados; botón "View all" en "Recently Updated" que reutiliza esa misma vista de resultados sin filtros; botón "Show all paths" en "Learning Paths" que expande el widget a los 7 grupos de `categories.json` (antes solo mostraba 3 rutas fijas hardcodeadas).
- **2026-07-25 - Versionado y documentación (2.1.0):** El bloque de mejoras de usabilidad (modal, orden, "ver todo", accesibilidad, estado en URL) se etiqueta como versión **2.1.0** en `CHANGELOG.md` (semver: cambio menor, sin romper compatibilidad). Se aprovecha para corregir `README.md`, cuya sección "Last changes" no enlazaba las actualizaciones de catálogo de junio (`202606NewEntries.md`, AI +21/Unreal +10) ni julio (`202607NewEntries.md`, AI +28/Unreal +4) de 2026 — ambas ya existían como ficheros pero no estaban enlazadas. Se añade también Claude Code a la sección "Authors" del README, junto a Google AI Studio.
- **2026-06-15 - Adopción de SDD:** Se integra el framework `dbv-specs-ops` en el repositorio para guiar las fases de desarrollo (Spec -> Plan -> Build -> Test -> Simplify -> Ship).
- **2026-06-15 - Robustez en compilación (build.py):** Se modifica `build.py` para capturar `PermissionError` en `shutil.rmtree` y se habilita `dirs_exist_ok=True` en `shutil.copytree`. Esto evita que el script de compilación falle cuando las carpetas de salida están ocupadas por un servidor de desarrollo local o el explorador de archivos.
- **2026-06-14 - Flujo de curación aislado en claudecowork:** Se ratifica la regla de que el asistente de IA no debe escribir directamente sobre `data/`. Todo el trabajo de curación se ejecuta de manera segura en `claudecowork/` generando archivos intermedios en `salida/` para validación humana antes del volcado final.

## ⚠️ Lecciones Aprendidas / Errores Evitados

- **[Curation / Data Integrity]:** Los archivos de datos (especialmente `aprobados.json` y `merge.py`) pueden sufrir truncamiento o corrupción accidental durante sesiones intensivas. Se debe validar siempre la validez del archivo JSON antes de procesarlo o reescribirlo.
- **[Content Parsing Rules]:** En el catálogo de Unreal, priorizar referencias a la versión estable actual (UE 5.7). Los recursos relacionados con modelos de generación 3D o avatares por IA (ej. TRELLIS) se catalogan en el portal de **IA** como `Tool` en lugar del portal de Unreal.

## 🗺️ Mapa de Relaciones

- **`build.py` (Builder):** Motor de plantillas simple. Lee `app/index.html`, sustituye placeholders con variables del tema y copia `/app` (estáticos) junto con `/data` correspondiente a `/dist_ai` y `/dist_unreal`.
- **`app/js/script.js` (Engine Cliente):** Gestiona la carga de datos JSON, filtrado dinámico por tipo/categoría/dificultad, búsqueda instantánea, votos en LocalStorage y rendering de tarjetas.
- **`claudecowork/merge/merge.py` (Merge & Validate):** Script en Python para fusionar enlaces nuevos aprobados con la base de datos principal, filtrando duplicados por URL/Nombre y validando categorías contra la taxonomía de la aplicación.
