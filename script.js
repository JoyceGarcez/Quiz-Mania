const questions = [
  {
    question: "Qual linguagem é usada para estilizar páginas web?",
    options: ["HTML", "Python", "CSS", "Java"],
    answer: "CSS"
  },
  {
    question: "Qual tag HTML é usada para criar um link?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: "<a>"
  },
  {
    question: "Qual desses é um framework JavaScript?",
    options: ["Laravel", "Django", "React", "Flask"],
    answer: "React"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");
const timeEl = document.getElementById("time");

function showQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  updateTimer();

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("answer-btn");
    btn.onclick = () => checkAnswer(btn, option);
    answersEl.appendChild(btn);
  });

  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft === 0) {
      clearInterval(timer);
      disableAnswers();
      nextBtn.style.display = "inline-block";
    }
  }, 1000);
}

function updateTimer() {
  timeEl.textContent = timeLeft;
}

function checkAnswer(button, selected) {
  clearInterval(timer);
  const correct = questions[currentQuestion].answer;
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.backgroundColor = "#8bc34a"; // verde certo
    } else if (btn.textContent === selected) {
      btn.style.backgroundColor = "#f44336"; // vermelho errado
    } else {
      btn.style.opacity = 0.6;
    }
  });

  if (selected === correct) score++;

  nextBtn.style.display = "inline-block";
}

function disableAnswers() {
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(btn => (btn.disabled = true));
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz-container").classList.add("hide");
  resultEl.classList.remove("hide");
  scoreEl.textContent = score;
  totalEl.textContent = questions.length;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  resultEl.classList.add("hide");
  document.getElementById("quiz-container").classList.remove("hide");
  showQuestion();
}

showQuestion();