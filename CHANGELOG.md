# Changelog — Multi-Catalog Project: AI & Unreal Engine

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [Sin publicar] / [Unreleased]

---

## [2.0.0] — 2026-06-15

### Added
- **Dashboard Hub Visual:** Nueva interfaz premium de tema oscuro futurista con tarjetas de cristal templado (glassmorphic), nodo central y diseño responsivo.
- **Rutas de Aprendizaje:** Panel lateral interactivo en forma de línea de tiempo vertical que filtra los cursos por trayectorias recomendadas.
- **Ranking "Lo más popular":** Panel lateral que calcula dinámicamente y ordena en tiempo real los 5 recursos más votados por el usuario.
- **Novedades de Catalogación:** Bloque inferior "Actualizado recientemente" que destaca cronológicamente los últimos 4 recursos agregados.
- **Scripts de Arranque Multiplataforma:** `start.cmd` / `stop.cmd` (Windows) y `start.sh` / `stop.sh` (Linux/macOS) sirviendo la web de forma local en el puerto `8050` para evitar colisiones con otros puertos en uso.
- **Tests Automatizados:** Conjunto de pruebas unitarias (`tests/test_build.py`) con validación de inyección de plantillas e integridad de carpetas generadas.
- **Metodología SDD:** Integración del framework de ingeniería `dbv-specs-ops` en el repositorio para persistencia del contexto.

### Fixed
- **PermissionError en Compilación:** Captura de excepciones al limpiar las carpetas de salida en `build.py` y copia recursiva in-place con `dirs_exist_ok=True` para prevenir caídas cuando el servidor de desarrollo está en ejecución.

---

## [1.2.0] — 2026-06-14

### Added
- Actualización de taxonomías y volcado masivo de cursos de IA y Unreal Engine acumulados desde octubre de 2025.

---

## [1.1.0] — 2025-07-27

### Added
- Primera versión estable del portal unificado de selección y los dos catálogos de recursos.
