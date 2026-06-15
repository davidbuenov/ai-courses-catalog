/* =============================================================================
   Multi-Catalog Project: AI & Unreal Engine — Shared core codebase generating separate AI Content and Unreal Engine Content Catalogs
   Copyright (c) 2026 David Bueno Vallejo · https://davidbuenov.com
   Licensed under the MIT License. See LICENSE for details.
   Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
   ============================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const searchBox = document.getElementById('search-box');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const filtroTipoSelect = document.getElementById('filtro-tipo');
    const filtroCategoriaSelect = document.getElementById('filtro-categoria');
    const filtroDificultadSelect = document.getElementById('filtro-dificultad');
    const filtrosActivosContainer = document.getElementById('filtros-activos');
    const cursosContainer = document.getElementById('cursos-container');
    const logoTitle = document.getElementById('logo-title');
    const statCount = document.getElementById('stat-count');
    const heroSlogan = document.getElementById('hero-slogan');
    const heroDesc = document.getElementById('hero-desc');
    const feat1 = document.getElementById('feat-1');
    const feat2 = document.getElementById('feat-2');
    const feat3 = document.getElementById('feat-3');
    const feat4 = document.getElementById('feat-4');
    const feat5 = document.getElementById('feat-5');

    // Dashboard-specific Views
    const dashboardView = document.getElementById('dashboard-view');
    const resultsView = document.getElementById('results-view');
    const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');
    const recentGrid = document.getElementById('recent-grid');
    const pathsContainer = document.getElementById('paths-container');
    const popularContainer = document.getElementById('popular-container');
    const categoriesCloudContainer = document.getElementById('categories-cloud-container');

    let todosLosCursos = [];
    let todasLasCategorias = {};
    let todosLosTipos = [];
    let votos = {};
    let isAICatalog = true;

    const filtros = {
        tipo: new Set(),
        categorias: new Set(),
        dificultades: new Set()
    };

    async function init() {
        // Detect Catalog type from header title or document title
        const headerTitleText = logoTitle ? logoTitle.textContent : '';
        isAICatalog = headerTitleText.toLowerCase().includes('ai');

        customizeHeroAndMetadata();
        cargarVotos();
        await cargarDatos();
        poblarFiltros();
        configurarEventListeners();
        renderizar();
    }

    function customizeHeroAndMetadata() {
        if (!isAICatalog) {
            // Customize for Unreal Engine Catalog
            if (heroSlogan) heroSlogan.innerHTML = "Crea.<br>Programa.<br>Domina.";
            if (heroDesc) heroDesc.textContent = "Discover tutorials, assets, and resources for Unreal Engine development.";
            if (feat1) feat1.textContent = "Blueprints & C++ tutorials";
            if (feat2) feat2.textContent = "Rendering & Niagara VFX";
            if (feat3) feat3.textContent = "Community updates";
            if (feat4) feat4.textContent = "Production ready tools";
            if (feat5) feat5.textContent = "Regularly updated";
            
            // Adjust Card descriptions in Hub
            const desc0 = document.getElementById('card-desc-0');
            const desc1 = document.getElementById('card-desc-1');
            const desc2 = document.getElementById('card-desc-2');
            const desc3 = document.getElementById('card-desc-3');
            if (desc0) desc0.textContent = "Gameplay and blueprint videos";
            if (desc1) desc1.textContent = "Structured courses & series";
            if (desc2) desc2.textContent = "Latest engine news & guides";
            if (desc3) desc3.textContent = "Plugins, assets & programs";
        }
    }

    async function cargarDatos() {
        try {
            const [cursosRes, categoriasRes, tiposRes] = await Promise.all([
                fetch('data/courses.json'),
                fetch('data/categories.json'),
                fetch('data/types.json')
            ]);

            todosLosCursos = await cursosRes.json();
            todasLasCategorias = await categoriasRes.json();
            todosLosTipos = await tiposRes.json();

            // Set total resources stat
            if (statCount) {
                statCount.textContent = `+${todosLosCursos.length}`;
            }

            // Customize central hub cards based on types.json
            todosLosTipos.forEach((tipo, index) => {
                const titleEl = document.querySelector(`#hub-card-${index} .card-title`);
                const countEl = document.getElementById(`count-${index}`);
                
                if (titleEl) {
                    titleEl.textContent = tipo + 's';
                }

                if (countEl) {
                    const count = todosLosCursos.filter(curso => curso.type === tipo).length;
                    countEl.textContent = `${count} resources`;
                }
            });

        } catch (error) {
            cursosContainer.innerHTML = '<p class="error">Error loading data. Please check file paths and JSON format.</p>';
            console.error('Fatal Error loading data:', error);
        }
    }

    function poblarFiltros() {
        // Clear option templates first
        filtroTipoSelect.innerHTML = '<option value="">-- All Types --</option>';
        filtroCategoriaSelect.innerHTML = '<option value="">-- All Categories --</option>';
        filtroDificultadSelect.innerHTML = '<option value="">-- All Difficulties --</option>';

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
        searchBox.addEventListener('input', () => {
            if (searchBox.value.trim().length > 0) {
                clearSearchBtn.style.display = 'block';
            } else {
                clearSearchBtn.style.display = 'none';
            }
            renderizar();
        });

        clearSearchBtn.addEventListener('click', () => {
            searchBox.value = '';
            clearSearchBtn.style.display = 'none';
            renderizar();
        });

        filtroTipoSelect.addEventListener('change', event => agregarFiltro('tipo', event.target.value));
        filtroCategoriaSelect.addEventListener('change', event => agregarFiltro('categorias', event.target.value));
        filtroDificultadSelect.addEventListener('change', event => agregarFiltro('dificultades', event.target.value));

        filtrosActivosContainer.addEventListener('click', event => {
            if (event.target.classList.contains('remove-tag')) {
                const tag = event.target.parentElement;
                quitarFiltro(tag.dataset.tipo, tag.dataset.valor);
            }
        });

        cursosContainer.addEventListener('click', handleCardActions);
        recentGrid.addEventListener('click', handleCardActions);

        // Back to Dashboard button
        if (backToDashboardBtn) {
            backToDashboardBtn.addEventListener('click', resetAllFilters);
        }

        // Central hub card click listeners
        for (let i = 0; i < 4; i++) {
            const card = document.getElementById(`hub-card-${i}`);
            if (card) {
                card.addEventListener('click', () => {
                    if (todosLosTipos[i]) {
                        agregarFiltro('tipo', todosLosTipos[i]);
                    }
                });
            }
        }
    }

    function handleCardActions(event) {
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
    }

    function resetAllFilters() {
        filtros.tipo.clear();
        filtros.categorias.clear();
        filtros.dificultades.clear();
        searchBox.value = '';
        clearSearchBtn.style.display = 'none';
        filtroTipoSelect.value = '';
        filtroCategoriaSelect.value = '';
        filtroDificultadSelect.value = '';
        renderizar();
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
        
        // Update vote displays in all containers containing card
        document.querySelectorAll(`.curso-card[data-id="${id}"]`).forEach(actualizarVotosTarjeta);
        
        // Refresh popularity sidebar to reflect changes
        renderizarPopularWidget();
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
        const hasActiveFilters = 
            searchBox.value.trim().length >= 3 ||
            filtros.tipo.size > 0 ||
            filtros.categorias.size > 0 ||
            filtros.dificultades.size > 0;

        if (hasActiveFilters) {
            // Show Search Results, Hide Dashboard
            if (dashboardView) dashboardView.style.display = 'none';
            if (resultsView) resultsView.style.display = 'flex';
            renderizarFiltrosActivos();
            renderizarCursos();
        } else {
            // Show Dashboard, Hide Search Results
            if (dashboardView) dashboardView.style.display = 'grid';
            if (resultsView) resultsView.style.display = 'none';
            renderizarFiltrosActivos();
            renderizarDashboard();
        }
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

    function renderizarDashboard() {
        renderizarRecentGrid();
        renderizarPathsWidget();
        renderizarPopularWidget();
        renderizarCategoriesCloudWidget();
    }

    function renderizarRecentGrid() {
        if (!recentGrid) return;
        
        // Sort courses by date and take the first 4
        const recentCursos = [...todosLosCursos].sort(compareCoursesByDate).slice(0, 4);
        recentGrid.innerHTML = '';

        if (recentCursos.length === 0) {
            recentGrid.innerHTML = '<p class="sin-resultados">No updates found.</p>';
            return;
        }

        recentCursos.forEach(curso => {
            const card = document.createElement('div');
            card.className = 'recent-card';
            card.dataset.id = curso.name.replace(/[^a-zA-Z0-9]/g, '');

            const typeHtml = curso.type ? `<span class="recent-card-type">${curso.type}</span>` : '';
            const formattedDate = formatCourseDate(curso.date);
            const dateHtml = formattedDate ? `<span class="recent-card-date">${formattedDate}</span>` : '';

            card.innerHTML = `
                <div class="recent-card-header">
                    ${typeHtml}
                    ${dateHtml}
                </div>
                <h3>${curso.name}</h3>
            `;
            
            // Clicking a recent card opens the item directly
            card.addEventListener('click', () => {
                if (curso.link && curso.link.startsWith('http')) {
                    window.open(curso.link, '_blank', 'noopener,noreferrer');
                }
            });

            recentGrid.appendChild(card);
        });
    }

    function renderizarPathsWidget() {
        if (!pathsContainer) return;
        pathsContainer.innerHTML = '';

        // Select 3 fixed core paths depending on the catalog type
        let selectedPaths = [];
        if (isAICatalog) {
            selectedPaths = [
                { id: "1. Fundamentals and Concepts of AI", label: "Fundamentals of AI" },
                { id: "3. AI Agents and Systems", label: "AI Agents & Systems" },
                { id: "4. AI Operations and Deployment (LLMOps)", label: "AI Operations (LLMOps)" }
            ];
        } else {
            selectedPaths = [
                { id: "Core Programming & Gameplay", label: "Gameplay & Core Code" },
                { id: "Visuals & Rendering", label: "Materials & Visuals" },
                { id: "Advanced & Platform Specific", label: "Advanced Dev & Tech" }
            ];
        }

        selectedPaths.forEach(path => {
            const item = document.createElement('div');
            item.className = 'path-item';
            
            // Count resources in this top category group
            let count = 0;
            if (todasLasCategorias[path.id]) {
                const subcategories = todasLasCategorias[path.id];
                count = todosLosCursos.filter(curso => 
                    curso.categories && curso.categories.some(cat => subcategories.includes(cat))
                ).length;
            }

            item.innerHTML = `
                <div class="path-dot"></div>
                <div class="path-content">
                    <span class="path-title">${path.label}</span>
                    <span class="path-count">${count} resources</span>
                </div>
            `;

            // Click filters by this path category group
            item.addEventListener('click', () => {
                if (todasLasCategorias[path.id]) {
                    filtros.tipo.clear();
                    filtros.categorias.clear();
                    filtros.dificultades.clear();
                    // Add all subcategories under this group
                    todasLasCategorias[path.id].forEach(subcat => {
                        filtros.categorias.add(subcat);
                    });
                    renderizar();
                }
            });

            pathsContainer.appendChild(item);
        });
    }

    function renderizarPopularWidget() {
        if (!popularContainer) return;
        popularContainer.innerHTML = '';

        // We compute popularity count based on localStorage user upvotes + pad with first few items
        const scoredCourses = todosLosCursos.map(curso => {
            const id = curso.name.replace(/[^a-zA-Z0-9]/g, '');
            const userUpvote = votos[id] && votos[id].userVote === 'up' ? 1 : 0;
            return {
                curso,
                score: userUpvote
            };
        });

        // Sort by score (upvoted first), then by date
        scoredCourses.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return compareCoursesByDate(a.curso, b.curso);
        });

        const topPopular = scoredCourses.slice(0, 5);

        topPopular.forEach((item, index) => {
            const courseEl = document.createElement('li');
            courseEl.className = 'popular-item';
            courseEl.innerHTML = `
                <span class="popular-num">${index + 1}</span>
                <div class="popular-info">
                    <span class="popular-name">${item.curso.name}</span>
                    <span class="popular-meta">${item.curso.type || 'Resource'}</span>
                </div>
            `;

            courseEl.addEventListener('click', () => {
                if (item.curso.link && item.curso.link.startsWith('http')) {
                    window.open(item.curso.link, '_blank', 'noopener,noreferrer');
                }
            });

            popularContainer.appendChild(courseEl);
        });
    }

    function renderizarCategoriesCloudWidget() {
        if (!categoriesCloudContainer) return;
        categoriesCloudContainer.innerHTML = '';

        // Gather 6 categories with most resources
        const categoryCounts = {};
        todosLosCursos.forEach(curso => {
            if (curso.categories) {
                curso.categories.forEach(cat => {
                    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
                });
            }
        });

        const sortedCategories = Object.keys(categoryCounts).sort((a, b) => categoryCounts[b] - categoryCounts[a]);
        const topCategories = sortedCategories.slice(0, 6);

        topCategories.forEach(cat => {
            const btn = document.createElement('span');
            btn.className = 'tag-cloud-item';
            btn.textContent = cat;
            btn.addEventListener('click', () => {
                manejarClickEtiqueta(btn);
            });
            categoriesCloudContainer.appendChild(btn);
        });

        // Click tag function inside helper
        function manejarClickEtiqueta(etiqueta) {
            const categoria = etiqueta.textContent;
            if (!categoria) return;
            filtros.tipo.clear();
            filtros.categorias.clear();
            filtros.dificultades.clear();
            filtros.categorias.add(categoria);
            renderizar();
        }
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
                && [...filtros.categorias].some(categoria => curso.categories.includes(categoria)));
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
            const shareText = encodeURIComponent(`Check out this content: "${curso.name}"`);
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
