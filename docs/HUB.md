# 🛰️ Este proyecto y el centro de control (dbv-control-center)

Este repo está registrado como proyecto en **dbv-control-center**, el hub que centraliza el
contexto de todos los repos de `github.com/davidbuenov` y lo sirve vía **MCP** en
`https://davidbuenov.com/mcp`. `ai-courses-catalog` es el primer repo piloto que consume el hub
activamente (Fase 4 del hub).

`PROJECT.md` en la raíz de este repo es el contrato que el sync del hub lee para poblar su
catálogo (`status`, `priority`, `last_task`, `stack`). Mantenlo actualizado tú mismo cuando
cambie el estado real del proyecto — el sync no infiere nada que no esté ahí.

## Qué puede hacer un agente que trabaje aquí

Desde cualquier cliente MCP (Claude Code, Claude Desktop, Antigravity…) apuntando a
`https://davidbuenov.com/mcp`:

- **Recuperar contexto al empezar una sesión:** `get_project_context("ai-courses-catalog")`
  devuelve `purpose`, `stack`, `last_task` y las skills asociadas — útil si vienes de otra
  herramienta o de una sesión anterior sin memoria compartida.
- **Ver qué hay pendiente en todo el ecosistema:** `get_pending_tasks()` lista las tareas
  activas de todos los repos registrados, ordenadas por prioridad — no solo las de este repo.
- **Avisar al hub cuando termines algo aquí:** tras actualizar `PROJECT.md` (nuevo `last_task`,
  cambio de `status`, etc.) y comitear/pushear, llama a
  `trigger_sync("ai-courses-catalog")` para que el catálogo del hub refleje el cambio sin
  esperar al sync semanal automático.
- **Comprobar si el catálogo está al día:** `get_sync_status()` — si `stale: true`, los datos
  del hub pueden no reflejar el estado más reciente de git.

## Por qué esto importa (UC5 / UC8 de la spec del hub)

El hub NO escribe nada aquí ni viceversa: la única conexión es que este repo se registra como
dato (vía `PROJECT.md`) y se lee/actualiza vía las tools MCP de arriba. Si `ai-courses-catalog`
deja de estar registrado en `repos.yaml` del hub, simplemente deja de aparecer en el catálogo —
nada en este repo depende de esa relación para funcionar de forma independiente.

> Detalle completo del hub: [dbv-control-center](https://github.com/davidbuenov/dbv-control-center)
> (`docs/SPECIFICATIONS.md`, `docs/ARCHITECTURE.md`).
