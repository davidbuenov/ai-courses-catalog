# 🎨 Sistema de Diseño Visual: Multi-Catalog Project

> **Fase:** `/spec` / `/plan`
> **Estado:** Borrador de Diseño
> **Última Revisión:** 2026-06-15

---

## 🌌 1. Filosofía de Diseño
El nuevo catálogo adopta una estética **Hub/Dashboard Premium** basada en un tema oscuro futurista con efectos de **Glassmorphism** (cristal templado y desenfoque de fondo) y micro-interacciones vibrantes que incitan a la exploración. El objetivo es dar una sensación de plataforma "viva" e inteligente.

---

## 🎨 2. Paleta de Colores (Tokens)

Definido mediante Variables CSS en el root:

```css
:root {
    /* Backgrounds */
    --bg-main: #060b19;          /* Azul marino muy profundo */
    --bg-card: rgba(13, 22, 47, 0.6); /* Azul oscuro con opacidad para glassmorphism */
    --bg-card-hover: rgba(20, 32, 68, 0.8);
    --bg-sidebar: #090e24;       /* Panel lateral sólido/cristalino */

    /* Bordes y Cristal */
    --border-glass: rgba(255, 255, 255, 0.08);
    --border-glass-glow: rgba(52, 152, 219, 0.3);
    
    /* Colores de Marca y Acento */
    --accent-blue: #00d2ff;      /* Cyan brillante para efectos activos */
    --accent-purple: #9b5de5;    /* Violeta para elementos destacados */
    --accent-green: #00f5d4;     /* Verde neón para cursos/novedades */
    --accent-orange: #fee440;    /* Amarillo/naranja para popularidad y advertencias */

    /* Texto */
    --text-primary: #f8f9fa;     /* Blanco suave para lectura limpia */
    --text-secondary: #a0aec0;   /* Gris azulado para descripciones y metadatos */
    --text-muted: #718096;       /* Gris apagado */
    
    /* Gradientes */
    --gradient-glow: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
    --gradient-card: linear-gradient(135deg, rgba(13, 22, 47, 0.8), rgba(6, 11, 25, 0.9));
}
```

---

## 🔤 3. Tipografía

Utilizaremos fuentes modernas y limpias importadas de Google Fonts para reemplazar las fuentes del sistema básicas:

- **Fuente Principal:** `Outfit` o `Inter` (de Google Fonts).
- **Escala de Tamaños:**
  - `h1`: 2.5rem (Semibold) - Títulos de catálogo principales.
  - `h2`: 1.8rem (Medium) - Secciones del dashboard.
  - `h3`: 1.25rem (Medium) - Títulos de tarjetas de recursos.
  - `body`: 0.95rem (Regular) - Descripciones de cursos y texto principal.
  - `meta`: 0.85rem (Semibold) - Etiquetas y fechas.

---

## 🧱 4. Componentes UI del Dashboard (Basado en la Propuesta Visual)

### A. Central Selector Node (El "Core" del Catálogo)
- Un orbe central brillante en azul con efecto de pulsación suave que sirve como punto de fuga visual, ramificado hacia las 4 categorías principales del catálogo.

### B. Tarjetas de Categoría ("Cursos", "Libros", "Newsletters", "Herramientas")
- Tarjetas con desenfoque de fondo (`backdrop-filter: blur(12px)`) y borde sutil brillante.
- Al pasar el cursor (Hover), la tarjeta se eleva ligeramente, aumenta el desenfoque y el borde brilla usando el color acento de la categoría.
- Muestran un indicador numérico flotante en verde neón: `[NUEVO]` y `+X nuevos`.

### C. Línea de Tiempo de Rutas de Aprendizaje ("Rutas de Aprendizaje")
- Un panel vertical en el lateral derecho con un hilo conductor (timeline) que conecta círculos con icono.
- Cada etapa tiene el título del trayecto de aprendizaje y el conteo de recursos disponibles (ej. "Fundamentos de IA - 12 recursos").

### D. Panel de Recursos Populares ("Lo más popular")
- Lista numerada del 1 al 5 en el lateral, con fuentes compactas y una pequeña insignia que indica el tipo de recurso (ej. "ChatGPT | Herramienta").

### E. Rejilla de Novedades ("Actualizado Recientemente")
- Tarjetas horizontales más compactas que muestran los recursos agregados en las últimas horas/días con un badge verde de `NUEVO`.

---

## ⚙️ 5. Micro-Animaciones y Efectos Visuales
- **Pulse Glow:** El nodo central y las tarjetas activas tienen una sombra difusa (`box-shadow`) que late lentamente.
- **Card Hover Transition:** Todas las tarjetas tienen `transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)` para un movimiento ultra suave al pasar el ratón.
- **Glassmorphism:**
  ```css
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-glass);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  ```
