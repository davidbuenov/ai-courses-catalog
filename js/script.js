document.addEventListener('DOMContentLoaded', () => {
    // DOM element references
    const searchBox = document.getElementById('search-box'); // Nueva referencia
    const filtroCategoriaSelect = document.getElementById('filtro-categoria');
    const filtroDificultadSelect = document.getElementById('filtro-dificultad');
    const filtrosActivosContainer = document.getElementById('filtros-activos');
    const cursosContainer = document.getElementById('cursos-container');
    const totalCursosSpan = document.getElementById('total-cursos');
    const ultimaActualizacionSpan = document.getElementById('ultima-actualizacion');
    const ultimaActualizacionContainer = document.getElementById('ultima-actualizacion-container');

    // Application state
    let todosLosCursos = [];
    let todasLasCategorias = {};
    let votos = {};
    let filtros = {
        categorias: new Set(),
        dificultades: new Set()
    };

    // --- INITIALIZATION ---
    async function init() {
        cargarVotos();
        await cargarDatos();
        poblarFiltros();
        configurarEventListeners();
        renderizar();
    }

    // --- DATA LOADING ---
    async function cargarDatos() { /* ... sin cambios aquí ... */ }

    // --- VOTE MANAGEMENT ---
    function cargarVotos() { /* ... sin cambios aquí ... */ }
    function guardarVotos() { /* ... sin cambios aquí ... */ }

    // --- POPULATE FILTERS ---
    function poblarFiltros() { /* ... sin cambios aquí ... */ }

    // --- EVENT LISTENERS (Modificado) ---
    function configurarEventListeners() {
        // Nuevo listener para la caja de búsqueda
        searchBox.addEventListener('input', renderizar);

        filtroCategoriaSelect.addEventListener('change', (e) => agregarFiltro('categorias', e.target.value));
        filtroDificultadSelect.addEventListener('change', (e) => agregarFiltro('dificultades', e.target.value));
        
        filtrosActivosContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-tag')) {
                const tag = e.target.parentElement;
                quitarFiltro(tag.dataset.tipo, tag.dataset.valor);
            }
        });
        
        cursosContainer.addEventListener('click', (e) => {
            if (e.target.closest('.vote-btn')) {
                manejarClickVoto(e.target.closest('.vote-btn'));
            } else if (e.target.classList.contains('etiqueta-clickable')) {
                manejarClickEtiqueta(e.target);
            }
        });
    }
    
    // --- FILTER LOGIC ---
    function agregarFiltro(tipo, valor) { /* ... sin cambios aquí ... */ }
    function quitarFiltro(tipo, valor) { /* ... sin cambios aquí ... */ }
    
    // --- VOTE & TAG CLICK LOGIC ---
    function manejarClickVoto(boton) { /* ... sin cambios aquí ... */ }
    function manejarClickEtiqueta(etiquetaElement) { /* ... sin cambios aquí ... */ }
    
    // --- RENDERING ---
    function renderizar() {
        renderizarFiltrosActivos();
        renderizarCursos();
    }

    function renderizarFiltrosActivos() { /* ... sin cambios aquí ... */ }
    
    // --- RENDERIZAR CURSOS (LÓGICA PRINCIPAL ACTUALIZADA) ---
    function renderizarCursos() {
        let cursosFiltrados = todosLosCursos;
        const searchText = searchBox.value.trim().toLowerCase();

        // 1. Aplicar filtro de búsqueda de texto (si tiene 4 o más caracteres)
        if (searchText.length >= 4) {
            cursosFiltrados = cursosFiltrados.filter(curso => {
                const nameMatch = curso.name.toLowerCase().includes(searchText);
                const descMatch = curso.description ? curso.description.toLowerCase().includes(searchText) : false;
                const catMatch = curso.categories ? curso.categories.join(' ').toLowerCase().includes(searchText) : false;
                return nameMatch || descMatch || catMatch;
            });
        }

        // 2. Aplicar filtros de categorías
        if (filtros.categorias.size > 0) {
            cursosFiltrados = cursosFiltrados.filter(curso => 
                curso.categories && [...filtros.categorias].every(filtroCat => curso.categories.includes(filtroCat))
            );
        }

        // 3. Aplicar filtros de dificultad
        if (filtros.dificultades.size > 0) {
            cursosFiltrados = cursosFiltrados.filter(curso => filtros.dificultades.has(curso.difficulty));
        }

        // --- El resto de la función para mostrar los cursos es la misma ---
        cursosContainer.innerHTML = '';
        if (cursosFiltrados.length === 0) {
            cursosContainer.innerHTML = '<p class="sin-resultados">No courses found matching the selected filters.</p>';
            return;
        }

        cursosFiltrados.forEach(curso => {
            // ... (el código que crea cada tarjeta de curso no cambia)
            const cursoElement = document.createElement('div');
            cursoElement.className = 'curso-card';
            const cursoId = curso.name.replace(/[^a-zA-Z0-9]/g, '');
            cursoElement.dataset.id = cursoId;
            
            const difficultyClass = `difficulty-${curso.difficulty.toLowerCase().replace(/[\s/]/g, '-')}`;
            const linkHtml = (curso.link && curso.link.startsWith('http'))
                ? `<a href="${curso.link}" target="_blank" rel="noopener noreferrer" class="curso-enlace">${curso.link}</a>`
                : `<span class="curso-enlace-no-disponible">${curso.link || 'Not available'}</span>`;

            const descriptionHtml = curso.description ? `<p class="course-description">${curso.description}</p>` : '';
            const categoriesHtml = curso.categories ? curso.categories.map(category => 
                `<span class="etiqueta etiqueta-clickable" data-categoria="${category}">${category}</span>`
            ).join('') : '';

            cursoElement.innerHTML = `
                <div class="curso-header">
                    <h3>${curso.name}</h3>
                    <span class="curso-dificultad ${difficultyClass}">${curso.difficulty}</span>
                </div>
                <div class="curso-body">
                    ${descriptionHtml}
                    <p>${linkHtml}</p>
                    <div class="curso-etiquetas">
                        ${categoriesHtml}
                    </div>
                </div>
                <div class="curso-footer">
                    <div class="curso-votacion">
                        <button class="vote-btn" data-id="${cursoId}" data-vote="up" aria-label="Vote up">
                            <i class="fas fa-thumbs-up"></i>
                            <span class="vote-count up-count">0</span>
                        </button>
                        <button class="vote-btn" data-id="${cursoId}" data-vote="down" aria-label="Vote down">
                            <i class="fas fa-thumbs-down"></i>
                            <span class="vote-count down-count">0</span>
                        </button>
                    </div>
                </div>
            `;
            cursosContainer.appendChild(cursoElement);
            actualizarVotosTarjeta(cursoElement);
        });
    }

    function actualizarVotosTarjeta(cardElement) { /* ... sin cambios aquí ... */ }

    // Start the application
    init();

    // Re-pego las funciones sin cambios para que el fichero esté completo.
    async function cargarDatos() {
        try {
            const categoriasRes = await fetch('data/categories.json');
            todasLasCategorias = await categoriasRes.json();
            const cursosRes = await fetch('data/courses.json');
            const lastModifiedHeader = cursosRes.headers.get('Last-Modified');
            if (lastModifiedHeader) {
                const lastModifiedDate = new Date(lastModifiedHeader);
                ultimaActualizacionSpan.textContent = lastModifiedDate.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
                ultimaActualizacionContainer.style.display = 'inline';
            }
            todosLosCursos = await cursosRes.json();
            totalCursosSpan.textContent = todosLosCursos.length;
        } catch (error) {
            cursosContainer.innerHTML = '<p class="error">Error loading data. Please check the file paths and JSON format.</p>';
            console.error("Fatal Error loading data:", error);
        }
    }
    function cargarVotos() { const votosGuardados = localStorage.getItem('cursosVotosIA'); votos = votosGuardados ? JSON.parse(votosGuardados) : {}; }
    function guardarVotos() { localStorage.setItem('cursosVotosIA', JSON.stringify(votos)); }
    function poblarFiltros() { for (const categoriaPrincipal in todasLasCategorias) { const optgroup = document.createElement('optgroup'); optgroup.label = categoriaPrincipal; todasLasCategorias[categoriaPrincipal].forEach(subcategoria => { const option = document.createElement('option'); option.value = subcategoria; option.textContent = subcategoria; optgroup.appendChild(option); }); filtroCategoriaSelect.appendChild(optgroup); } const dificultades = [...new Set(todosLosCursos.map(curso => curso.difficulty))]; dificultades.sort().forEach(dificultad => { const option = document.createElement('option'); option.value = dificultad; option.textContent = dificultad; filtroDificultadSelect.appendChild(option); }); }
    function agregarFiltro(tipo, valor) { if (!valor || filtros[tipo].has(valor)) return; filtros[tipo].add(valor); renderizar(); if (tipo === 'categorias') filtroCategoriaSelect.value = ""; if (tipo === 'dificultades') filtroDificultadSelect.value = ""; }
    function quitarFiltro(tipo, valor) { filtros[tipo].delete(valor); renderizar(); }
    function manejarClickVoto(boton) { const cursoId = boton.dataset.id; const tipoVoto = boton.dataset.vote; if (!votos[cursoId]) { votos[cursoId] = { userVote: null }; } const votoActual = votos[cursoId]; votoActual.userVote = (votoActual.userVote === tipoVoto) ? null : tipoVoto; guardarVotos(); actualizarVotosTarjeta(boton.closest('.curso-card')); }
    function manejarClickEtiqueta(etiquetaElement) { const categoria = etiquetaElement.dataset.categoria; if (!categoria) return; filtros.categorias.clear(); filtros.dificultades.clear(); filtros.categorias.add(categoria); renderizar(); }
    function renderizarFiltrosActivos() { filtrosActivosContainer.innerHTML = ''; filtros.categorias.forEach(valor => { filtrosActivosContainer.innerHTML += `<div class="filtro-tag categoria" data-tipo="categorias" data-valor="${valor}">${valor} <span class="remove-tag">×</span></div>`; }); filtros.dificultades.forEach(valor => { filtrosActivosContainer.innerHTML += `<div class="filtro-tag dificultad" data-tipo="dificultades" data-valor="${valor}">${valor} <span class="remove-tag">×</span></div>`; }); }
    function actualizarVotosTarjeta(cardElement) { const cursoId = cardElement.dataset.id; if (!votos[cursoId]) { votos[cursoId] = { userVote: null }; } let upVotes = (votos[cursoId].userVote === 'up') ? 1 : 0; let downVotes = (votos[cursoId].userVote === 'down') ? 1 : 0; cardElement.querySelector('.up-count').textContent = upVotes; cardElement.querySelector('.down-count').textContent = downVotes; const userVote = votos[cursoId].userVote; const upBtn = cardElement.querySelector('[data-vote="up"]'); const downBtn = cardElement.querySelector('[data-vote="down"]'); upBtn.classList.toggle('voted-up', userVote === 'up'); downBtn.classList.toggle('voted-down', userVote === 'down'); }
});