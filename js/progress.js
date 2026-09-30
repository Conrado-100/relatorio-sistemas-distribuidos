/**
 * Módulo de Gerenciamento de Progresso do Curso (localStorage)
 * Chave utilizada: 'sd_course_progress_v1'
 */
const CourseProgress = (function() {
    'use strict';

    const STORAGE_KEY = 'sd_course_progress_v1';
    const TOTAL_MODULES = 4;

    // Estado inicial padrão do curso
    const defaultState = {
        user: {
            createdAt: new Date().toISOString(),
            lastAccess: new Date().toISOString()
        },
        modules: {
            "1": { readPercent: 0, quizScore: 0, completed: false },
            "2": { readPercent: 0, quizScore: 0, completed: false },
            "3": { readPercent: 0, quizScore: 0, completed: false },
            "4": { readPercent: 0, quizScore: 0, completed: false }
        },
        finalExam: {
            unlocked: false,
            completed: false,
            score: null
        }
    };

    /**
     * Recupera o progresso atual do localStorage ou cria o padrão
     */
    function getProgress() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (!data) {
                saveProgress(defaultState);
                return defaultState;
            }
            const parsed = JSON.parse(data);
            return parsed;
        } catch (e) {
            console.error("Erro ao ler progresso do localStorage:", e);
            return defaultState;
        }
    }

    /**
     * Persiste o objeto de progresso no localStorage
     */
    function saveProgress(progressData) {
        try {
            progressData.user.lastAccess = new Date().toISOString();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
        } catch (e) {
            console.error("Erro ao salvar progresso no localStorage:", e);
        }
    }

    /**
     * Atualiza o progresso específico de um módulo
     * @param {string|number} moduleId - ID do módulo (1 a 4)
     * @param {number} readPercent - Porcentagem de leitura do conteúdo (0-100)
     * @param {number} quizScore - Nota do quiz do módulo (0-100)
     */
    function updateModuleProgress(moduleId, readPercent, quizScore) {
        const state = getProgress();
        const idStr = String(moduleId);

        if (!state.modules[idStr]) {
            state.modules[idStr] = { readPercent: 0, quizScore: 0, completed: false };
        }

        const mod = state.modules[idStr];
        
        if (readPercent !== undefined && readPercent !== null) {
            mod.readPercent = Math.min(100, Math.max(mod.readPercent, readPercent));
        }
        
        if (quizScore !== undefined && quizScore !== null) {
            mod.quizScore = Math.max(mod.quizScore, quizScore);
        }

        // Regra de Conclusão: Leitura 100% E Quiz >= 70%
        if (mod.readPercent >= 100 && mod.quizScore >= 70) {
            mod.completed = true;
        }

        // Verifica se todas as etapas estão concluídas para liberar a avaliação final
        state.finalExam.unlocked = isExamUnlocked(state);

        saveProgress(state);
        return state;
    }

    /**
     * Calcula as estatísticas globais do progresso do curso
     */
    function getGlobalStats() {
        const state = getProgress();
        let totalPercentSum = 0;
        let completedCount = 0;

        for (let i = 1; i <= TOTAL_MODULES; i++) {
            const mod = state.modules[String(i)];
            if (mod) {
                // Cada módulo tem 50% de peso em leitura e 50% em quiz
                const modPercent = (mod.readPercent * 0.5) + (mod.quizScore * 0.5);
                totalPercentSum += modPercent;
                if (mod.completed) {
                    completedCount++;
                }
            }
        }

        const overallPercent = Math.round(totalPercentSum / TOTAL_MODULES);
        const examUnlocked = completedCount === TOTAL_MODULES;

        return {
            overallPercent,
            completedCount,
            totalModules: TOTAL_MODULES,
            examUnlocked
        };
    }

    /**
     * Verifica se o Simulado Final pode ser desbloqueado
     */
    function isExamUnlocked(stateObj) {
        const state = stateObj || getProgress();
        for (let i = 1; i <= TOTAL_MODULES; i++) {
            const mod = state.modules[String(i)];
            if (!mod || !mod.completed) {
                return false;
            }
        }
        return true;
    }

    /**
     * Reseta todo o progresso do aluno para o estado inicial
     */
    function resetAllProgress() {
        saveProgress(defaultState);
        return defaultState;
    }

    // API pública exposta
    return {
        getProgress,
        updateModuleProgress,
        getGlobalStats,
        isExamUnlocked,
        resetAllProgress
    };
})();
