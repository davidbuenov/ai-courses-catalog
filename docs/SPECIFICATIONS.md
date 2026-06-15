# 📋 Especificaciones: Multi-Catalog Project: AI & Unreal Engine

> **Fase:** `/spec` (Especificación)
> **Estado:** Validado
> **Última Revisión:** 2026-06-15

---

## 🎯 1. Contexto y Objetivos

- **Problema:** La interfaz actual de los catálogos (AI y Unreal Engine) es lineal, simple y tradicional. No representa visualmente la segmentación de recursos (cursos, libros, boletines, herramientas) de forma atractiva, y carece de secciones interactivas avanzadas como rutas de aprendizaje curadas o rankings de popularidad global.
- **Objetivo (Éxito):** Rediseñar los catálogos convirtiéndolos en un **Dashboard/Hub Visual Premium** (basado en la propuesta visual oscura con glassmorphism) que organice los recursos por tipo de contenido, rutas temáticas y popularidad local, manteniendo la facilidad de mantenimiento y la portabilidad (Zero-Backend).

## 👥 2. Usuarios y Escenarios

- **Perfil de Usuario:** Estudiantes, programadores y entusiastas de la IA y Unreal Engine que buscan recursos de calidad ordenados y validados.
- **Escenarios Clave:**
  - *Escenario A (Exploración Temática):* Un usuario accede al portal y de un vistazo ve cuántos cursos, libros y herramientas nuevas se han añadido, pudiendo hacer clic en una sección para verlos.
  - *Escenario B (Ruta de Aprendizaje):* Un principiante sigue la ruta de "Fundamentos de IA" para consumir los recursos recomendados en orden secuencial.
  - *Escenario C (Popularidad e Interacción):* Un usuario ve qué herramientas o recursos son los más votados de la semana y puede sumar su voto directamente, actualizando su ranking personal en su dispositivo.

## ✨ 3. Funcionalidades Principales (Requisitos)

- [x] **Diseño Dashboard Hub Premium:** Estilo futurista oscuro, bordes con brillo neon/glassmorphism, y distribución en bloques (Cursos, Libros, Newsletters, Herramientas).
- [ ] **Sección de Rutas de Aprendizaje:** Componente visual secuencial que agrupa recursos selectos en un orden lógico (ej. Introducción -> Intermedio -> Avanzado).
- [ ] **Ranking de Popularidad ("Lo más popular"):** Panel que muestra el Top 5 de recursos más valorados.
- [ ] **Sistema de Almacenamiento de Evaluaciones/Votos (Local-Only):** Los votos de los usuarios se recopilan y muestran de forma local, persistidos en `localStorage` (decisión confirmada por el usuario).
- [ ] **Sección "Actualizado Recientemente":** Panel de novedades que muestra los últimos recursos añadidos con etiquetas de tiempo (ej: "Hace 2 horas").
- [ ] **Buscador y Filtros Rápidos por Categoría:** Integración de los filtros y búsqueda en tiempo real dentro del nuevo layout del Dashboard.
- [ ] **Pruebas Automatizadas:** Creación y ejecución de tests unitarios y de integración automatizados para el frontend.
- [ ] **Scripts de ejecución simplificados:** Creación de los scripts `start.cmd` / `stop.cmd` (Windows) y `start.sh` / `stop.sh` (Unix) para facilitar las pruebas locales.

## 🏗️ 4. Propuesta de Solución Técnica (Resumen)

- **Enfoque:** Actualizar el motor de plantillas `build.py` para inyectar los datos en una nueva plantilla HTML moderna. La lógica interactiva seguirá siendo Vanilla JavaScript y la hoja de estilos se modernizará completamente en `app/css/style.css`.
- **Dependencias Críticas:** Font Awesome (para iconos).
- **Sistema de Diseño:** Definido en `docs/DESIGN.md` con paleta oscura, gradientes HSL y efectos de glassmorphic backdrop-filter.

## 🚫 5. Fuera de Alcance (Out of Scope)

- Sistema de registro de usuarios (Login/Password). La experiencia debe ser anónima y sin fricciones.
- Comentarios o foros en tiempo real para evitar costes y moderación.
- Sincronización en la nube o bases de datos de terceros en esta versión (se pospone para versiones futuras).

## ⚠️ 6. Riesgos y Mitigación

- **Riesgo:** El diseño oscuro y complejo puede no adaptarse bien a móviles (Responsive).
  - **Mitigación:** Asegurar que las tarjetas de categorías colapsen en rejillas de 1 columna y que el menú/dashboard sea fluido usando CSS Grid y Flexbox responsivo.
- **Manual Verification**
  - Levantar servidor local en puerto 8050.
  - Interactuar con el dashboard (hacer clic en categorías, votar, buscar, cambiar de catálogo).
  - Detener el servidor con `stop.cmd` y confirmar que el puerto 8050 queda libre.
  - Validar el responsive en resoluciones móviles y tablets.

## ❓ 7. Preguntas Abiertas

*(Ninguna. Todas las preguntas críticas han sido resueltas en la Fase B).*