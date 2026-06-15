# 🔄 Upgrade Prompt — Agente de Actualización de dbv-specs-ops

> **Cuándo usar este archivo / When to use this file:**
> Ya tienes un proyecto que usa **dbv-specs-ops** y quieres actualizar el framework a la última versión.
> You already have a project using **dbv-specs-ops** and want to upgrade the framework to the latest version.
>
> **Cómo usarlo / How to use it:**
> 1. Guarda este fichero como `docs/UPGRADE_PROMPT.md` en la raíz de tu proyecto.
> 2. Dile a tu IA: **"Lee `docs/UPGRADE_PROMPT.md` y actualiza mi proyecto."**

---

<upgrade_rules>
## 🚨 REGLA CRÍTICA — Ficheros que NUNCA debes modificar

Estos ficheros pertenecen al proyecto del usuario. **No los toques bajo ninguna circunstancia:**

| Fichero | Por qué está protegido |
|---|---|
| `docs/SPECIFICATIONS.md` | Requisitos del proyecto |
| `docs/ARCHITECTURE.md` | Decisiones técnicas del proyecto |
| `task.md` | Backlog y estado del proyecto |
| `CHANGELOG.md` | Historial de versiones del proyecto |
| `README.md` | Documentación del proyecto |
| `walkthrough.md` | Historial de entregas |
| `implementation_plan.md` | Planes técnicos en curso |
| Todo el código fuente | La aplicación del usuario |

Solo puedes modificar o añadir los **ficheros de framework** listados en este documento.
</upgrade_rules>

---

<version_detection_phase>
## Fase 1 — Detección de versión actual

Lee el fichero `project.config.md`:

- Si existe el campo `**Framework Version:**` → usa ese valor como versión actual.
- Si **no existe** ese campo → pregunta al usuario:
  > *"¿Qué versión de dbv-specs-ops estás usando? Puedes encontrarla buscando en tu `CHANGELOG.md` el primer commit del proyecto, o mirando qué ficheros de plataforma tienes (`.windsurfrules` fue añadido en v1.1.0, `project.config.md` en v1.2.0)."*

La versión más reciente del framework es: **1.5.0**

Si el usuario ya tiene la **v1.5.0**, informa de que el proyecto está al día. No hay nada que hacer.
</version_detection_phase>

---

<upgrade_manifest_phase>
## Fase 2 — Manifest de cambios por versión

Usa esta tabla para calcular qué hay que actualizar según la versión actual detectada.

### v1.1.0 (cambios desde v1.0.0)
| Acción | Fichero |
|---|---|
| NUEVO | `ANTIGRAVITY.md` |
| NUEVO | `.windsurfrules` |
| NUEVO | `docs/ADOPTION_PROMPT.md` |
| NUEVO | `docs/README.md` |
| MODIFICADO | `GEMINI.md` |
| MODIFICADO | `docs/MASTER_PROMPT.md` |

### v1.2.0 (cambios desde v1.1.0)
| Acción | Fichero | Nota |
|---|---|---|
| ACTUALIZADO | `project.config.md` | ⚠️ Solo añadir secciones que falten — no sobreescribir |
| MODIFICADO | `GEMINI.md` | |
| MODIFICADO | `CLAUDE.md` | |
| MODIFICADO | `ANTIGRAVITY.md` | |
| MODIFICADO | `.windsurfrules` | |
| MODIFICADO | `.github/copilot-instructions.md` | |
| MODIFICADO | `docs/MASTER_PROMPT.md` | |
| MODIFICADO | `docs/ADOPTION_PROMPT.md` | |

### v1.2.1 (cambios desde v1.2.0)
| Acción | Fichero |
|---|---|
| NUEVO | `README.template.md` |
| MODIFICADO | `GEMINI.md` |
| MODIFICADO | `CLAUDE.md` |
| MODIFICADO | `docs/MASTER_PROMPT.md` |

### v1.3.0 (cambios desde v1.2.1)
| Acción | Fichero | Nota |
|---|---|---|
| NUEVO | `docs/DESIGN.md` | Solo si no existe ya. Solo si el proyecto tiene UI. |
| NUEVO | `docs/UPGRADE_PROMPT.md` | Este mismo fichero — ya lo tiene el usuario |
| MODIFICADO | `GEMINI.md` | |
| MODIFICADO | `CLAUDE.md` | |
| MODIFICADO | `ANTIGRAVITY.md` | |
| MODIFICADO | `.windsurfrules` | |
| MODIFICADO | `.github/copilot-instructions.md` | |
| MODIFICADO | `docs/MASTER_PROMPT.md` | |
| CAMPO AÑADIDO | `project.config.md` | ⚠️ Solo añadir la línea `Framework Version`. No sobreescribir. |
| LÍNEA AÑADIDA | `docs/SPECIFICATIONS.md` | ⚠️ Solo añadir la referencia a DESIGN.md en sección 4. No sobreescribir. |

### v1.4.0 (cambios desde v1.3.0)
| Acción | Fichero | Nota |
|---|---|---|
| NUEVO | `memory.md` | Base de conocimiento cualitativo. |
| MODIFICADO | `README.md` | Tabla actualizada con el nuevo Architect Review. |
| MODIFICADO | `GEMINI.md` | Para leer memory.md |
| MODIFICADO | `docs/MASTER_PROMPT.md` | Estructurado en XML y con Architect Review. |
| MODIFICADO | `docs/ADOPTION_PROMPT.md` | Estructurado en XML. |
| MODIFICADO | `docs/UPGRADE_PROMPT.md` | Estructurado en XML y actualizado a 1.4.0. |
| LÍNEA AÑADIDA | `.gitignore` | Añadir `implementation_plan.md` y `walkthrough.md`. |

### v1.5.0 (cambios desde v1.4.0)
| Acción | Fichero | Nota |
|---|---|---|
| MODIFICADO | `docs/MASTER_PROMPT.md` | Capa de Enforcement (XML, Memory Gate). |
| MODIFICADO | `docs/ADOPTION_PROMPT.md` | |
| MODIFICADO | `docs/UPGRADE_PROMPT.md` | |
| MODIFICADO | `GEMINI.md` | Refactorización DRY extrema |
| MODIFICADO | `CLAUDE.md` | Refactorización DRY extrema |
| MODIFICADO | `ANTIGRAVITY.md` | Refactorización DRY extrema |
| MODIFICADO | `.windsurfrules` | Refactorización DRY extrema |
| MODIFICADO | `.github/copilot-instructions.md` | Refactorización DRY extrema |
| MODIFICADO | `memory.md` | Aviso sobre borrado de ejemplos |
| MODIFICADO | `task.md` | Reseteado a template limpio |
</upgrade_manifest_phase>

---

<apply_changes_phase>
## Fase 3 — Aplicación de cambios

### Opción A: Descarga automática (si tienes acceso a red)

Para cada fichero marcado como NUEVO o MODIFICADO, descarga el contenido desde estas URLs y sobreescribe el fichero local:

| Fichero | Raw URL de GitHub |
|---|---|
| `GEMINI.md` | `https://raw.githubusercontent.com/davidbuenov/dbv-specs-ops/main/GEMINI.md` |
| `CLAUDE.md` | `https://raw.githubusercontent.com/davidbuenov/dbv-specs-ops/main/CLAUDE.md` |
| `ANTIGRAVITY.md` | `https://raw.githubusercontent.com/davidbuenov/dbv-specs-ops/main/ANTIGRAVITY.md` |
| `.windsurfrules` | `https://raw.githubusercontent.com/davidbuenov/dbv-specs-ops/main/.windsurfrules` |
| `.github/copilot-instructions.md` | `https://raw.githubusercontent.com/davidbuenov/dbv-specs-ops/main/.github/copilot-instructions.md` |
| `README.template.md` | `https://raw.githubusercontent.com/davidbuenov/dbv-specs-ops/main/README.template.md` |
| `docs/MASTER_PROMPT.md` | `https://raw.githubusercontent.com/davidbuenov/dbv-specs-ops/main/docs/MASTER_PROMPT.md` |
| `docs/ADOPTION_PROMPT.md` | `https://raw.githubusercontent.com/davidbuenov/dbv-specs-ops/main/docs/ADOPTION_PROMPT.md` |
| `docs/UPGRADE_PROMPT.md` | `https://raw.githubusercontent.com/davidbuenov/dbv-specs-ops/main/docs/UPGRADE_PROMPT.md` |
| `docs/README.md` | `https://raw.githubusercontent.com/davidbuenov/dbv-specs-ops/main/docs/README.md` |
| `docs/DESIGN.md` | `https://raw.githubusercontent.com/davidbuenov/dbv-specs-ops/main/docs/DESIGN.md` *(solo si no existe)* |

> **Nota:** Si alguna descarga falla, muestra el link al usuario para que lo descargue manualmente.

### Opción B: Descarga manual (si NO tienes acceso a red)

Si no puedes descargar ficheros automáticamente, muestra al usuario este mensaje:

> *"No tengo acceso a internet en este momento. Por favor, descarga manualmente los siguientes ficheros desde GitHub y cópialos en las rutas indicadas de tu proyecto:*
>
> 🔗 **[Ver todos los ficheros en GitHub](https://github.com/davidbuenov/dbv-specs-ops)**
>
> Ficheros que necesitas actualizar: [lista los ficheros calculados en la Fase 2]
>
> Para cada uno: haz clic → botón 'Raw' → Guardar como → pégalo en la ruta indicada de tu proyecto."*
</apply_changes_phase>

---

<surgical_changes_phase>
## Fase 4 — Cambios quirúrgicos (sin sobreescribir ficheros de proyecto)

Algunos ficheros requieren cambios puntuales, no sobreescritura completa:

### `project.config.md` — Añadir campo `framework_version`

En la sección `## Project Identity`, añade esta línea al final de la lista de campos, si no existe ya:

```markdown
- **Framework Version:** 1.4.0
```

### `docs/SPECIFICATIONS.md` — Añadir referencia a DESIGN.md

En la sección `## 🏗️ 4. Propuesta de Solución Técnica`, añade esta línea al final, si no existe ya:

```markdown
- **Sistema de Diseño:** Si el proyecto tiene interfaz de usuario, ver `docs/DESIGN.md` para tokens de color, tipografía y componentes.
```

### `docs/DESIGN.md` — Solo si no existe

Si el proyecto tiene interfaz de usuario (web, móvil, desktop) y `docs/DESIGN.md` **no existe**:
- Descarga el fichero desde la URL de la Fase 3.
- Infórmale al usuario: *"He creado `docs/DESIGN.md` como plantilla. Rellénalo con los tokens de color y tipografía de tu proyecto."*

Si el proyecto no tiene UI → omite este paso.
</surgical_changes_phase>

---

<closing_phase>
## Fase 5 — Cierre

Cuando todos los cambios estén aplicados:

1. Actualiza el campo `Framework Version` en `project.config.md` a `1.5.0`.
2. Muestra al usuario un resumen claro:

```
✅ Framework actualizado de vX.X.X → v1.5.0

Ficheros actualizados:
  • [lista de ficheros modificados/añadidos]

Ficheros de proyecto no modificados (protegidos):
  • docs/SPECIFICATIONS.md ✓
  • docs/ARCHITECTURE.md ✓
  • task.md ✓
  • CHANGELOG.md ✓
  • README.md ✓

Próximos pasos:
  [Si se creó DESIGN.md] → Rellena docs/DESIGN.md con los tokens de diseño de tu proyecto.
  → Continúa con tu proyecto normalmente. El framework ya está al día.
```
</closing_phase>

---

> 🛠️ Framework SDD creado por **[David Bueno Vallejo](https://github.com/davidbuenov)** — libre y gratuito · [dbv-specs-ops](https://github.com/davidbuenov/dbv-specs-ops)
