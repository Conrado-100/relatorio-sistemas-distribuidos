/**
 * Controlador Principal da Interface do Dashboard (`index.html`)
 */
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Definição dos Módulos do Curso (Mapeados rigorosamente das Aulas 01, 02 e 03)
    const courseModules = [
        {
            id: 1,
            title: "Módulo 1: Fundamentos de SO, Concorrência e IPC",
            description: "Revisão de processos, troca de contexto, PCB, escalonamento, comunicação por mensagens/memória compartilhada, e sincronização (Race Condition, Região Crítica e Mutex).",
            estimatedTime: "2h 30min"
        },
        {
            id: 2,
            title: "Módulo 2: Conceitos de SD, Middleware e Execução Remota",
            description: "Definição de Sistemas Distribuídos, visão de transparência, clusters, arquitetura de Middleware, interceptadores e execução remota (IDL, Stubs e chamadas RPC).",
            estimatedTime: "2h 00min"
        },
        {
            id: 3,
            title: "Módulo 3: Transações ACID, Arquiteturas e Redes P2P",
            description: "Garantias ACID em transações, arquiteturas centralizadas vs descentralizadas, P2P estruturado (DHT), redes não estruturadas, Superpares e modelos híbridos.",
            estimatedTime: "2h 15min"
        },
        {
            id: 4,
            title: "Módulo 4: Sistemas de Arquivos Distribuídos (DFS)",
            description: "Arquivos de rede vs distribuídos, montagem em Unix, e os 5 pilares: transparência, escalabilidade, segurança, tolerância a falhas (idempotência) e consistência.",
            estimatedTime: "2h 45min"
        }
    ];

    // Inicialização da Aplicação
    initTheme();
    renderDashboard();
    setupEventListeners();

    /**
     * Configura o tema (Modo Claro/Escuro) baseado na preferência do usuário
     */
    function initTheme() {
        const savedTheme = localStorage.getItem('sd_theme_pref') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('sd_theme_pref', newTheme);
        updateThemeIcon(newTheme);
    }

    function updateThemeIcon(theme) {
        const themeBtnIcon = document.querySelector('#theme-toggle .theme-icon');
        if (themeBtnIcon) {
            themeBtnIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    /**
     * Renderiza e atualiza todas as seções do Dashboard
     */
    function renderDashboard() {
        const stats = CourseProgress.getGlobalStats();
        const progressState = CourseProgress.getProgress();

        // 1. Atualiza Painel de Progresso Global
        document.getElementById('global-percentage').textContent = `${stats.overallPercent}%`;
        document.getElementById('global-progress-fill').style.width = `${stats.overallPercent}%`;
        document.getElementById('completed-modules-count').textContent = `${stats.completedCount}/${stats.totalModules}`;
        
        const examStatusLabel = document.getElementById('final-exam-status');
        if (stats.examUnlocked) {
            examStatusLabel.textContent = "Liberado!";
            examStatusLabel.style.color = "var(--success-color)";
        } else {
            examStatusLabel.textContent = "Bloqueado";
            examStatusLabel.style.color = "var(--text-muted)";
        }

        // 2. Renderiza os Cards dos Módulos
        const grid = document.getElementById('modules-grid');
        grid.innerHTML = '';

        courseModules.forEach(mod => {
            const modData = progressState.modules[String(mod.id)] || { readPercent: 0, quizScore: 0, completed: false };
            const modPercent = Math.round((modData.readPercent * 0.5) + (modData.quizScore * 0.5));

            let statusClass = "status-pendente";
            let statusText = "Pendente";

            if (modData.completed) {
                statusClass = "status-concluido";
                statusText = "Concluído";
            } else if (modData.readPercent > 0 || modData.quizScore > 0) {
                statusClass = "status-andamento";
                statusText = "Em Andamento";
            }

            const card = document.createElement('article');
            card.className = 'module-card';
            card.innerHTML = `
                <div>
                    <div class="module-card-header">
                        <span class="module-number">Módulo 0${mod.id}</span>
                        <span class="module-status-badge ${statusClass}">${statusText}</span>
                    </div>
                    <h3 class="module-title">${mod.title}</h3>
                    <p class="module-description">${mod.description}</p>
                </div>
                <div class="module-card-footer">
                    <div class="module-progress-info">
                        <span>Progresso</span>
                        <span><strong>${modPercent}%</strong></span>
                    </div>
                    <div class="progress-bar-bg" style="margin-bottom: 1rem; height: 6px;">
                        <div class="progress-bar-fill" style="width: ${modPercent}%;"></div>
                    </div>
                    <a href="modulo.html?id=${mod.id}" class="btn-primary">
                        ${modData.completed ? 'Revisar Módulo' : (modPercent > 0 ? 'Continuar' : 'Iniciar Módulo')}
                    </a>
                </div>
            `;
            grid.appendChild(card);
        });

        // 3. Atualiza Seção das Questões Finais
        const examCard = document.getElementById('final-exam-card');
        const examBadge = document.getElementById('exam-badge');
        const examBtn = document.getElementById('exam-button');

        if (stats.examUnlocked) {
            examCard.classList.remove('locked');
            examCard.classList.add('unlocked');
            examBadge.textContent = "🔓 Liberado";
            examBtn.classList.remove('disabled');
            examBtn.removeAttribute('aria-disabled');
        } else {
            examCard.classList.remove('unlocked');
            examCard.classList.add('locked');
            examBadge.textContent = "🔒 Bloqueado";
            examBtn.classList.add('disabled');
            examBtn.setAttribute('aria-disabled', 'true');
        }
    }

    /**
     * Event Listeners
     */
    function setupEventListeners() {
        // Toggle Modo Escuro
        document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

        // Reset de Progresso
        document.getElementById('reset-progress').addEventListener('click', function() {
            if (confirm("Tem certeza que deseja resetar todo o seu progresso no curso? Esta ação não pode ser desfeita.")) {
                CourseProgress.resetAllProgress();
                renderDashboard();
                alert("O progresso foi reiniciado com sucesso.");
            }
        });
    }
});
