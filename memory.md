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
