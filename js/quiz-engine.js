(function() {
    'use strict';

    function getQuestionBank() {
        if (typeof courseQuestions !== 'undefined') {
            return courseQuestions;
        }
        return window.courseQuestions || { modules: {}, finalExam: {} };
    }

    function buildQuestionMarkup(question, index) {
        const optionsMarkup = question.options.map((option) => {
            return `
                <label class="option-item">
                    <input type="radio" name="question-${question.id}" value="${option.key}" required>
                    <span class="option-letter">${option.key}</span>
                    <span>${option.text}</span>
                </label>
            `;
        }).join('');

        return `
            <div class="question-card">
                <h3>Pergunta ${index}</h3>
                <p>${question.question}</p>
                <div class="options-list">${optionsMarkup}</div>
            </div>
        `;
    }

    function buildResultMarkup(score, results, questionList) {
        const success = score >= 70;
        const summary = `
            <div class="quiz-summary ${success ? 'success' : 'warning'}">
                <strong>${success ? 'Parabéns!' : 'Foco no conteúdo'}</strong>
                <p>Você acertou ${results.filter(Boolean).length} de ${questionList.length} questões.</p>
                <p>Percentual: <strong>${score}%</strong></p>
            </div>
        `;

        const detail = questionList.map((question, index) => {
            const selected = results[index];
            const correct = selected === question.answer;
            const answerLabel = question.options.find((option) => option.key === question.answer)?.text || 'Resposta correta';
            return `
                <div class="result-item ${correct ? 'correct' : 'incorrect'}">
                    <p><strong>Questão ${index + 1}:</strong> ${correct ? 'Acertou' : 'Errou'}.</p>
                    <p><strong>Resposta correta:</strong> ${question.answer} - ${answerLabel}</p>
                    <p><strong>Explicação:</strong> ${question.explanation}</p>
                </div>
            `;
        }).join('');

        return `${summary}${detail}`;
    }

    function renderModuleQuiz(moduleId) {
        const container = document.getElementById('quiz-container');
        if (!container) {
            return;
        }

        const bank = getQuestionBank();
        const moduleData = bank.modules[String(moduleId)] || { objective: [], discursive: [] };
        const questions = moduleData.objective || [];

        if (!questions.length) {
            container.innerHTML = '<p class="empty-state">Ainda não há questões objetivas para este módulo.</p>';
            return;
        }

        const form = document.createElement('form');
        form.className = 'quiz-form';
        form.innerHTML = `
            <div class="quiz-list">${questions.map((question, index) => buildQuestionMarkup(question, index + 1)).join('')}</div>
            <button type="submit" class="btn-primary quiz-submit-btn">Enviar Respostas</button>
        `;

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            let correctCount = 0;
            const selectedAnswers = [];

            questions.forEach((question) => {
                const selected = formData.get(`question-${question.id}`) || '';
                selectedAnswers.push(selected);
                if (selected === question.answer) {
                    correctCount += 1;
                }
            });

            const percentage = Math.round((correctCount / questions.length) * 100);
            const resultMarkup = buildResultMarkup(percentage, selectedAnswers, questions);
            const resultBox = document.createElement('div');
            resultBox.className = 'quiz-result-box';
            resultBox.innerHTML = resultMarkup;

            form.querySelectorAll('input').forEach((input) => {
                input.disabled = true;
            });
            const submitBtn = form.querySelector('.quiz-submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Quiz Enviado';
            }

            const quizScoreState = CourseProgress.getProgress();
            const moduleState = quizScoreState.modules[String(moduleId)] || { readPercent: 0, quizScore: 0, completed: false };
            moduleState.quizScore = Math.max(moduleState.quizScore, percentage);
            CourseProgress.updateModuleProgress(moduleId, { readPercent: moduleState.readPercent, quizScore: percentage });

            const badge = document.getElementById('quiz-status-badge');
            if (badge) {
                if (percentage >= 70) {
                    badge.textContent = `Quiz Concluído (${percentage}%)`;
                    badge.style.color = 'var(--success-color)';
                } else {
                    badge.textContent = `Nota do Quiz: ${percentage}% (Mínimo: 70%)`;
                    badge.style.color = 'var(--warning-color)';
                }
            }

            const summaryBlock = form.parentElement.querySelector('.quiz-result-box');
            if (summaryBlock) summaryBlock.remove();
            form.parentElement.appendChild(resultBox);
        });

        container.innerHTML = '';
        container.appendChild(form);

        const discursive = moduleData.discursive || [];
        if (discursive.length) {
            const discursiveContainer = document.createElement('div');
            discursiveContainer.className = 'discursive-quiz-block';
            discursive.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'discursive-card';
                card.innerHTML = `
                    <h3>Questão discursiva ${index + 1}</h3>
                    <p>${item.prompt}</p>
                    <textarea id="discursive-${item.id}" rows="6" maxlength="1800" aria-label="Resposta discursiva ${index + 1}" placeholder="Responda em texto livre, descrevendo os conceitos principais."></textarea>
                    <button type="button" class="btn-primary discursive-submit">Corrigir Resposta</button>
                    <div class="discursive-feedback" aria-live="polite"></div>
                `;

                const button = card.querySelector('.discursive-submit');
                button.addEventListener('click', function() {
                    const textarea = card.querySelector('textarea');
                    const feedback = card.querySelector('.discursive-feedback');
                    const response = textarea.value.trim();

                    if (!response) {
                        feedback.innerHTML = '<div class="alert error">Resposta vazia. Escreva uma explicação para receber a correção.</div>';
                        return;
                    }

                    const result = window.DiscursiveEngine.evaluateEssay(response, item.criteria);
                    const statusClass = result.score >= 70 ? 'success' : 'warning';
                    feedback.innerHTML = `
                        <div class="alert ${statusClass}">
                            <strong>${result.status} — ${result.score}% dos conceitos essenciais identificados.</strong>
                            <p>Conceitos identificados: ${result.identified.length > 0 ? result.identified.join(', ') : 'nenhum'}.</p>
                            <p><strong>Resposta esperada:</strong> ${item.expected}</p>
                        </div>
                    `;
                });

                discursiveContainer.appendChild(card);
            });
            container.appendChild(discursiveContainer);
        }
    }

    function renderFinalExamQuiz() {
        const container = document.getElementById('final-exam-questions');
        if (!container) {
            return;
        }

        const bank = getQuestionBank();
        const exam = bank.finalExam || { objective: [], discursive: [] };
        const questions = exam.objective || [];

        if (!questions.length) {
            container.innerHTML = '<p class="empty-state">O simulado final ainda não está disponível.</p>';
            return;
        }

        const form = document.createElement('form');
        form.className = 'quiz-form';
        form.innerHTML = `
            <div class="quiz-list">${questions.map((question, index) => buildQuestionMarkup(question, index + 1)).join('')}</div>
            <button type="submit" class="btn-primary quiz-submit-btn">Finalizar Simulado</button>
        `;

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            let correctCount = 0;
            const selectedAnswers = [];

            questions.forEach((question) => {
                const selected = formData.get(`question-${question.id}`) || '';
                selectedAnswers.push(selected);
                if (selected === question.answer) {
                    correctCount += 1;
                }
            });

            const percentage = Math.round((correctCount / questions.length) * 100);
            const resultMarkup = buildResultMarkup(percentage, selectedAnswers, questions);
            const resultBox = document.createElement('div');
            resultBox.className = 'quiz-result-box';
            resultBox.innerHTML = resultMarkup;

            form.querySelectorAll('input').forEach((input) => {
                input.disabled = true;
            });
            const submitBtn = form.querySelector('.quiz-submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Simulado Finalizado';
            }

            const summaryBlock = form.parentElement.querySelector('.quiz-result-box');
            if (summaryBlock) summaryBlock.remove();
            form.parentElement.appendChild(resultBox);
        });

        const discursive = exam.discursive || [];
        const discursiveContainer = document.createElement('div');
        discursiveContainer.className = 'discursive-quiz-block';

        discursive.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'discursive-card';
            card.innerHTML = `
                <h3>Questão discursiva ${index + 1}</h3>
                <p>${item.prompt}</p>
                <textarea id="final-discursive-${item.id}" rows="6" maxlength="1800" aria-label="Resposta discursiva do simulado final" placeholder="Descreva os conceitos essenciais de forma clara."></textarea>
                <button type="button" class="btn-primary discursive-submit">Avaliar Resposta</button>
                <div class="discursive-feedback" aria-live="polite"></div>
            `;

            const button = card.querySelector('.discursive-submit');
            button.addEventListener('click', function() {
                const textarea = card.querySelector('textarea');
                const feedback = card.querySelector('.discursive-feedback');
                const response = textarea.value.trim();

                if (!response) {
                    feedback.innerHTML = '<div class="alert error">Escreva uma resposta para que a avaliação possa ocorrer.</div>';
                    return;
                }

                const result = window.DiscursiveEngine.evaluateEssay(response, item.criteria);
                const statusClass = result.score >= 70 ? 'success' : 'warning';
                feedback.innerHTML = `
                    <div class="alert ${statusClass}">
                        <strong>${result.status} — ${result.score}% dos conceitos essenciais identificados.</strong>
                        <p>Conceitos identificados: ${result.identified.length > 0 ? result.identified.join(', ') : 'nenhum'}.</p>
                        <p><strong>Resposta esperada:</strong> ${item.expected}</p>
                    </div>
                `;
            });

            discursiveContainer.appendChild(card);
        });

        container.innerHTML = '';
        container.appendChild(form);
        if (discursive.length) {
            container.appendChild(discursiveContainer);
        }
    }

    window.renderModuleQuiz = renderModuleQuiz;
    window.renderFinalExamQuiz = renderFinalExamQuiz;
})();
