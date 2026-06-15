document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-box');
    const filtroTipoSelect = document.getElementById('filtro-tipo');
    const filtroCategoriaSelect = document.getElementById('filtro-categoria');
    const filtroDificultadSelect = document.getElementById('filtro-dificultad');
    const filtrosActivosContainer = document.getElementById('filtros-activos');
    const cursosContainer = document.getElementById('cursos-container');
    const headerCountersContainer = document.getElementById('header-info-counters');
    const ultimaActualizacionContainer = document.getElementById('ultima-actualizacion-container');
    const ultimaActualizacionSpan = document.getElementById('ultima-actualizacion');

    let todosLosCursos = [];
    let todasLasCategorias = {};
    let todosLosTipos = [];
    let votos = {};

    const filtros = {
        tipo: new Set(),
        categorias: new Set(),
        dificultades: new Set()
    };

    async function init() {
        cargarVotos();
        await cargarDatos();
        poblarFiltros();
        configurarEventListeners();
        renderizar();
    }

    async function cargarDatos() {
        try {
            const [cursosRes, categoriasRes, tiposRes] = await Promise.all([
                fetch('data/courses.json'),
                fetch('data/categories.json'),
                fetch('data/types.json')
            ]);

            const lastModifiedHeader = cursosRes.headers.get('Last-Modified');
            if (lastModifiedHeader && ultimaActualizacionContainer && ultimaActualizacionSpan) {
                const lastModifiedDate = new Date(lastModifiedHeader);
                ultimaActualizacionSpan.textContent = lastModifiedDate.toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                });
                ultimaActualizacionContainer.style.display = 'inline';
            }

            todosLosCursos = await cursosRes.json();
            todasLasCategorias = await categoriasRes.json();
            todosLosTipos = await tiposRes.json();

            let countersHtml = '';
            todosLosTipos.forEach(tipo => {
                const count = todosLosCursos.filter(curso => curso.type === tipo).length;
                if (count > 0) {
                    countersHtml += `<span>${tipo}s: <strong>${count}</strong></span>`;
                }
            });
            headerCountersContainer.innerHTML = countersHtml;
        } catch (error) {
            cursosContainer.innerHTML = '<p class="error">Error loading data. Please check file paths and JSON format.</p>';
            console.error('Fatal Error loading data:', error);
        }
    }

    function poblarFiltros() {
        todosLosTipos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo;
            option.textContent = tipo;
            filtroTipoSelect.appendChild(option);
        });

        for (const categoriaGrupo in todasLasCategorias) {
            const optgroup = document.createElement('optgroup');
            optgroup.label = categoriaGrupo;

            todasLasCategorias[categoriaGrupo].forEach(subcategoria => {
                const option = document.createElement('option');
                option.value = subcategoria;
                option.textContent = subcategoria;
                optgroup.appendChild(option);
            });

            filtroCategoriaSelect.appendChild(optgroup);
        }

        const dificultades = [...new Set(todosLosCursos.map(curso => curso.difficulty).filter(Boolean))];
        dificultades.sort().forEach(dificultad => {
            const option = document.createElement('option');
            option.value = dificultad;
            option.textContent = dificultad;
            filtroDificultadSelect.appendChild(option);
        });
    }

    function cargarVotos() {
        const votosGuardados = localStorage.getItem('cursosVotosIA');
        votos = votosGuardados ? JSON.parse(votosGuardados) : {};
    }

    function guardarVotos() {
        localStorage.setItem('cursosVotosIA', JSON.stringify(votos));
    }

    function configurarEventListeners() {
        searchBox.addEventListener('input', renderizar);
        filtroTipoSelect.addEventListener('change', event => agregarFiltro('tipo', event.target.value));
        filtroCategoriaSelect.addEventListener('change', event => agregarFiltro('categorias', event.target.value));
        filtroDificultadSelect.addEventListener('change', event => agregarFiltro('dificultades', event.target.value));

        filtrosActivosContainer.addEventListener('click', event => {
            if (event.target.classList.contains('remove-tag')) {
                const tag = event.target.parentElement;
                quitarFiltro(tag.dataset.tipo, tag.dataset.valor);
            }
        });

        cursosContainer.addEventListener('click', event => {
            const voteButton = event.target.closest('.vote-btn');
            const copyButton = event.target.closest('.copy-link-btn');
            const tag = event.target.closest('.etiqueta-clickable');

            if (voteButton) {
                manejarClickVoto(voteButton);
            } else if (copyButton) {
                handleCopyLink(copyButton);
            } else if (tag) {
                manejarClickEtiqueta(tag);
            }
        });
    }

    function agregarFiltro(tipo, valor) {
        if (!valor || filtros[tipo].has(valor)) {
            return;
        }

        filtros[tipo].add(valor);
        renderizar();

        if (tipo === 'tipo') {
            filtroTipoSelect.value = '';
        }
        if (tipo === 'categorias') {
            filtroCategoriaSelect.value = '';
        }
        if (tipo === 'dificultades') {
            filtroDificultadSelect.value = '';
        }
    }

    function quitarFiltro(tipo, valor) {
        filtros[tipo].delete(valor);
        renderizar();
    }

    function manejarClickVoto(boton) {
        const id = boton.dataset.id;
        const voto = boton.dataset.vote;

        if (!votos[id]) {
            votos[id] = {};
        }

        votos[id].userVote = votos[id].userVote === voto ? null : voto;
        guardarVotos();
        actualizarVotosTarjeta(boton.closest('.curso-card'));
    }

    function manejarClickEtiqueta(etiqueta) {
        const categoria = etiqueta.dataset.categoria;

        if (!categoria) {
            return;
        }

        filtros.tipo.clear();
        filtros.categorias.clear();
        filtros.dificultades.clear();
        filtros.categorias.add(categoria);
        renderizar();
    }

    function handleCopyLink(button) {
        const link = button.dataset.link;

        if (!link) {
            return;
        }

        navigator.clipboard.writeText(link).then(() => {
            const originalContent = button.innerHTML;
            button.innerHTML = 'Copied!';
            button.disabled = true;

            setTimeout(() => {
                button.innerHTML = originalContent;
                button.disabled = false;
            }, 2000);
        }).catch(error => console.error('Failed to copy link: ', error));
    }

    function parseCourseDate(dateText) {
        if (!dateText || typeof dateText !== 'string') {
            return null;
        }

        const timestamp = Date.parse(`${dateText}T00:00:00Z`);
        return Number.isNaN(timestamp) ? null : timestamp;
    }

    function formatCourseDate(dateText) {
        const timestamp = parseCourseDate(dateText);

        if (timestamp === null) {
            return null;
        }

        return new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(new Date(timestamp));
    }

    function compareCoursesByDate(leftCourse, rightCourse) {
        const leftTimestamp = parseCourseDate(leftCourse.date);
        const rightTimestamp = parseCourseDate(rightCourse.date);

        if (leftTimestamp === rightTimestamp) {
            return 0;
        }
        if (leftTimestamp === null) {
            return 1;
        }
        if (rightTimestamp === null) {
            return -1;
        }

        return rightTimestamp - leftTimestamp;
    }

    function renderizar() {
        renderizarFiltrosActivos();
        renderizarCursos();
    }

    function renderizarFiltrosActivos() {
        filtrosActivosContainer.innerHTML = '';

        ['tipo', 'categorias', 'dificultades'].forEach(tipo => {
            filtros[tipo].forEach(valor => {
                const tagClass = tipo === 'tipo' ? 'tipo' : (tipo === 'categorias' ? 'categoria' : 'dificultad');
                filtrosActivosContainer.innerHTML += `<div class="filtro-tag ${tagClass}" data-tipo="${tipo}" data-valor="${valor}">${valor}<span class="remove-tag">×</span></div>`;
            });
        });
    }

    function renderizarCursos() {
        let cursosFiltrados = todosLosCursos;
        const searchText = searchBox.value.trim().toLowerCase();

        if (searchText.length >= 3) {
            cursosFiltrados = cursosFiltrados.filter(curso => curso.name.toLowerCase().includes(searchText)
                || (curso.description && curso.description.toLowerCase().includes(searchText))
                || (curso.categories && curso.categories.join(' ').toLowerCase().includes(searchText)));
        }

        if (filtros.tipo.size > 0) {
            cursosFiltrados = cursosFiltrados.filter(curso => filtros.tipo.has(curso.type));
        }

        if (filtros.categorias.size > 0) {
            cursosFiltrados = cursosFiltrados.filter(curso => curso.categories
                && [...filtros.categorias].every(categoria => curso.categories.includes(categoria)));
        }

        if (filtros.dificultades.size > 0) {
            cursosFiltrados = cursosFiltrados.filter(curso => filtros.dificultades.has(curso.difficulty));
        }

        cursosFiltrados = [...cursosFiltrados].sort(compareCoursesByDate);
        cursosContainer.innerHTML = '';

        if (cursosFiltrados.length === 0) {
            cursosContainer.innerHTML = '<p class="sin-resultados">No content found matching the selected filters.</p>';
            return;
        }

        cursosFiltrados.forEach(curso => {
            const cursoElement = document.createElement('div');
            const cursoId = curso.name.replace(/[^a-zA-Z0-9]/g, '');
            const typeHtml = curso.type ? `<span class="curso-tipo">${curso.type}</span>` : '';
            const difficultyHtml = curso.difficulty
                ? `<span class="curso-dificultad difficulty-${curso.difficulty.toLowerCase().replace(/\s/g, '-')}">${curso.difficulty}</span>`
                : '';
            const formattedDate = formatCourseDate(curso.date);
            const dateHtml = formattedDate
                ? `<p class="course-date">Catalog entry: <time datetime="${curso.date}">${formattedDate}</time></p>`
                : '<p class="course-date course-date-missing">Catalog entry: unavailable</p>';
            const shareText = encodeURIComponent(`Check out this AI content: "${curso.name}"`);
            const shareUrl = encodeURIComponent(curso.link || window.location.href);

            cursoElement.className = 'curso-card';
            cursoElement.dataset.id = cursoId;
            cursoElement.innerHTML = `
                <div class="curso-header">
                    <h3>${curso.name}</h3>
                    <div class="curso-meta-info">${typeHtml}${difficultyHtml}</div>
                </div>
                <div class="curso-body">
                    ${curso.description ? `<p class="course-description">${curso.description}</p>` : ''}
                    ${dateHtml}
                    <p>
                        ${(curso.link && curso.link.startsWith('http'))
                            ? `<a href="${curso.link}" target="_blank" rel="noopener noreferrer" class="curso-enlace">${curso.link}</a>`
                            : `<span class="curso-enlace-no-disponible">${curso.link || 'Not available'}</span>`}
                    </p>
                    <div class="curso-etiquetas">
                        ${curso.categories
                            ? curso.categories.map(categoria => `<span class="etiqueta etiqueta-clickable" data-categoria="${categoria}">${categoria}</span>`).join('')
                            : ''}
                    </div>
                </div>
                <div class="curso-footer">
                    <div class="curso-sharing">
                        <a href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}" target="_blank" rel="noopener noreferrer" class="share-btn twitter" aria-label="Share on Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(curso.name)}&summary=${shareText}" target="_blank" rel="noopener noreferrer" class="share-btn linkedin" aria-label="Share on LinkedIn"><i class="fab fa-linkedin"></i></a>
                        <button class="share-btn copy-link-btn copy-link" data-link="${curso.link}" aria-label="Copy link"><i class="fas fa-link"></i></button>
                    </div>
                    <div class="curso-votacion">
                        <button class="vote-btn" data-id="${cursoId}" data-vote="up" aria-label="Upvote"><i class="fas fa-thumbs-up"></i><span class="vote-count up-count">0</span></button>
                        <button class="vote-btn" data-id="${cursoId}" data-vote="down" aria-label="Downvote"><i class="fas fa-thumbs-down"></i><span class="vote-count down-count">0</span></button>
                    </div>
                </div>`;

            cursosContainer.appendChild(cursoElement);
            actualizarVotosTarjeta(cursoElement);
        });
    }

    function actualizarVotosTarjeta(card) {
        const id = card.dataset.id;

        if (!votos[id]) {
            votos[id] = { userVote: null };
        }

        const upCount = votos[id].userVote === 'up' ? 1 : 0;
        const downCount = votos[id].userVote === 'down' ? 1 : 0;

        card.querySelector('.up-count').textContent = upCount;
        card.querySelector('.down-count').textContent = downCount;
        card.querySelector('[data-vote="up"]').classList.toggle('voted-up', upCount > 0);
        card.querySelector('[data-vote="down"]').classList.toggle('voted-down', downCount > 0);
    }

    init();
});
