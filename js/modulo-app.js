/**
 * Controlador de Leitura Dinâmica e Monitoramento do Módulo (`modulo.html`)
 */
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Obtém o ID do módulo via Query String (ex: modulo.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const moduleId = parseInt(urlParams.get('id')) || 1;

    // Busca os dados do módulo no arquivo data-course.js
    const currentModule = courseData.modules.find(m => m.id === moduleId);

    if (!currentModule) {
        alert("Módulo não encontrado!");
        window.location.href = "index.html";
        return;
    }

    // Inicialização
    initModuleTheme();
    renderModuleHeaderAndContent();
    if (typeof window.renderModuleQuiz === 'function') {
        window.renderModuleQuiz(moduleId);
    }
    setupScrollProgressTracker();

    function initModuleTheme() {
        const savedTheme = localStorage.getItem('sd_theme_pref') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        const themeBtnIcon = document.querySelector('#theme-toggle .theme-icon');
        if (themeBtnIcon) {
            themeBtnIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        }

        document.getElementById('theme-toggle').addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('sd_theme_pref', newTheme);
            if (themeBtnIcon) themeBtnIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    function renderModuleHeaderAndContent() {
        // Título e subtítulo
        document.getElementById('module-page-title').textContent = currentModule.title;
        document.getElementById('module-page-subtitle').textContent = currentModule.subtitle;

        // Renderiza as seções de texto e o sumário (TOC)
        const wrapper = document.getElementById('sections-wrapper');
        const tocNav = document.getElementById('module-toc');
        wrapper.innerHTML = '';
        tocNav.innerHTML = '';

        currentModule.sections.forEach(sec => {
            // Renderiza Seção
            const sectionEl = document.createElement('section');
            sectionEl.className = 'content-section';
            sectionEl.id = sec.id;
            sectionEl.innerHTML = `
                <h2>${sec.title}</h2>
                ${sec.content}
            `;
            wrapper.appendChild(sectionEl);

            // Renderiza Item do Sumário
            const tocLink = document.createElement('a');
            tocLink.className = 'toc-link';
            tocLink.href = `#${sec.id}`;
            tocLink.textContent = sec.title;
            tocNav.appendChild(tocLink);
        });

        // Carrega o status inicial do localStorage
        updateProgressBadgeDisplay();
    }

    function updateProgressBadgeDisplay() {
        const state = CourseProgress.getProgress();
        const modData = state.modules[String(moduleId)] || { readPercent: 0, quizScore: 0, completed: false };

        document.getElementById('reading-status').textContent = `Progresso de Leitura: ${modData.readPercent}%`;
        document.getElementById('reading-progress-fill').style.width = `${modData.readPercent}%`;

        const badge = document.getElementById('quiz-status-badge');
        if (modData.completed) {
            badge.textContent = `Quiz Concluído (${modData.quizScore}%)`;
            badge.style.color = "var(--success-color)";
        } else if (modData.quizScore > 0) {
            badge.textContent = `Nota do Quiz: ${modData.quizScore}% (Mínimo: 70%)`;
            badge.style.color = "var(--warning-color)";
        } else {
            badge.textContent = "Quiz: Pendente";
            badge.style.color = "var(--text-muted)";
        }
    }

    /**
     * Monitora o Scroll para registrar o percentual de leitura atingido
     */
    function setupScrollProgressTracker() {
        window.addEventListener('scroll', function() {
            const article = document.querySelector('.module-content');
            if (!article) return;

            const articleBox = article.getBoundingClientRect();
            const totalHeight = articleBox.height - window.innerHeight;
            
            if (totalHeight > 0) {
                const scrolled = Math.max(0, -articleBox.top);
                const percent = Math.min(100, Math.round((scrolled / totalHeight) * 100));

                // Se o usuário rolou mais de 90%, consideramos leitura 100% concluída
                const finalReadPercent = percent >= 90 ? 100 : percent;

                // Atualiza o localStorage somente se o percentual for maior que o já salvo
                const currentState = CourseProgress.getProgress();
                const currentSaved = currentState.modules[String(moduleId)]?.readPercent || 0;

                if (finalReadPercent > currentSaved) {
                    CourseProgress.updateModuleProgress(moduleId, finalReadPercent, null);
                    updateProgressBadgeDisplay();
                }
            }
        });
    }
});
