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
function playSound(type) {
    const audio = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.connect(gain);
    gain.connect(audio.destination);

    if (type === "correct") {
        oscillator.frequency.value = 800;
    } else {
        oscillator.frequency.value = 200;
    }

    oscillator.type = "sine";
    gain.gain.value = 0.1;

    oscillator.start();
    oscillator.stop(audio.currentTime + 0.2);

    oscillator.onended = () => audio.close();
}

function showQuestion() {
    answered = false;
    timeLeft = 15;

    const q = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("progressBar").style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

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

            const allButtons = box.querySelectorAll("button");

            allButtons.forEach(btn => {

                btn.disabled = true;

                if (btn.textContent === q.correct) {
                    btn.classList.add("correct-answer");
                }

            });

            if (answer === q.correct) {

                score++;
                playSound("correct");

                document.getElementById("score").textContent =
                    "Correct answer! 🎉";

            } else {

                button.classList.add("wrong-answer");
                playSound("wrong");

                document.getElementById("score").textContent =
                    "Wrong answer! ❌";

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

                const allButtons =
                    document.querySelectorAll("#answers button");

                allButtons.forEach(btn => {

                    btn.disabled = true;

                    if (btn.textContent === questions[currentQuestion].correct) {
                        btn.classList.add("correct-answer");
                    }

                });

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
