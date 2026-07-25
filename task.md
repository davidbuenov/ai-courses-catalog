# 📝 Task Register / Registro de Tareas

## 🏗 In Progress / En Curso

*(Ninguna tarea en curso. Mejoras de usabilidad completadas con éxito, pendiente commit).*

## ⏳ Pending / Pendientes (Backlog)

- [ ] Discutir futura migración a un backend serverless (como Supabase o Firebase) para votos globales reales.
- [ ] Ampliar la cobertura de tests a nivel del navegador si es necesario.
- [ ] Curar `data/ai/courses.json`: eliminar la entrada duplicada "Generative AI for Everyone" (detectada durante la verificación de ids del 2026-07-25).
- [ ] Verificación manual en navegador (Tab/Enter en todos los widgets, lector de pantalla) pendiente por parte del usuario antes de dar por cerrado el bloque de accesibilidad.

## ✅ Completed / Completadas

- [x] Adopción de la metodología SDD (copia de plantillas).
- [x] Rellenar `project.config.md` con los metadatos reales del catálogo.
- [x] Crear especificaciones en `docs/SPECIFICATIONS.md`.
- [x] Crear arquitectura técnica en `docs/ARCHITECTURE.md`.
- [x] Crear sistema de diseño en `docs/DESIGN.md`.
- [x] Inicializar memoria técnica en `memory.md`.
- [x] Diseñar e implementar el Dashboard Hub de tema oscuro en `app/index.html` y `app/css/style.css`.
- [x] Desarrollar la interactividad dinámica, ranking popular local, rutas y novedades en `app/js/script.js`.
- [x] Crear scripts multiplataforma `start.cmd`, `stop.cmd`, `start.sh`, `stop.sh` sobre el puerto `8050`.
- [x] Escribir y ejecutar el set de tests unitarios en `tests/test_build.py`.
- [x] Generar el informe final en `walkthrough.md`.
- [x] **(2026-07-25) Usabilidad — modal de ficha:** añadir vista previa de recurso antes de salir al enlace externo, conectada a "Top Picks", "Recently Updated" y el grid de resultados.
- [x] **(2026-07-25) Usabilidad — rename:** "Most Popular" → "Top Picks" con nota aclaratoria (el ranking es local por dispositivo).
- [x] **(2026-07-25) Usabilidad — accesibilidad:** navegación completa por teclado (Tab/Enter/Espacio) en hub, paths, top picks, categorías, tarjetas y modal; foco visible; `aria-modal` y focus trap en el modal.
- [x] **(2026-07-25) Usabilidad — estado en URL:** filtros, orden, "ver todo" y ficha abierta persisten en `location.hash`; compartibles y sobreviven al refresh; botón Atrás cierra el modal.
- [x] **(2026-07-25) Usabilidad — ordenación:** selector de criterio (fecha asc/desc, nombre A–Z/Z–A) en la vista de resultados.
- [x] **(2026-07-25) Usabilidad — "ver más":** botón "View all" en Recently Updated (abre el listado completo) y "Show all paths" en Learning Paths (expande a los 7 grupos de categorías).
- [x] **(2026-07-25) Documentación — versión 2.1.0:** `CHANGELOG.md` actualizado con el bloque de usabilidad bajo `[2.1.0] — 2026-07-25`; `README.md` con nuevas features, sección "Last changes" corregida (faltaban los enlaces a `202606NewEntries.md` y `202607NewEntries.md`) y Claude Code añadido en "Authors".

---

## 🔄 Context Snapshot / Snapshot de Contexto

> **Last update / Última actualización:** 2026-07-25
> **Exact point / Punto exacto:** Bloque de mejoras de usabilidad implementado en `app/` (HTML+CSS+JS); `dist_ai`/`dist_unreal` ya estaban actualizados (build previo confirmado por el usuario, no se ha vuelto a ejecutar `build.py` en esta vuelta). Documentación puesta al día: `CHANGELOG.md` con la versión `2.1.0`, `README.md` con features nuevas, "Last changes" (junio+julio 2026) y Claude Code en "Authors". Ver detalle de decisiones en `memory.md`.
> **Pending / Pendiente:** Probar en navegador real (interacción de teclado, lector de pantalla, `dist_unreal` end-to-end); revisar si `docs/DESIGN.md` debe documentar el nuevo componente modal; confirmar que `dist_ai`/`dist_unreal` reflejan el HTML/JS/CSS actual de `app/` antes de dar por cerrado; commit de todo lo anterior.
> **Next step / Próximo paso:** Pedir al usuario que pruebe en `start.cmd` (localhost:8050) y confirme antes de hacer commit.
