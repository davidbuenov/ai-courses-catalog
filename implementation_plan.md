# 🏗️ Plan de Avance: Rediseño Dashboard Hub & Sistema de Votos

Este plan describe la hoja de ruta técnica para actualizar el proyecto de catálogos simples a una experiencia visual de Dashboard interactivo (estilo Hub moderno oscuro), integrar un sistema de votos/popularidad local, crear tests automatizados y añadir scripts de inicio/parada.

## User Review Required

El rediseño visual a tema oscuro y estructura de Hub es un cambio de diseño mayor. Las rutas de aprendizaje y rankings de popularidad se estructurarán de manera que sigan siendo mantenibles a través del flujo de curación en `claudecowork`.

---

## Proposed Changes

### [Scripts de Utilidad]

#### [NEW] [start.cmd](file:///d:/Programacion/github-davidbuenov/ai-courses-catalog/start.cmd)
- Script para Windows que inicia el servidor local HTTP (`python -m http.server 8000`) en segundo plano y abre la URL `http://localhost:8000` en el navegador.

#### [NEW] [stop.cmd](file:///d:/Programacion/github-davidbuenov/ai-courses-catalog/stop.cmd)
- Script para Windows que encuentra la tarea corriendo en el puerto 8000 y la detiene.

#### [NEW] [start.sh](file:///d:/Programacion/github-davidbuenov/ai-courses-catalog/start.sh)
- Script para Linux/macOS equivalente a `start.cmd`.

#### [NEW] [stop.sh](file:///d:/Programacion/github-davidbuenov/ai-courses-catalog/stop.sh)
- Script para Linux/macOS equivalente a `stop.cmd`.

### [Frontend Layout & Styling]

#### [MODIFY] [index.html](file:///d:/Programacion/github-davidbuenov/ai-courses-catalog/app/index.html)
- Modificar la plantilla base para implementar la estructura del Dashboard:
  - Header simplificado e interactivo.
  - Sección central del Hub (Nodo principal "Catálogo IA" y tarjetas radiales de categorías).
  - Barra lateral derecha para "Rutas de Aprendizaje" y "Lo Más Popular".
  - Sección inferior de novedades ("Actualizado recientemente").

#### [MODIFY] [style.css](file:///d:/Programacion/github-davidbuenov/ai-courses-catalog/app/css/style.css)
- Implementar la paleta de colores oscuros, desenfoque de fondo (`backdrop-filter`) para glassmorphism, sombras internas, bordes semi-transparentes y transiciones hover fluidas.
- Diseñar la línea de tiempo vertical para las rutas de aprendizaje.

### [Data & Compilation Engine]

#### [MODIFY] [build.py](file:///d:/Programacion/github-davidbuenov/ai-courses-catalog/build.py)
- Adaptar las variables de inyección y placeholders si es necesario.
- Asegurar que la estructura final compile correctamente en `dist_ai/` y `dist_unreal/`.

#### [MODIFY] [script.js](file:///d:/Programacion/github-davidbuenov/ai-courses-catalog/app/js/script.js)
- Adaptar las funciones de renderizado:
  - En lugar de una lista plana, renderizar por bloques del Dashboard.
  - Conectar el sistema de popularidad de manera local (Opción C).
  - Si no hay votos guardados localmente, la sección "Lo Más Popular" mostrará una lista de recursos recomendados por defecto (basados en un atributo `"recommended": true` o los primeros de la lista).
  - Renderizar las rutas de aprendizaje (leídas desde `categories.json` o una configuración).

### [Pruebas Automatizadas]

#### [NEW] [tests/test_build.py](file:///d:/Programacion/github-davidbuenov/ai-courses-catalog/tests/test_build.py)
- Implementar tests unitarios en Python usando el módulo estándar `unittest` para validar que el script `build.py` genera correctamente los directorios `dist_ai/` y `dist_unreal/`, reemplaza los placeholders de HTML y copia los archivos de datos sin errores de permisos.

---

## Verification Plan

### Automated Tests
- Ejecutar las pruebas automatizadas del compilador:
  ```bash
  python -m unittest discover tests
  ```

### Manual Verification
- Iniciar el servidor local ejecutando `start.cmd`.
- Interactuar con el dashboard (hacer clic en categorías, votar, buscar, cambiar de catálogo).
- Detener el servidor con `stop.cmd` y confirmar que el puerto 8000 queda libre.
- Validar el responsive en resoluciones móviles y tablets.
