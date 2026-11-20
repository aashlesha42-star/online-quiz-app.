const questions = [
    {
        question: "Which language is used for web development?",
        answers: ["HTML", "Python", "C", "Java"],
        correct: "HTML"
    },
    {
        question: "What does CPU stand for?",
        answers: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Control Processing User"
        ],
        correct: "Central Processing Unit"
    },
    {
        question: "Which company developed Android?",
        answers: ["Apple", "Google", "Microsoft", "IBM"],
        correct: "Google"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;
let timeLeft = 15;
let timerInterval;

function showQuestion() {
    answered = false;
    timeLeft = 15;

    const q = questions[currentQuestion];

    document.getElementById("question").textContent = q.question;
    document.getElementById("timer").textContent = timeLeft;
    document.getElementById("score").textContent = "";

    const box = document.getElementById("answers");
    box.innerHTML = "";

    q.answers.forEach(answer => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.style.display = "block";
        button.style.margin = "10px auto";

        button.onclick = function() {
            if (answered) return;

            answered = true;
            clearInterval(timerInterval);

            if (answer === q.correct) {
                score++;
                document.getElementById("score").textContent =
                    "Correct answer! 🎉";
            } else {
                document.getElementById("score").textContent =
                    "Wrong answer!";
            }
        };

        box.appendChild(button);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(function() {

        timeLeft--;

        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);

            if (!answered) {
                answered = true;

                document.getElementById("score").textContent =
                    "Time's up! ⏰";

                setTimeout(goToNextQuestion, 1000);
            }
        }

    }, 1000);
}

function nextQuestion() {
    if (!answered) {
        alert("Please select an answer first!");
        return;
    }

    clearInterval(timerInterval);
    goToNextQuestion();
}

function goToNextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        clearInterval(timerInterval);

        document.body.innerHTML = `
            <h1>Quiz Completed! 🎉</h1>

            <h2>Your Score: ${score}/${questions.length}</h2>

            <button onclick="location.href='Quiz.html'">
                Play Again
            </button>

            <button onclick="location.href='index.html'">
                Home
            </button>
        `;
    }
}

showQuestion();
