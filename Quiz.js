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
let quizFinished = false;

// SOUND SYSTEM
let audioContext;

function playSound(type) {

    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return;

    if (!audioContext) {
        audioContext = new AudioContextClass();
    }

    audioContext.resume().then(() => {

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.frequency.value =
            type === "correct" ? 800 : 200;

        oscillator.type = "sine";

        gain.gain.setValueAtTime(0.2, audioContext.currentTime);

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


// START COUNTDOWN
function startCountdown() {

    const countdown = document.createElement("div");

    countdown.style.position = "fixed";
    countdown.style.top = "0";
    countdown.style.left = "0";
    countdown.style.width = "100%";
    countdown.style.height = "100%";
    countdown.style.background = "#6a0dad";
    countdown.style.color = "white";
    countdown.style.display = "flex";
    countdown.style.justifyContent = "center";
    countdown.style.alignItems = "center";
    countdown.style.fontSize = "70px";
    countdown.style.fontWeight = "bold";
    countdown.style.zIndex = "9999";

    document.body.appendChild(countdown);

    let count = 3;

    countdown.textContent = count;

    const countdownTimer = setInterval(() => {

        count--;

        if (count > 0) {

            countdown.textContent = count;

        } else if (count === 0) {

            countdown.textContent = "GO!";

        } else {

            clearInterval(countdownTimer);
            countdown.remove();
            showQuestion();

        }

    }, 1000);
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

        if (quizFinished) return;

        quizFinished = true;

        clearInterval(timerInterval);

        // COIN REWARD SYSTEM
        let earnedCoins = 10;

        if (score === questions.length) {
            earnedCoins += 5;
        }

        let totalCoins =
            Number(localStorage.getItem("dailyBonus")) || 0;

        totalCoins += earnedCoins;

        localStorage.setItem("dailyBonus", totalCoins);

        // PLAYER NAME
        let playerName = prompt("Enter your name:");

        if (!playerName || playerName.trim() === "") {
            playerName = "Player";
        }

        playerName = playerName.trim();

        localStorage.setItem("playerName", playerName);

        // LEADERBOARD
        let leaderboard =
            JSON.parse(localStorage.getItem("leaderboard")) || [];

        leaderboard.push({
            name: playerName,
            score: score
        });

        leaderboard.sort((a, b) => b.score - a.score);

        localStorage.setItem(
            "leaderboard",
            JSON.stringify(leaderboard)
        );

        // RESULT PAGE
        document.body.innerHTML = `

            <h1>Quiz Completed! 🎉</h1>

            <h2>Your Score: ${score}/${questions.length}</h2>

            <h2>🪙 You Earned ${earnedCoins} Coins!</h2>

            <h3>💰 Total Coins: ${totalCoins}</h3>

            <h2>🏆 Leaderboard</h2>

            ${leaderboard.slice(0, 5).map((player, index) => `
                <p>${index + 1}. ${player.name} - ${player.score}</p>
            `).join("")}

            <button onclick="location.href='Quiz.html'">
                Play Again
            </button>

            <button onclick="location.href='Rewards.html'">
                🎁 Rewards Store
            </button>

            <button onclick="location.href='index.html'">
                Home
            </button>

        `;
    }
}


// START QUIZ
startCountdown();
