// ALL QUIZ QUESTIONS - MIXED LEVELS

const allQuestions = {

    level1: [
        {
            question: "What has hands but cannot clap?",
            answers: ["A clock", "A robot", "A statue", "A painting"],
            correct: "A clock",
            explanation: "A clock has hands that show time, but they cannot clap!"
        },
        {
            question: "If you overtake the person in second place, what position are you in?",
            answers: ["First", "Second", "Third", "Fourth"],
            correct: "Second",
            explanation: "You take their position, so you become second!"
        },
        {
            question: "Which month has 28 days?",
            answers: ["February", "April", "All months", "June"],
            correct: "All months",
            explanation: "Every month has at least 28 days. Tricky, right?"
        },
        {
            question: "What gets wetter the more it dries?",
            answers: ["A sponge", "A towel", "A cloud", "A river"],
            correct: "A towel",
            explanation: "A towel absorbs water while drying something else."
        },
        {
            question: "How many animals did Moses take into the ark?",
            answers: ["Two", "Four", "None", "Seven"],
            correct: "None",
            explanation: "It was Noah, not Moses, who built the ark!"
        }
    ],

    level2: [
        {
            question: "A farmer has 17 sheep. All but 9 run away. How many remain?",
            answers: ["8", "9", "17", "0"],
            correct: "9",
            explanation: "'All but 9' means 9 sheep remain!"
        },
        {
            question: "What can travel around the world while staying in one corner?",
            answers: ["A map", "A stamp", "A compass", "A photograph"],
            correct: "A stamp",
            explanation: "A stamp stays in the corner of an envelope while travelling!"
        },
        {
            question: "Which is heavier: 1 kg of iron or 1 kg of cotton?",
            answers: ["Iron", "Cotton", "Both weigh the same", "It depends on size"],
            correct: "Both weigh the same",
            explanation: "One kilogram is one kilogram, no matter the material!"
        },
        {
            question: "You have 3 apples and take away 2. How many apples do you have?",
            answers: ["1", "2", "3", "5"],
            correct: "2",
            explanation: "You took 2 apples, so you have those 2!"
        },
        {
            question: "What has a neck but no head?",
            answers: ["A bottle", "A chair", "A shoe", "A table"],
            correct: "A bottle",
            explanation: "A bottle has a neck, but definitely no head!"
        }
    ],

    level3: [
        {
            question: "A plane crashes on the border of two countries. Where do they bury the survivors?",
            answers: ["Country A", "Country B", "At the border", "Nowhere"],
            correct: "Nowhere",
            explanation: "Survivors are alive, so they aren't buried!"
        },
        {
            question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
            answers: ["The letter M", "The letter T", "The number 1", "The letter A"],
            correct: "The letter M",
            explanation: "Look at the spelling of minute, moment and thousand!"
        },
        {
            question: "If 5 machines make 5 toys in 5 minutes, how long will 100 machines take to make 100 toys?",
            answers: ["5 minutes", "20 minutes", "100 minutes", "500 minutes"],
            correct: "5 minutes",
            explanation: "Each machine makes one toy in 5 minutes. All 100 work together!"
        },
        {
            question: "What has cities but no houses, forests but no trees, and rivers but no water?",
            answers: ["A painting", "A map", "A dream", "A book"],
            correct: "A map",
            explanation: "Maps show all these places without containing the real things!"
        },
        {
            question: "A rooster lays an egg on a roof. Which side does it roll down?",
            answers: ["Left", "Right", "Both sides", "Neither side"],
            correct: "Neither side",
            explanation: "Roosters don't lay eggs!"
        }
    ],

    level4: [
        {
            question: "What number comes next: 2, 6, 12, 20, 30, ?",
            answers: ["36", "40", "42", "44"],
            correct: "42",
            explanation: "The differences are 4, 6, 8, 10 and then 12. So 30 + 12 = 42!"
        },
        {
            question: "A person looks at a photo and says, 'I have no brothers or sisters, but that person's father is my father's son.' Who is in the photo?",
            answers: ["Their father", "Their child", "Their uncle", "Their cousin"],
            correct: "Their child",
            explanation: "Since the person has no siblings, 'my father's son' means themselves!"
        },
        {
            question: "Which word becomes shorter when you add two letters to it?",
            answers: ["Small", "Short", "Tiny", "Little"],
            correct: "Short",
            explanation: "Add 'er' to SHORT and it becomes SHORTER!"
        },
        {
            question: "You have 6 eggs. You break 2, cook those 2 and eat those 2. How many eggs remain?",
            answers: ["2", "4", "6", "0"],
            correct: "4",
            explanation: "The same 2 eggs were broken, cooked and eaten. Four remain!"
        },
        {
            question: "If yesterday was tomorrow, today would be Friday. What day is today?",
            answers: ["Thursday", "Friday", "Saturday", "Sunday"],
            correct: "Sunday",
            explanation: "This wording shifts the reference by two days. If today were Sunday, yesterday would be Saturday and tomorrow Monday; the hypothetical swaps them, making the hypothetical today Friday."
        }
    ],

    level5: [
        {
            question: "A bat and a ball cost ₹110 together. The bat costs ₹100 more than the ball. How much does the ball cost?",
            answers: ["₹10", "₹5", "₹15", "₹20"],
            correct: "₹5",
            explanation: "The ball costs ₹5 and the bat costs ₹105. Together they cost ₹110!"
        },
        {
            question: "You have two coins that total ₹30. One of them is not a ₹10 coin. What are the coins?",
            answers: ["₹10 and ₹20", "₹5 and ₹25", "₹15 and ₹15", "₹20 and ₹20"],
            correct: "₹10 and ₹20",
            explanation: "One coin is not ₹10, but the other one can be ₹10!"
        },
        {
            question: "A clock takes 5 seconds to strike 6 times. How long does it take to strike 12 times?",
            answers: ["10 seconds", "11 seconds", "12 seconds", "15 seconds"],
            correct: "11 seconds",
            explanation: "Six strikes have 5 gaps. Twelve strikes have 11 gaps. At 1 second per gap, that's 11 seconds!"
        },
        {
            question: "A number is doubled, then increased by 10. The result is 30. What was the original number?",
            answers: ["5", "10", "15", "20"],
            correct: "10",
            explanation: "Double 10 to get 20, then add 10 to get 30!"
        },
        {
            question: "You enter a dark room with one match. There is a candle, a lamp and a fireplace. What do you light first?",
            answers: ["The candle", "The lamp", "The fireplace", "The match"],
            correct: "The match",
            explanation: "You need to light the match before lighting anything else!"
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

        // GET LATEST PROFILE NAME
        const savedName =
            localStorage.getItem("playerName") || playerName;

        const percentage = Math.round(
            (score / total) * 100
        );

        await push(ref(database, "globalLeaderboard"), {

            playerName: savedName,
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
        alert("Level not found!");
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
        level1: "🌱 Mixed Quiz - Level 1",
        level2: "🧩 Mixed Quiz - Level 2",
        level3: "🔥 Mixed Quiz - Level 3",
        level4: "🧠 Mixed Quiz - Level 4",
        level5: "👑 Mixed Quiz - Level 5"
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
const explanationBox = document.getElementById("explanation");

explanationBox.style.display = "none";
explanationBox.textContent = "";
    
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
// UPLOAD SCORE TO GLOBAL LEADERBOARD
saveGlobalScore(
    playerName,
    score,
    selectedCategory,
    questions.length
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

        // PLAYER XP REWARD SYSTEM

let earnedXP = 20;

// Perfect score bonus
if (score === questions.length) {
    earnedXP += 10;
}

// Get existing XP
let currentXP = Number(
    localStorage.getItem("playerXP")
) || 0;

// Add earned XP
currentXP += earnedXP;

// Save XP
localStorage.setItem(
    "playerXP",
    currentXP
);

console.log("XP Earned:", earnedXP);
console.log("Total XP:", currentXP);
        
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
