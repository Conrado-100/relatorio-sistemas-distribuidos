(function() {
    'use strict';

    function normalizeText(text) {
        return String(text || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function tokenize(text) {
        return normalizeText(text).split(' ').filter(Boolean);
    }

    function evaluateEssay(responseText, criteria) {
        const answer = normalizeText(responseText || '');
        const totalConcepts = Array.isArray(criteria) ? criteria.length : 0;
        if (!totalConcepts) {
            return {
                score: 0,
                matched: 0,
                total: 0,
                status: 'Resposta precisa ser revisada',
                coverage: 0,
                identified: []
            };
        }

        const identified = [];
        criteria.forEach((criterion) => {
            const normalizedCriterion = normalizeText(criterion);
            const words = tokenize(criterion).filter((word) => word.length > 2);
            if (!words.length) {
                return;
            }

            const matchCount = words.filter((word) => answer.includes(word)).length;
            const threshold = Math.max(1, Math.ceil(words.length * 0.5));
            if (matchCount >= threshold) {
                identified.push(criterion);
            }
        });

        const matched = identified.length;
        const score = Math.round((matched / totalConcepts) * 100);
        const coverage = Math.min(100, Math.max(0, score));
        const status = coverage >= 70 ? 'Resposta adequada' : 'Resposta precisa ser revisada';

        return {
            score: coverage,
            matched,
            total: totalConcepts,
            status,
            coverage,
            identified
        };
    }

    window.DiscursiveEngine = {
        evaluateEssay
    };
})();
