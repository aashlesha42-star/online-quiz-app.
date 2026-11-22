// ALL QUIZ QUESTIONS

const allQuestions = {

    computer: [
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
    ],

    science: [
        {
            question: "Which planet is known as the Red Planet?",
            answers: ["Earth", "Mars", "Jupiter", "Venus"],
            correct: "Mars"
        },
        {
            question: "What is the chemical formula of water?",
            answers: ["CO2", "O2", "H2O", "NaCl"],
            correct: "H2O"
        },
        {
            question: "Which organ pumps blood?",
            answers: ["Brain", "Lungs", "Heart", "Kidney"],
            correct: "Heart"
        }
    ],

    gk: [
        {
            question: "What is the capital of India?",
            answers: ["Mumbai", "Delhi", "Pune", "Chennai"],
            correct: "Delhi"
        },
        {
            question: "What is the national animal of India?",
            answers: ["Lion", "Elephant", "Tiger", "Leopard"],
            correct: "Tiger"
        },
        {
            question: "How many days are there in a leap year?",
            answers: ["364", "365", "366", "367"],
            correct: "366"
        }
    ],

    maths: [
        {
            question: "What is 12 × 5?",
            answers: ["50", "55", "60", "65"],
            correct: "60"
        },
        {
            question: "What is the square of 9?",
            answers: ["18", "72", "81", "99"],
            correct: "81"
        },
        {
            question: "What is 100 divided by 4?",
            answers: ["20", "25", "30", "40"],
            correct: "25"
        }
    ],

    english: [
        {
            question: "What is the opposite of Happy?",
            answers: ["Joyful", "Sad", "Excited", "Glad"],
            correct: "Sad"
        },
        {
            question: "Which word is a noun?",
            answers: ["Run", "Beautiful", "School", "Quickly"],
            correct: "School"
        },
        {
            question: "Choose the correct spelling.",
            answers: ["Beautifull", "Beautiful", "Beutiful", "Beautifal"],
            correct: "Beautiful"
        }
    ],

    history: [
        {
            question: "Who was the first Prime Minister of India?",
            answers: [
                "Mahatma Gandhi",
                "Jawaharlal Nehru",
                "Sardar Patel",
                "Dr. Rajendra Prasad"
            ],
            correct: "Jawaharlal Nehru"
        },
        {
            question: "In which year did India gain independence?",
            answers: ["1945", "1946", "1947", "1950"],
            correct: "1947"
        },
        {
            question: "Who is known as the Father of the Nation in India?",
            answers: [
                "Subhas Chandra Bose",
                "Mahatma Gandhi",
                "Bhagat Singh",
                "Jawaharlal Nehru"
            ],
            correct: "Mahatma Gandhi"
        }
    ]

};


// VARIABLES

let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;
let timeLeft = 15;
let timerInterval;
let quizFinished = false;
let selectedCategory = "";
let audioContext;

// SAVE SCORE TO GLOBAL FIREBASE LEADERBOARD

async function saveGlobalScore(playerName, score, category, total) {

    try {

        await window.firebaseReady;

        const user = window.firebaseAuth.currentUser;
        const database = window.firebaseDB;

        const { ref, push } = await import(
            "https://www.gstatic.com/firebasejs/13.4.0/firebase-database.js"
        );

        const percentage = Math.round(
            (score / total) * 100
        );

        await push(ref(database, "globalLeaderboard"), {

            playerName: playerName,
            playerId: user.uid,
            category: category,
            score: score,
            total: total,
            percentage: percentage,
            timestamp: Date.now()

        });

        console.log("Global score uploaded successfully!");

    } catch (error) {

        console.error("Global leaderboard error:", error);

    }

}

// SOUND SYSTEM

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

    }).catch(error => console.log(error));
}


// START QUIZ

function startQuiz(category) {

    if (!allQuestions[category]) {
        alert("Category not found!");
        return;
    }

    selectedCategory = category;
    questions = allQuestions[category];

    currentQuestion = 0;
    score = 0;
    quizFinished = false;

    document.getElementById("categoryScreen").style.display = "none";
    document.getElementById("quizScreen").style.display = "block";

    const names = {
        computer: "💻 Computer Quiz",
        science: "🔬 Science Quiz",
        gk: "🌍 General Knowledge Quiz",
        maths: "➗ Mathematics Quiz",
        english: "📚 English Quiz",
        history: "🏛️ History Quiz"
    };

    document.getElementById("categoryName").textContent =
        names[category];

    startCountdown();
}


// COUNTDOWN

function startCountdown() {

    const countdown = document.createElement("div");

    countdown.style.cssText = `
        position:fixed;
        inset:0;
        background:#6a0dad;
        color:white;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:70px;
        font-weight:bold;
        z-index:9999;
    `;

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

        button.onclick = function() {

            if (answered) return;

            answered = true;
            clearInterval(timerInterval);

            const buttons = box.querySelectorAll("button");

            buttons.forEach(btn => {

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

    timerInterval = setInterval(() => {

        timeLeft--;

        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            if (!answered) {

                answered = true;

                const buttons =
                    document.querySelectorAll("#answers button");

                buttons.forEach(btn => {

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

    if (quizFinished) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        quizFinished = true;
        clearInterval(timerInterval);


        // QUIZ COINS

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

        if (!playerName || !playerName.trim()) {
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


        // QUIZ COMPLETION NOTIFICATIONS

        let notifications = JSON.parse(
            localStorage.getItem("quizNotifications")
        ) || [];

        notifications.unshift({
            icon: "🎉",
            title: "Quiz Completed!",
            message: `You completed the ${selectedCategory} quiz and scored ${score}/${questions.length}.`,
            time: new Date().toLocaleString(),
            read: false
        });


        // PERFECT SCORE NOTIFICATION

        if (score === questions.length) {

            notifications.unshift({
                icon: "🏆",
                title: "Perfect Score!",
                message: "Amazing! You answered every question correctly!",
                time: new Date().toLocaleString(),
                read: false
            });

        }


        // COIN REWARD NOTIFICATION

        notifications.unshift({
            icon: "🪙",
            title: "Coins Earned!",
            message: `You earned ${earnedCoins} coins from your quiz!`,
            time: new Date().toLocaleString(),
            read: false
        });


        // WEEKLY CHALLENGE ACTIVITY TRACKING

        let weeklyProgress =
            JSON.parse(localStorage.getItem("weeklyProgress")) || {
                questions: 0,
                correct: 0,
                quizzes: 0,
                completed: []
            };


        // COUNT QUIZ ACTIVITY

        weeklyProgress.questions += questions.length;

        weeklyProgress.correct += score;

        weeklyProgress.quizzes += 1;


        // WEEKLY CHALLENGE REWARDS

        let weeklyRewards = {
            1: 20,
            2: 30,
            3: 50
        };

        let newRewards = [];


        // CHALLENGE 1: ANSWER 10 QUESTIONS

        if (
            weeklyProgress.questions >= 10 &&
            !weeklyProgress.completed.includes(1)
        ) {

            weeklyProgress.completed.push(1);
            newRewards.push(1);

        }


        // CHALLENGE 2: GET 5 CORRECT ANSWERS

        if (
            weeklyProgress.correct >= 5 &&
            !weeklyProgress.completed.includes(2)
        ) {

            weeklyProgress.completed.push(2);
            newRewards.push(2);

        }


        // CHALLENGE 3: COMPLETE 3 QUIZZES

        if (
            weeklyProgress.quizzes >= 3 &&
            !weeklyProgress.completed.includes(3)
        ) {

            weeklyProgress.completed.push(3);
            newRewards.push(3);

        }


        // CALCULATE WEEKLY COINS

        let weeklyCoins = 0;

        newRewards.forEach(id => {

            weeklyCoins += weeklyRewards[id];

            notifications.unshift({
                icon: "🏆",
                title: "Weekly Challenge Completed!",
                message: `You completed Challenge ${id} and earned ${weeklyRewards[id]} coins!`,
                time: new Date().toLocaleString(),
                read: false
            });

        });


        // ADD WEEKLY COINS

        if (weeklyCoins > 0) {

            totalCoins += weeklyCoins;

            localStorage.setItem(
                "dailyBonus",
                totalCoins
            );

        }


        // SAVE WEEKLY PROGRESS

        localStorage.setItem(
            "weeklyProgress",
            JSON.stringify(weeklyProgress)
        );

        // QUIZ PERFORMANCE HISTORY

let quizHistory = JSON.parse(
    localStorage.getItem("quizHistory") || "[]"
);

quizHistory.push({
    category: selectedCategory,
    score: score,
    total: questions.length,
    percentage: Math.round(
        (score / questions.length) * 100
    ),
    date: new Date().toLocaleDateString(),
    timestamp: Date.now()
});

// Keep the latest 20 quiz results

if (quizHistory.length > 20) {
    quizHistory = quizHistory.slice(-20);
}

localStorage.setItem(
    "quizHistory",
    JSON.stringify(quizHistory)
);
        // QUIZMASTER ANALYTICS TRACKER

let analytics = JSON.parse(
    localStorage.getItem("quizAnalytics")
) || {
    totalQuizzes: 0,
    correctAnswers: 0,
    highestScore: 0,
    totalCoinsEarned: 0
};

// Update quiz statistics

analytics.totalQuizzes++;

analytics.correctAnswers += score;

analytics.highestScore = Math.max(
    analytics.highestScore,
    score
);

analytics.totalCoinsEarned += earnedCoins + weeklyCoins;

// Save analytics

localStorage.setItem(
    "quizAnalytics",
    JSON.stringify(analytics)
);

        // SAVE NOTIFICATIONS

        localStorage.setItem(
            "quizNotifications",
            JSON.stringify(notifications)
        );


        // RESULT PAGE

        document.body.innerHTML = `

            <div style="
                min-height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
                padding:25px;
                box-sizing:border-box;
                background:linear-gradient(135deg, #18052e, #481080, #7b2cbf);
                font-family:Arial, sans-serif;
                color:white;
                text-align:center;
            ">

                <div style="
                    background:rgba(255,255,255,0.12);
                    padding:35px;
                    border-radius:25px;
                    width:100%;
                    max-width:550px;
                    box-shadow:0 10px 30px rgba(0,0,0,0.3);
                ">

                    <h1>Quiz Completed! 🎉</h1>

                    <h2>${selectedCategory.toUpperCase()} QUIZ</h2>

                    <h2>Your Score: ${score}/${questions.length}</h2>

                    <h2>🪙 You Earned ${earnedCoins + weeklyCoins} Coins!</h2>

                    <h3>💰 Total Coins: ${totalCoins}</h3>

                    ${newRewards.length > 0 ? `
                        <h2>🏆 Weekly Challenges Completed!</h2>
                        <p>You completed ${newRewards.length} weekly challenge(s)!</p>
                    ` : ""}

                    <h2>🏆 Leaderboard</h2>

                    ${leaderboard.slice(0, 5).map((player, index) => `
                        <p>${index + 1}. ${player.name} - ${player.score}</p>
                    `).join("")}

                    <br>

                    <button onclick="location.href='Quiz.html'" style="padding:12px 20px;margin:6px;border:0;border-radius:10px;cursor:pointer;">
                        Play Again
                    </button>

                    <button onclick="location.href='WeeklyChallenge.html'" style="padding:12px 20px;margin:6px;border:0;border-radius:10px;cursor:pointer;">
                        🏆 Weekly Challenges
                    </button>

                    <button onclick="location.href='Rewards.html'" style="padding:12px 20px;margin:6px;border:0;border-radius:10px;cursor:pointer;">
                        🎁 Rewards Store
                    </button>

                    <button onclick="location.href='index.html'" style="padding:12px 20px;margin:6px;border:0;border-radius:10px;cursor:pointer;">
                        Home
                    </button>

                </div>
            </div>

        `;
    }
}
