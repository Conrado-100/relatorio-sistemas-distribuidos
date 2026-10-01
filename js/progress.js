/**
 * Módulo de Gerenciamento de Progresso do Curso (localStorage)
 * Chave utilizada: 'sd_course_progress_v1'
 */
const CourseProgress = (function() {
    'use strict';

    const STORAGE_KEY = 'sd_course_progress_v1';
    const TOTAL_MODULES = 5;

    function createDefaultModule() {
        return { readPercent: 0, quizScore: 0, completed: false };
    }

    const defaultState = {
        user: {
            createdAt: new Date().toISOString(),
            lastAccess: new Date().toISOString()
        },
        modules: {
            '1': createDefaultModule(),
            '2': createDefaultModule(),
            '3': createDefaultModule(),
            '4': createDefaultModule(),
            '5': createDefaultModule()
        },
        finalExam: {
            unlocked: false,
            completed: false,
            score: null
        }
    };

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function normalizeModuleState(moduleState) {
        const safeState = moduleState || {};
        const normalized = createDefaultModule();
        normalized.readPercent = clamp(Number(safeState.readPercent) || 0, 0, 100);
        normalized.quizScore = clamp(Number(safeState.quizScore) || 0, 0, 100);
        normalized.completed = normalized.readPercent >= 100 && normalized.quizScore >= 70;
        return normalized;
    }

    function getProgress() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (!data) {
                saveProgress(JSON.parse(JSON.stringify(defaultState)));
                return JSON.parse(JSON.stringify(defaultState));
            }

            const parsed = JSON.parse(data);
            const merged = JSON.parse(JSON.stringify(defaultState));
            merged.user = { ...merged.user, ...(parsed.user || {}) };
            merged.modules = { ...merged.modules };

            for (let i = 1; i <= TOTAL_MODULES; i++) {
                const id = String(i);
                const source = parsed.modules && parsed.modules[id] ? parsed.modules[id] : {};
                merged.modules[id] = normalizeModuleState(source);
            }

            merged.finalExam = {
                unlocked: Boolean(parsed.finalExam && parsed.finalExam.unlocked),
                completed: Boolean(parsed.finalExam && parsed.finalExam.completed),
                score: parsed.finalExam && parsed.finalExam.score !== null ? parsed.finalExam.score : null
            };

            merged.finalExam.unlocked = isExamUnlocked(merged);
            return merged;
        } catch (e) {
            console.error('Erro ao ler progresso do localStorage:', e);
            return JSON.parse(JSON.stringify(defaultState));
        }
    }

    function saveProgress(progressData) {
        try {
            const state = progressData || JSON.parse(JSON.stringify(defaultState));
            state.user = state.user || {};
            state.user.lastAccess = new Date().toISOString();
            state.finalExam = state.finalExam || { unlocked: false, completed: false, score: null };
            state.modules = state.modules || {};

            for (let i = 1; i <= TOTAL_MODULES; i++) {
                const id = String(i);
                state.modules[id] = normalizeModuleState(state.modules[id]);
            }

            state.finalExam.unlocked = isExamUnlocked(state);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            return state;
        } catch (e) {
            console.error('Erro ao salvar progresso no localStorage:', e);
            return progressData;
        }
    }

    function getCourseProgress() {
        return getProgress();
    }

    function updateModuleProgress(moduleId, readPercentOrData, quizScore) {
        const state = getProgress();
        const idStr = String(moduleId);
        const moduleState = state.modules[idStr] || createDefaultModule();

        if (typeof readPercentOrData === 'object' && readPercentOrData !== null) {
            if (typeof readPercentOrData.readPercent !== 'undefined') {
                moduleState.readPercent = Math.max(moduleState.readPercent, clamp(Number(readPercentOrData.readPercent), 0, 100));
            }
            if (typeof readPercentOrData.quizScore !== 'undefined') {
                moduleState.quizScore = Math.max(moduleState.quizScore, clamp(Number(readPercentOrData.quizScore), 0, 100));
            }
        } else {
            if (typeof readPercentOrData !== 'undefined' && readPercentOrData !== null) {
                moduleState.readPercent = Math.max(moduleState.readPercent, clamp(Number(readPercentOrData), 0, 100));
            }
            if (typeof quizScore !== 'undefined' && quizScore !== null) {
                moduleState.quizScore = Math.max(moduleState.quizScore, clamp(Number(quizScore), 0, 100));
            }
        }

        state.modules[idStr] = normalizeModuleState(moduleState);
        state.finalExam.unlocked = isExamUnlocked(state);
        saveProgress(state);
        return state;
    }

    function getGlobalStats() {
        const state = getProgress();
        let totalPercentSum = 0;
        let completedCount = 0;

        for (let i = 1; i <= TOTAL_MODULES; i++) {
            const mod = state.modules[String(i)] || createDefaultModule();
            const modPercent = Math.round((mod.readPercent * 0.5) + (mod.quizScore * 0.5));
            totalPercentSum += modPercent;
            if (mod.completed) {
                completedCount++;
            }
        }

        const overallPercent = Math.round(totalPercentSum / TOTAL_MODULES);

        return {
            overallPercent,
            completedCount,
            totalModules: TOTAL_MODULES,
            examUnlocked: isExamUnlocked(state)
        };
    }

    function isExamUnlocked(stateObj) {
        const state = stateObj || getProgress();
        for (let i = 1; i <= TOTAL_MODULES; i++) {
            const mod = state.modules[String(i)] || createDefaultModule();
            if (!mod.completed) {
                return false;
            }
        }
        return true;
    }

    function resetAllProgress() {
        const freshState = JSON.parse(JSON.stringify(defaultState));
        saveProgress(freshState);
        return freshState;
    }

    return {
        getProgress,
        getCourseProgress,
        updateModuleProgress,
        getGlobalStats,
        isExamUnlocked,
        resetAllProgress
    };
})();
