document.addEventListener('DOMContentLoaded', () => {
    // DOM References
    const searchBox = document.getElementById('search-box');
    const filtroTipoSelect = document.getElementById('filtro-tipo');
    const filtroCategoriaSelect = document.getElementById('filtro-categoria');
    const filtroDificultadSelect = document.getElementById('filtro-dificultad');
    const filtrosActivosContainer = document.getElementById('filtros-activos');
    const cursosContainer = document.getElementById('cursos-container');
    const headerCountersContainer = document.getElementById('header-info-counters');
    // START: Add back the references for the update date
    const ultimaActualizacionContainer = document.getElementById('ultima-actualizacion-container');
    const ultimaActualizacionSpan = document.getElementById('ultima-actualizacion');
    // END: Add back references

    // App State
    let todosLosCursos = [];
    let todasLasCategorias = {};
    let votos = {};
    const filtros = {
        tipo: new Set(),
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

    // --- DATA LOADING (Updated) ---
    async function cargarDatos() {
        try {
            // Fetch both files
            const categoriasRes = await fetch('data/categories.json');
            todasLasCategorias = await categoriasRes.json();
            
            const cursosRes = await fetch('data/courses.json');

            // START: Logic for Last Updated Date (restored)
            const lastModifiedHeader = cursosRes.headers.get('Last-Modified');
            if (lastModifiedHeader && ultimaActualizacionContainer && ultimaActualizacionSpan) {
                const lastModifiedDate = new Date(lastModifiedHeader);
                ultimaActualizacionSpan.textContent = lastModifiedDate.toLocaleDateString('en-US', {
                    day: '2-digit', month: 'long', year: 'numeric'
                });
                ultimaActualizacionContainer.style.display = 'inline';
            }
            // END: Logic for Last Updated Date

            todosLosCursos = await cursosRes.json();
            
            // Calculate and display type counters
            const types = ["Course", "Book", "Newsletter", "Tool"];
            let countersHtml = '';
            types.forEach(type => {
                const count = todosLosCursos.filter(item => item.type === type).length;
                if (count > 0) {
                    // Use a span for each counter for better flexbox handling
                    countersHtml += `<span>${type}s: <strong>${count}</strong></span>`;
                }
            });
            headerCountersContainer.innerHTML = countersHtml;

        } catch (error) {
            cursosContainer.innerHTML = '<p class="error">Error loading data. Please check file paths and JSON format.</p>';
            console.error("Fatal Error loading data:", error);
        }
    }

    // --- The rest of the JS file remains the same ---
    
    // --- VOTE MANAGEMENT ---
    function cargarVotos() { const v = localStorage.getItem('cursosVotosIA'); votos = v ? JSON.parse(v) : {}; }
    function guardarVotos() { localStorage.setItem('cursosVotosIA', JSON.stringify(votos)); }

    // --- POPULATE FILTERS ---
    function poblarFiltros() {
        const types = ["Course", "Book", "Newsletter", "Tool"];
        types.forEach(type => { const option = document.createElement('option'); option.value = type; option.textContent = type; filtroTipoSelect.appendChild(option); });
        for (const catGroup in todasLasCategorias) { const optgroup = document.createElement('optgroup'); optgroup.label = catGroup; todasLasCategorias[catGroup].forEach(subcat => { const option = document.createElement('option'); option.value = subcat; option.textContent = subcat; optgroup.appendChild(option); }); filtroCategoriaSelect.appendChild(optgroup); }
        const dificultades = [...new Set(todosLosCursos.map(c => c.difficulty).filter(Boolean))];
        dificultades.sort().forEach(dificultad => { const option = document.createElement('option'); option.value = dificultad; option.textContent = dificultad; filtroDificultadSelect.appendChild(option); });
    }

    // --- EVENT LISTENERS ---
    function configurarEventListeners() {
        searchBox.addEventListener('input', renderizar);
        filtroTipoSelect.addEventListener('change', (e) => agregarFiltro('tipo', e.target.value));
        filtroCategoriaSelect.addEventListener('change', (e) => agregarFiltro('categorias', e.target.value));
        filtroDificultadSelect.addEventListener('change', (e) => agregarFiltro('dificultades', e.target.value));
        filtrosActivosContainer.addEventListener('click', (e) => { if (e.target.classList.contains('remove-tag')) { const tag = e.target.parentElement; quitarFiltro(tag.dataset.tipo, tag.dataset.valor); } });
        cursosContainer.addEventListener('click', (e) => { const voteBtn = e.target.closest('.vote-btn'); const copyBtn = e.target.closest('.copy-link-btn'); const tag = e.target.closest('.etiqueta-clickable'); if (voteBtn) manejarClickVoto(voteBtn); else if (copyBtn) handleCopyLink(copyBtn); else if (tag) manejarClickEtiqueta(tag); });
    }
    
    // --- FILTER LOGIC ---
    function agregarFiltro(tipo, valor) { if (!valor || filtros[tipo].has(valor)) return; filtros[tipo].add(valor); renderizar(); if (tipo === 'tipo') filtroTipoSelect.value = ""; if (tipo === 'categorias') filtroCategoriaSelect.value = ""; if (tipo === 'dificultades') filtroDificultadSelect.value = ""; }
    function quitarFiltro(tipo, valor) { filtros[tipo].delete(valor); renderizar(); }
    
    // --- ACTION HANDLERS ---
    function manejarClickVoto(boton) { const id = boton.dataset.id; const v = boton.dataset.vote; if (!votos[id]) votos[id] = {}; votos[id].userVote = (votos[id].userVote === v) ? null : v; guardarVotos(); actualizarVotosTarjeta(boton.closest('.curso-card')); }
    function manejarClickEtiqueta(el) { const cat = el.dataset.categoria; if (!cat) return; filtros.tipo.clear(); filtros.categorias.clear(); filtros.dificultades.clear(); filtros.categorias.add(cat); renderizar(); }
    function handleCopyLink(btn) { const link = btn.dataset.link; if (!link) return; navigator.clipboard.writeText(link).then(() => { const icon = btn.innerHTML; btn.innerHTML = 'Copied!'; btn.disabled = true; setTimeout(() => { btn.innerHTML = icon; btn.disabled = false; }, 2000); }).catch(err => console.error('Failed to copy link: ', err)); }
    
    // --- RENDERING ---
    function renderizar() { renderizarFiltrosActivos(); renderizarCursos(); }
    function renderizarFiltrosActivos() { filtrosActivosContainer.innerHTML = ''; ['tipo', 'categorias', 'dificultades'].forEach(tipo => { filtros[tipo].forEach(valor => { const tagClass = tipo === 'tipo' ? 'tipo' : (tipo === 'categorias' ? 'categoria' : 'dificultad'); filtrosActivosContainer.innerHTML += `<div class="filtro-tag ${tagClass}" data-tipo="${tipo}" data-valor="${valor}">${valor}<span class="remove-tag">×</span></div>`; }); }); }
    
    function renderizarCursos() {
        let cursosFiltrados = todosLosCursos;
        const searchText = searchBox.value.trim().toLowerCase();
        if (searchText.length >= 3) { cursosFiltrados = cursosFiltrados.filter(c => c.name.toLowerCase().includes(searchText) || (c.description && c.description.toLowerCase().includes(searchText)) || (c.categories && c.categories.join(' ').toLowerCase().includes(searchText))); }
        if (filtros.tipo.size > 0) { cursosFiltrados = cursosFiltrados.filter(c => filtros.tipo.has(c.type)); }
        if (filtros.categorias.size > 0) { cursosFiltrados = cursosFiltrados.filter(c => c.categories && [...filtros.categorias].every(cat => c.categories.includes(cat))); }
        if (filtros.dificultades.size > 0) { cursosFiltrados = cursosFiltrados.filter(c => filtros.dificultades.has(c.difficulty)); }
        cursosContainer.innerHTML = '';
        if (cursosFiltrados.length === 0) { cursosContainer.innerHTML = '<p class="sin-resultados">No content found matching the selected filters.</p>'; return; }
        cursosFiltrados.forEach(curso => { const cursoElement = document.createElement('div'); cursoElement.className = 'curso-card'; const cursoId = curso.name.replace(/[^a-zA-Z0-9]/g, ''); cursoElement.dataset.id = cursoId; const typeHtml = curso.type ? `<span class="curso-tipo">${curso.type}</span>` : ''; const difficultyHtml = curso.difficulty ? `<span class="curso-dificultad difficulty-${curso.difficulty.toLowerCase().replace(/\s/g, '-')}">${curso.difficulty}</span>` : ''; const shareText = encodeURIComponent(`Check out this AI content: "${curso.name}"`); const shareUrl = encodeURIComponent(curso.link || window.location.href); cursoElement.innerHTML = `<div class="curso-header"><h3>${curso.name}</h3><div class="curso-meta-info">${typeHtml}${difficultyHtml}</div></div><div class="curso-body">${curso.description ? `<p class="course-description">${curso.description}</p>` : ''}<p>${(curso.link && curso.link.startsWith('http')) ? `<a href="${curso.link}" target="_blank" rel="noopener noreferrer" class="curso-enlace">${curso.link}</a>` : `<span class="curso-enlace-no-disponible">${curso.link || 'Not available'}</span>`}</p><div class="curso-etiquetas">${curso.categories ? curso.categories.map(cat => `<span class="etiqueta etiqueta-clickable" data-categoria="${cat}">${cat}</span>`).join('') : ''}</div></div><div class="curso-footer"><div class="curso-sharing"><a href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}" target="_blank" rel="noopener noreferrer" class="share-btn twitter" aria-label="Share on Twitter"><i class="fab fa-twitter"></i></a><a href="https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(curso.name)}&summary=${shareText}" target="_blank" rel="noopener noreferrer" class="share-btn linkedin" aria-label="Share on LinkedIn"><i class="fab fa-linkedin"></i></a><button class="share-btn copy-link-btn copy-link" data-link="${curso.link}" aria-label="Copy link"><i class="fas fa-link"></i></button></div><div class="curso-votacion"><button class="vote-btn" data-id="${cursoId}" data-vote="up" aria-label="Vote up"><i class="fas fa-thumbs-up"></i><span class="vote-count up-count">0</span></button><button class="vote-btn" data-id="${cursoId}" data-vote="down" aria-label="Vote down"><i class="fas fa-thumbs-down"></i><span class="vote-count down-count">0</span></button></div></div>`; cursosContainer.appendChild(cursoElement); actualizarVotosTarjeta(cursoElement); });
    }

    function actualizarVotosTarjeta(card) { const id = card.dataset.id; if (!votos[id]) { votos[id] = { userVote: null }; } const upCount = (votos[id].userVote === 'up') ? 1 : 0; const downCount = (votos[id].userVote === 'down') ? 1 : 0; card.querySelector('.up-count').textContent = upCount; card.querySelector('.down-count').textContent = downCount; card.querySelector('[data-vote="up"]').classList.toggle('voted-up', upCount > 0); card.querySelector('[data-vote="down"]').classList.toggle('voted-down', downCount > 0); }
    
    init();
});