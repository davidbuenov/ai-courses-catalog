# 🏗 Arquitectura Técnica: Multi-Catalog Project: AI & Unreal Engine

> **Fase:** `/plan` (Planificación Técnica)
> **Estado:** Validado
> **Última Revisión:** 2026-06-15

---

## 🛠 Stack Tecnológico

| Capa | Tecnología | Justificación |
| --- | --- | --- |
| **Lenguaje** | JavaScript (ES6) y Python 3.x | Vanilla JS para el cliente, Python para los scripts de compilación, integración de datos y pruebas. |
| **Framework principal** | Ninguno (Vanilla JS / CSS) | Sin frameworks en el cliente para máxima ligereza, velocidad de carga y facilidad de despliegue en GitHub Pages. |
| **Persistencia** | JSON estático + LocalStorage | Datos cargados estáticamente en formato JSON para eliminar costos de servidor. Upvotes y rankings de popularidad persistidos localmente en `localStorage`. |
| **Estilos** | CSS3 moderno (Custom Properties, Flexbox, Grid) | Flexibilidad absoluta para lograr efectos premium como glassmorphism sin depender de librerías externas. |
| **Testing** | Node.js (Jest) o Python (unittest/pytest) / Selenium | Pruebas automatizadas (se implementarán tests para validar la lógica del script de compilación y pruebas unitarias/de integración del frontend). |
| **CI/CD** | GitHub Pages + GitHub Actions (Opcional) | Despliegue estático automatizado en cada push a la rama principal. |

---

## 📂 Estructura de Directorios

```text
/
├── app/                  # Código base de la aplicación (plantillas)
│   ├── css/
│   │   └── style.css     # Estilos de la aplicación
│   ├── js/
│   │   └── script.js     # Lógica interactiva del cliente
│   └── index.html        # Plantilla HTML base con placeholders {{PAGE_TITLE}}, etc.
│
├── data/                 # Bases de datos del contenido real de producción
│   ├── ai/               # Datos del catálogo de IA
│   │   ├── courses.json
│   │   ├── categories.json
│   │   └── types.json
│   └── unreal/           # Datos del catálogo de Unreal Engine
│       ├── courses.json
│       ├── categories.json
│       └── types.json
│
├── claudecowork/         # Entorno de pruebas y curación de contenidos (externo)
│   ├── ai/               # Buzones e intermedios del catálogo de IA
│   ├── unreal/           # Buzones e intermedios del catálogo de Unreal
│   └── merge/            # Herramientas de combinación y taxonomías
│       └── merge.py      # Combina aprobados.json con data/courses.json
│
├── dist_ai/              # Carpeta de salida autogenerada lista para producción (IA)
├── dist_unreal/          # Carpeta de salida autogenerada lista para producción (Unreal)
│
├── tests/                # Pruebas automatizadas
│
├── start.cmd             # Script para iniciar el servidor local en Windows
├── stop.cmd              # Script para detener el servidor local en Windows
├── start.sh              # Script para iniciar el servidor local en macOS/Linux
├── stop.sh               # Script para detener el servidor local en macOS/Linux
├── build.py              # Script compilador de sabores (themes)
├── index.html            # Portal principal de selección de catálogo
├── portal-style.css      # Estilos del portal principal
└── docs/                 # Documentación técnica bajo la metodología SDD
    ├── MASTER_PROMPT.md
    ├── SPECIFICATIONS.md
    ├── ARCHITECTURE.md
    └── DESIGN.md
```

---

## 🔑 Decisiones Técnicas Clave

### Sistema de Construcción y Templating
- **build.py** actúa como un motor de plantillas súper liviano que lee `app/index.html` y reemplaza placeholders como `{{PAGE_TITLE}}`, `{{HEADER_TITLE}}`, `{{SUBTITLE}}`, `{{REPO_URL}}`, `{{OTHER_CATALOG_URL}}`, `{{OTHER_CATALOG_NAME}}` inyectando configuraciones específicas del sabor elegido. Luego copia los archivos estáticos en carpetas separadas `dist_ai` y `dist_unreal`.

### Gestión del Estado en el Cliente
- **Filtros Activos:** Gestionados mediante una estructura de datos `Set` de JS en memoria para mantener combinaciones de `tipo`, `categoria` y `dificultad`.
- **Votos y Popularidad (Local-Only):** Almacenados en `localStorage` con la clave `cursosVotosIA` para mantener las interacciones individuales del usuario. El ranking "Lo Más Popular" se calculará dinámicamente en el cliente sumando o restando las evaluaciones almacenadas localmente.

### Cabeceras y Scripts de Arranque
- Todo archivo fuente debe incorporar la cabecera correspondiente especificada en `project.config.md`.
- Se introducen scripts multiplataforma (`start.cmd` / `stop.cmd` para Windows, `start.sh` / `stop.sh` para Linux/macOS) en la raíz para iniciar un servidor local HTTP (`python -m http.server 8050`) y facilitar el ciclo de desarrollo y pruebas.

---

## 🔗 Integraciones Externas

Ninguna. El portal es autónomo, sin servidor propio ni bases de datos en la nube en esta etapa.

---

## ⚠️ Restricciones y Riesgos Técnicos

- **Restricción:** El hosting del sitio debe seguir siendo gratuito e independiente de servidores propios, garantizando que el mantenimiento sea cero.
- **Riesgo:** El ranking local empieza vacío para nuevos usuarios.
  - **Mitigación:** Si no hay votos registrados en `localStorage`, la sección "Lo Más Popular" mostrará una lista de recursos recomendados por defecto basándose en un atributo `"recommended": true` o en las primeras entradas del archivo de datos para evitar que la sección aparezca vacía o rota.
