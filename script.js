// Quiz Application
let currentQuestion = 0;
let score = 0;
let questions = [];

// Initialize elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.getElementById('progress-fill');
const questionCounter = document.getElementById('question-counter');
const currentScore = document.getElementById('current-score');

// Load questions
function loadQuestions() {
    questions = [
        {question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2},
        {question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1},
        {question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3},
        {question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"], correct: 2},
        {question: "What is the chemical symbol for gold?", options: ["Ag", "Au", "Fe", "Cu"], correct: 1},
        {question: "Which year did WWII end?", options: ["1943", "1944", "1945", "1946"], correct: 2},
        {question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippo"], correct: 1},
        {question: "Which language is 'language of the web'?", options: ["Python", "Java", "JavaScript", "C++"], correct: 2},
        {question: "What is √144?", options: ["10", "11", "12", "13"], correct: 2},
        {question: "Which country has kangaroos?", options: ["New Zealand", "South Africa", "Australia", "India"], correct: 2}
    ];
}

// Show screen function
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// Start quiz
function startQuiz() {
    showScreen(quizScreen);
    displayQuestion();
}

// Display question
function displayQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });
    
    updateProgress();
    nextBtn.disabled = true;
}

// Select option
function selectOption(index) {
    const options = optionsContainer.querySelectorAll('.option');
    const correctAnswer = questions[currentQuestion].correct;
    
    options.forEach(option => option.style.pointerEvents = 'none');
    
    if (index === correctAnswer) {
        options[index].classList.add('correct');
        score++;
        currentScore.textContent = score;
    } else {
        options[index].classList.add('incorrect');
        options[correctAnswer].classList.add('correct');
    }
    
    nextBtn.disabled = false;
}

// Next question
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        showResults();
    } else {
        displayQuestion();
    }
}

// Update progress
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

// Show results
function showResults() {
    const correctCount = score;
    const incorrectCount = questions.length - score;
    
    document.getElementById('final-score').textContent = correctCount;
    document.getElementById('correct-answers').textContent = correctCount;
    document.getElementById('incorrect-answers').textContent = incorrectCount;
    
    const percentage = (correctCount / questions.length) * 100;
    const performanceTitle = document.getElementById('performance-title');
    const performanceDescription = document.getElementById('performance-description');
    
    if (percentage >= 90) {
        performanceTitle.textContent = "Excellent!";
        performanceDescription.textContent = "Outstanding performance!";
    } else if (percentage >= 70) {
        performanceTitle.textContent = "Great Job!";
        performanceDescription.textContent = "Very good work!";
    } else if (percentage >= 50) {
        performanceTitle.textContent = "Good Work!";
        performanceDescription.textContent = "Well done!";
    } else {
        performanceTitle.textContent = "Keep Trying!";
        performanceDescription.textContent = "Don't give up!";
    }
    
    showScreen(resultsScreen);
}

// Restart quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    currentScore.textContent = '0';
    startQuiz();
}

// Go home
function goHome() {
    currentQuestion = 0;
    score = 0;
    currentScore.textContent = '0';
    showScreen(welcomeScreen);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadQuestions();
    
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    document.getElementById('restart-btn').addEventListener('click', restartQuiz);
    document.getElementById('home-btn').addEventListener('click', goHome);
});
