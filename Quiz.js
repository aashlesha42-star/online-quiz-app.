```javascript
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

// SOUND SYSTEM
let audioContext;

function playSound(type) {

    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
        console.log("Audio is not supported");
        return;
    }

    if (!audioContext) {
        audioContext = new AudioContextClass();
    }

    audioContext.resume().then(() => {

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        if (type === "correct") {
            oscillator.frequency.value = 800;
        } else {
            oscillator.frequency.value = 200;
        }

        oscillator.type = "sine";

        gain.gain.setValueAtTime(
            0.2,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.3
        );

        oscillator.start();

        oscillator.stop(audioContext.currentTime + 0.3);

    }).catch(error => {
        console.log("Audio error:", error);
    });
}


// SHOW QUESTION
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


// TIMER
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

                    if (
                        btn.textContent ===
                        questions[currentQuestion].correct
                    ) {
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


// NEXT QUESTION
function nextQuestion() {

    if (!answered) {

        alert("Please select an answer first!");

        return;
    }

    clearInterval(timerInterval);

    goToNextQuestion();
}


// MOVE TO NEXT QUESTION
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
```
