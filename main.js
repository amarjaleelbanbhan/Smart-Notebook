// Smart Study Notes - Enhanced JavaScript Functionality
// Modern educational app with AI integration and advanced features

class SmartStudyApp {
    constructor() {
        this.currentNotes = null;
        this.studySession = null;
        this.userProgress = this.loadProgress();
        this.init();
    }

    init() {
        this.initEventListeners();
        this.initAnimations();
        this.loadUserData();
        this.setupServiceWorker();
    }

    // AI Integration Module
    async generateNotes(inputText, subject = 'auto') {
        const loader = document.getElementById('loader');
        const outputDiv = document.getElementById('output');
        
        if (!inputText.trim()) {
            this.showNotification('Please enter some content to generate notes!', 'warning');
            return;
        }

        this.showLoader(true);

        try {
            // Simulate AI processing (replace with actual API call)
            const notes = await this.callAIAPI(inputText, subject);
            
            this.currentNotes = notes;
            this.displayNotes(notes);
            this.saveNotesToHistory(notes);
            this.updateProgress('notes_generated', 1);
            
            // Initialize study tools
            this.initQuizSystem();
            this.initFlashcardSystem();
            this.initDiagramGenerator();
            
        } catch (error) {
            console.error('Error generating notes:', error);
            this.showNotification('Failed to generate notes. Please try again.', 'error');
        } finally {
            this.showLoader(false);
        }
    }

    async callAIAPI(inputText, subject) {
        // Simulate AI API call - replace with actual implementation
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    title: this.generateTitle(inputText),
                    subject: subject === 'auto' ? this.detectSubject(inputText) : subject,
                    summary: this.generateSummary(inputText),
                    keyPoints: this.extractKeyPoints(inputText),
                    analogy: this.generateAnalogy(inputText),
                    diagramData: this.generateDiagramData(inputText),
                    quizQuestions: this.generateQuizQuestions(inputText),
                    flashcards: this.generateFlashcards(inputText),
                    timestamp: Date.now()
                });
            }, 2000);
        });
    }

    generateTitle(text) {
        const titles = [
            'Comprehensive Study Notes',
            'Interactive Learning Guide',
            'Smart Study Materials',
            'Enhanced Learning Notes'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    detectSubject(text) {
        const keywords = {
            'mathematics': ['equation', 'formula', 'calculus', 'algebra', 'geometry'],
            'science': ['molecule', 'experiment', 'physics', 'chemistry', 'biology'],
            'history': ['ancient', 'war', 'civilization', 'timeline', 'historical'],
            'literature': ['author', 'novel', 'poem', 'literary', 'theme'],
            'coding': ['function', 'variable', 'algorithm', 'code', 'program']
        };

        const lowerText = text.toLowerCase();
        for (const [subject, words] of Object.entries(keywords)) {
            if (words.some(word => lowerText.includes(word))) {
                return subject;
            }
        }
        return 'general';
    }

    generateSummary(text) {
        // Extract first few sentences as summary
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        return sentences.slice(0, 2).join('. ') + '.';
    }

    extractKeyPoints(text) {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        return sentences.slice(0, 5).map(s => s.trim());
    }

    generateAnalogy(text) {
        const analogies = [
            'Learning is like building a house - you need a strong foundation.',
            'Knowledge is like a tree - it grows stronger with nurturing.',
            'Studying is like exercising - consistency leads to strength.',
            'Education is like a journey - each lesson is a step forward.'
        ];
        return analogies[Math.floor(Math.random() * analogies.length)];
    }

    generateDiagramData(text) {
        return {
            type: 'flowchart',
            nodes: ['Start', 'Process', 'Decision', 'End'],
            connections: [
                { from: 'Start', to: 'Process' },
                { from: 'Process', to: 'Decision' },
                { from: 'Decision', to: 'End' }
            ]
        };
    }

    generateQuizQuestions(text) {
        const questions = [
            {
                question: 'What is the main concept discussed?',
                options: ['Concept A', 'Concept B', 'Concept C', 'Concept D'],
                correct: 0
            },
            {
                question: 'Which statement is true?',
                options: ['Statement 1', 'Statement 2', 'Statement 3', 'Statement 4'],
                correct: 1
            }
        ];
        return questions;
    }

    generateFlashcards(text) {
        return [
            { front: 'Key Term 1', back: 'Definition of key term 1' },
            { front: 'Key Term 2', back: 'Definition of key term 2' },
            { front: 'Key Term 3', back: 'Definition of key term 3' }
        ];
    }

    // Display Functions
    displayNotes(notes) {
        const outputDiv = document.getElementById('output');
        const resultContainer = document.getElementById('result-container');
        
        if (!outputDiv || !resultContainer) return;

        const notesHTML = `
            <div class="notes-container animate-fade-in">
                <h2 class="notes-title">${notes.title}</h2>
                <div class="subject-badge">${notes.subject.toUpperCase()}</div>
                
                <div class="summary-section">
                    <h3>Summary</h3>
                    <p class="summary-text">${notes.summary}</p>
                </div>

                <div class="analogy-box">
                    <div class="analogy-icon">💡</div>
                    <div class="analogy-title">Study Analogy</div>
                    <p class="analogy-text">"${notes.analogy}"</p>
                </div>

                <div class="key-points">
                    <h3>Key Points</h3>
                    <ul class="points-list">
                        ${notes.keyPoints.map((point, index) => `
                            <li class="point-item" data-index="${index}">
                                <span class="highlight-marker">${point}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="diagram-container">
                    <h3>Visual Diagram</h3>
                    <div id="diagram-canvas" class="diagram-canvas"></div>
                </div>

                <div class="study-tools-preview">
                    <h3>Study Tools</h3>
                    <div class="tools-grid">
                        <button class="tool-card" onclick="app.startQuiz()">
                            <div class="tool-icon">📝</div>
                            <div class="tool-title">Quiz</div>
                            <div class="tool-desc">Test your knowledge</div>
                        </button>
                        <button class="tool-card" onclick="app.startFlashcards()">
                            <div class="tool-icon">📚</div>
                            <div class="tool-title">Flashcards</div>
                            <div class="tool-desc">Review key terms</div>
                        </button>
                        <button class="tool-card" onclick="app.exportNotes()">
                            <div class="tool-icon">📄</div>
                            <div class="tool-title">Export</div>
                            <div class="tool-desc">Save or print notes</div>
                        </button>
                    </div>
                </div>
            </div>
        `;

        outputDiv.innerHTML = notesHTML;
        resultContainer.style.display = 'block';
        
        // Trigger animations
        this.animateNotesReveal();
        
        // Generate diagram
        this.renderDiagram(notes.diagramData);
    }

    // Quiz System
    initQuizSystem() {
        this.quizData = {
            currentQuestion: 0,
            score: 0,
            questions: this.currentNotes?.quizQuestions || [],
            answers: []
        };
    }

    startQuiz() {
        if (!this.currentNotes || !this.currentNotes.quizQuestions) {
            this.showNotification('No quiz questions available. Generate notes first!', 'warning');
            return;
        }

        const modal = this.createModal('quiz-modal');
        modal.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <h3>Knowledge Quiz</h3>
                    <div class="quiz-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 0%"></div>
                        </div>
                        <span class="progress-text">0/${this.quizData.questions.length}</span>
                    </div>
                </div>
                <div class="quiz-content" id="quiz-content">
                    ${this.renderQuizQuestion(0)}
                </div>
            </div>
        `;

        this.showModal(modal);
        this.updateQuizProgress();
    }

    renderQuizQuestion(index) {
        const question = this.quizData.questions[index];
        if (!question) return '<p>Quiz completed!</p>';

        return `
            <div class="question-container">
                <h4 class="question-text">${question.question}</h4>
                <div class="options-grid">
                    ${question.options.map((option, i) => `
                        <button class="quiz-option" 
                                onclick="app.selectQuizAnswer(${i})"
                                data-option="${i}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <div class="quiz-actions">
                    <button class="btn-secondary" onclick="app.closeQuiz()">Cancel</button>
                    ${index > 0 ? '<button class="btn-secondary" onclick="app.previousQuestion()">Previous</button>' : ''}
                    <button class="btn-primary" id="next-btn" onclick="app.nextQuestion()" disabled>Next</button>
                </div>
            </div>
        `;
    }

    selectQuizAnswer(selectedIndex) {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => option.classList.remove('selected'));
        options[selectedIndex].classList.add('selected');
        
        this.quizData.answers[this.quizData.currentQuestion] = selectedIndex;
        document.getElementById('next-btn').disabled = false;
    }

    nextQuestion() {
        if (this.quizData.currentQuestion < this.quizData.questions.length - 1) {
            this.quizData.currentQuestion++;
            this.updateQuizContent();
        } else {
            this.finishQuiz();
        }
    }

    previousQuestion() {
        if (this.quizData.currentQuestion > 0) {
            this.quizData.currentQuestion--;
            this.updateQuizContent();
        }
    }

    updateQuizContent() {
        const content = document.getElementById('quiz-content');
        content.innerHTML = this.renderQuizQuestion(this.quizData.currentQuestion);
        
        // Restore previous answer if exists
        const previousAnswer = this.quizData.answers[this.quizData.currentQuestion];
        if (previousAnswer !== undefined) {
            const options = document.querySelectorAll('.quiz-option');
            options[previousAnswer].classList.add('selected');
            document.getElementById('next-btn').disabled = false;
        }
        
        this.updateQuizProgress();
    }

    updateQuizProgress() {
        const progress = ((this.quizData.currentQuestion + 1) / this.quizData.questions.length) * 100;
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill) progressFill.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `${this.quizData.currentQuestion + 1}/${this.quizData.questions.length}`;
    }

    finishQuiz() {
        let correctAnswers = 0;
        this.quizData.answers.forEach((answer, index) => {
            if (answer === this.quizData.questions[index].correct) {
                correctAnswers++;
            }
        });

        const score = Math.round((correctAnswers / this.quizData.questions.length) * 100);
        this.updateProgress('quiz_completed', 1);
        this.updateProgress('quiz_score', score);

        const modal = document.getElementById('quiz-modal');
        modal.querySelector('.quiz-content').innerHTML = `
            <div class="quiz-results">
                <div class="score-circle">
                    <div class="score-text">${score}%</div>
                </div>
                <h3>Quiz Complete!</h3>
                <p>You got ${correctAnswers} out of ${this.quizData.questions.length} questions correct.</p>
                <div class="quiz-actions">
                    <button class="btn-primary" onclick="app.closeQuiz()">Close</button>
                    <button class="btn-secondary" onclick="app.reviewQuiz()">Review Answers</button>
                </div>
            </div>
        `;
    }

    closeQuiz() {
        this.closeModal('quiz-modal');
    }

    // Flashcard System
    initFlashcardSystem() {
        this.flashcardData = {
            currentCard: 0,
            cards: this.currentNotes?.flashcards || [],
            flipped: false,
            studyMode: 'flip' // flip, type, multiple
        };
    }

    startFlashcards() {
        if (!this.currentNotes || !this.currentNotes.flashcards) {
            this.showNotification('No flashcards available. Generate notes first!', 'warning');
            return;
        }

        const modal = this.createModal('flashcard-modal');
        modal.innerHTML = `
            <div class="flashcard-container">
                <div class="flashcard-header">
                    <h3>Study Flashcards</h3>
                    <div class="flashcard-controls">
                        <button class="control-btn ${this.flashcardData.studyMode === 'flip' ? 'active' : ''}" 
                                onclick="app.setFlashcardMode('flip')">Flip</button>
                        <button class="control-btn ${this.flashcardData.studyMode === 'type' ? 'active' : ''}" 
                                onclick="app.setFlashcardMode('type')">Type</button>
                    </div>
                </div>
                <div class="flashcard-content" id="flashcard-content">
                    ${this.renderFlashcard()}
                </div>
                <div class="flashcard-navigation">
                    <button class="nav-btn" onclick="app.previousCard()" ${this.flashcardData.currentCard === 0 ? 'disabled' : ''}>← Previous</button>
                    <span class="card-counter">${this.flashcardData.currentCard + 1} / ${this.flashcardData.cards.length}</span>
                    <button class="nav-btn" onclick="app.nextCard()" ${this.flashcardData.currentCard === this.flashcardData.cards.length - 1 ? 'disabled' : ''}>Next →</button>
                </div>
            </div>
        `;

        this.showModal(modal);
    }

    renderFlashcard() {
        const card = this.flashcardData.cards[this.flashcardData.currentCard];
        if (!card) return '<p>No flashcards available</p>';

        if (this.flashcardData.studyMode === 'flip') {
            return `
                <div class="flashcard-3d ${this.flashcardData.flipped ? 'flipped' : ''}" onclick="app.flipCard()">
                    <div class="flashcard-front">
                        <div class="card-content">
                            <h4>${card.front}</h4>
                            <p class="card-hint">Click to reveal answer</p>
                        </div>
                    </div>
                    <div class="flashcard-back">
                        <div class="card-content">
                            <p>${card.back}</p>
                        </div>
                    </div>
                </div>
            `;
        } else if (this.flashcardData.studyMode === 'type') {
            return `
                <div class="flashcard-type">
                    <div class="card-prompt">
                        <h4>${card.front}</h4>
                    </div>
                    <div class="type-answer">
                        <input type="text" id="answer-input" placeholder="Type your answer..." 
                               onkeypress="app.handleAnswerKeypress(event)">
                        <button class="btn-primary" onclick="app.checkTypedAnswer()">Check</button>
                    </div>
                    <div class="answer-feedback" id="answer-feedback" style="display: none;">
                        <p class="correct-answer">Correct: ${card.back}</p>
                        <button class="btn-secondary" onclick="app.nextCard()">Next Card</button>
                    </div>
                </div>
            `;
        }
    }

    flipCard() {
        this.flashcardData.flipped = !this.flashcardData.flipped;
        const flashcard = document.querySelector('.flashcard-3d');
        if (flashcard) {
            flashcard.classList.toggle('flipped');
        }
    }

    setFlashcardMode(mode) {
        this.flashcardData.studyMode = mode;
        this.flashcardData.flipped = false;
        
        // Update active button
        document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Re-render flashcard
        const content = document.getElementById('flashcard-content');
        content.innerHTML = this.renderFlashcard();
    }

    nextCard() {
        if (this.flashcardData.currentCard < this.flashcardData.cards.length - 1) {
            this.flashcardData.currentCard++;
            this.flashcardData.flipped = false;
            this.updateFlashcardContent();
        }
    }

    previousCard() {
        if (this.flashcardData.currentCard > 0) {
            this.flashcardData.currentCard--;
            this.flashcardData.flipped = false;
            this.updateFlashcardContent();
        }
    }

    updateFlashcardContent() {
        const content = document.getElementById('flashcard-content');
        const counter = document.querySelector('.card-counter');
        
        content.innerHTML = this.renderFlashcard();
        if (counter) counter.textContent = `${this.flashcardData.currentCard + 1} / ${this.flashcardData.cards.length}`;
        
        // Update navigation buttons
        const prevBtn = document.querySelector('.nav-btn:first-child');
        const nextBtn = document.querySelector('.nav-btn:last-child');
        
        if (prevBtn) prevBtn.disabled = this.flashcardData.currentCard === 0;
        if (nextBtn) nextBtn.disabled = this.flashcardData.currentCard === this.flashcardData.cards.length - 1;
    }

    // Progress Tracking
    loadProgress() {
        const saved = localStorage.getItem('studyProgress');
        return saved ? JSON.parse(saved) : {
            notesGenerated: 0,
            quizzesCompleted: 0,
            flashcardsStudied: 0,
            studyTime: 0,
            streak: 0,
            achievements: []
        };
    }

    saveProgress() {
        localStorage.setItem('studyProgress', JSON.stringify(this.userProgress));
    }

    updateProgress(type, value) {
        switch (type) {
            case 'notes_generated':
                this.userProgress.notesGenerated += value;
                break;
            case 'quiz_completed':
                this.userProgress.quizzesCompleted += value;
                break;
            case 'flashcards_studied':
                this.userProgress.flashcardsStudied += value;
                break;
            case 'study_time':
                this.userProgress.studyTime += value;
                break;
            case 'quiz_score':
                this.userProgress.lastQuizScore = value;
                break;
        }
        
        this.saveProgress();
        this.updateProgressDisplay();
        this.checkAchievements();
    }

    updateProgressDisplay() {
        // Update any progress displays on the current page
        const elements = {
            'notes-count': this.userProgress.notesGenerated,
            'quiz-count': this.userProgress.quizzesCompleted,
            'flashcard-count': this.userProgress.flashcardsStudied,
            'study-time': Math.floor(this.userProgress.studyTime / 60) + 'h'
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    checkAchievements() {
        const achievements = [
            { id: 'first_notes', condition: () => this.userProgress.notesGenerated >= 1, title: 'First Notes!' },
            { id: 'quiz_master', condition: () => this.userProgress.quizzesCompleted >= 5, title: 'Quiz Master!' },
            { id: 'study_streak', condition: () => this.userProgress.streak >= 7, title: 'Study Streak!' }
        ];

        achievements.forEach(achievement => {
            if (!this.userProgress.achievements.includes(achievement.id) && achievement.condition()) {
                this.userProgress.achievements.push(achievement.id);
                this.showAchievement(achievement.title);
                this.saveProgress();
            }
        });
    }

    showAchievement(title) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification animate-slide-in';
        notification.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-content">
                <h4>Achievement Unlocked!</h4>
                <p>${title}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('animate-slide-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Utility Functions
    showLoader(show) {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.display = show ? 'flex' : 'none';
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} animate-slide-in`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('animate-slide-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    createModal(id) {
        const modal = document.createElement('div');
        modal.id = id;
        modal.className = 'modal-overlay';
        modal.innerHTML = '<div class="modal-content"></div>';
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal(id);
        });
        
        document.body.appendChild(modal);
        return modal.querySelector('.modal-content');
    }

    showModal(modalContent) {
        const modal = modalContent.closest('.modal-overlay');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            setTimeout(() => modal.remove(), 300);
        }
    }

    // Animation Functions
    initAnimations() {
        // Initialize scroll animations
        this.initScrollAnimations();
        
        // Initialize hover effects
        this.initHoverEffects();
        
        // Initialize loading animations
        this.initLoadingAnimations();
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    initHoverEffects() {
        // Add hover effects to cards
        document.querySelectorAll('.card, .tool-card, .quiz-option').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-4px)';
                element.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0)';
                element.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            });
        });
    }

    initLoadingAnimations() {
        // Custom loading spinner animation
        const loader = document.getElementById('loader');
        if (loader) {
            loader.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                <p class="loading-text">Generating your notes...</p>
            `;
        }
    }

    animateNotesReveal() {
        const elements = document.querySelectorAll('.notes-container > *');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Event Listeners
    initEventListeners() {
        // Note generation form
        const generateBtn = document.getElementById('generate-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                const input = document.getElementById('note-input');
                const subject = document.getElementById('subject-select');
                this.generateNotes(input.value, subject?.value || 'auto');
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        const input = document.getElementById('note-input');
                        if (input && input.value.trim()) {
                            this.generateNotes(input.value);
                        }
                        break;
                    case 'k':
                        e.preventDefault();
                        this.showKeyboardShortcuts();
                        break;
                }
            }
        });

        // Auto-save functionality
        const noteInput = document.getElementById('note-input');
        if (noteInput) {
            noteInput.addEventListener('input', () => {
                localStorage.setItem('draftNotes', noteInput.value);
            });
            
            // Restore draft on page load
            const draft = localStorage.getItem('draftNotes');
            if (draft) {
                noteInput.value = draft;
            }
        }
    }

    // Export Functions
    exportNotes() {
        if (!this.currentNotes) {
            this.showNotification('No notes to export. Generate some first!', 'warning');
            return;
        }

        const exportData = {
            ...this.currentNotes,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        // Create downloadable file
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `study-notes-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Notes exported successfully!', 'success');
    }

    printNotes() {
        if (!this.currentNotes) {
            this.showNotification('No notes to print. Generate some first!', 'warning');
            return;
        }

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${this.currentNotes.title}</title>
                    <style>
                        body { font-family: 'Inter', sans-serif; margin: 20px; }
                        h1 { color: #1a237e; }
                        .subject-badge { background: #3f51b5; color: white; padding: 4px 8px; border-radius: 4px; }
                        .key-points li { margin: 10px 0; }
                        @media print { body { margin: 0; } }
                    </style>
                </head>
                <body>
                    <h1>${this.currentNotes.title}</h1>
                    <div class="subject-badge">${this.currentNotes.subject.toUpperCase()}</div>
                    <h2>Summary</h2>
                    <p>${this.currentNotes.summary}</p>
                    <h2>Key Points</h2>
                    <ul class="key-points">
                        ${this.currentNotes.keyPoints.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                    <h2>Analogy</h2>
                    <p>"${this.currentNotes.analogy}"</p>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }

    // Service Worker for offline functionality
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered'))
                .catch(error => console.log('SW registration failed'));
        }
    }

    // Data persistence
    saveNotesToHistory(notes) {
        const history = JSON.parse(localStorage.getItem('notesHistory') || '[]');
        history.unshift({
            ...notes,
            id: Date.now(),
            savedAt: new Date().toISOString()
        });
        
        // Keep only last 50 notes
        if (history.length > 50) {
            history.splice(50);
        }
        
        localStorage.setItem('notesHistory', JSON.stringify(history));
    }

    loadUserData() {
        // Load user preferences
        const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
        
        // Apply theme
        if (preferences.theme) {
            document.body.classList.add(`theme-${preferences.theme}`);
        }
        
        // Apply font size
        if (preferences.fontSize) {
            document.documentElement.style.fontSize = preferences.fontSize;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SmartStudyApp();
});

// Export for use in HTML
window.SmartStudyApp = SmartStudyApp;