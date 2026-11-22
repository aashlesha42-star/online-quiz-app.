import {
    ref,
    set,
    get,
    update,
    onValue
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-database.js";


// MULTIPLAYER QUESTIONS

const multiplayerQuestions = [
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
        question: "What is 12 × 5?",
        answers: ["50", "55", "60", "65"],
        correct: "60"
    }
];


// VARIABLES

let database;
let currentUser;
let currentRoom = "";
let isHost = false;

let stopRoomListener = null;
let timerInterval = null;
let hostAdvanceTimeout = null;

let activeTimerKey = "";
let scheduledQuestionKey = "";


// FIREBASE INITIALIZATION

async function initializeMultiplayer() {

    try {

        currentUser = await window.firebaseReady;
        database = window.firebaseDB;

        document.getElementById("message").textContent =
            "Firebase connected successfully! 💜";

    } catch (error) {

        console.error(error);

        document.getElementById("message").textContent =
            "Firebase connection failed. Please refresh.";

    }
}

initializeMultiplayer();


// ROOM CODE

function generateRoomCode() {

    return Math.floor(
        100000 + Math.random() * 900000
    ).toString();

}


// CREATE ROOM

window.createRoom = async function () {

    if (!currentUser || !database) {
        alert("Please wait. Firebase is loading!");
        return;
    }

    const name =
        document.getElementById("playerName").value.trim();

    if (!name) {
        alert("Please enter your name!");
        return;
    }

    try {

        currentRoom = generateRoomCode();
        isHost = true;

        const roomData = {

            hostUid: currentUser.uid,

            status: "waiting",

            createdAt: Date.now(),

            questionIndex: 0,

            questionStartedAt: 0,

            players: {

                [currentUser.uid]: {
                    name: name,
                    score: 0
                }

            },

            answers: {}

        };

        await set(
            ref(database, "rooms/" + currentRoom),
            roomData
        );

        showRoom();

        document.getElementById("message").textContent =
            "Room created successfully! 🎉";

        listenToRoom();

    } catch (error) {

        console.error(error);

        alert("Could not create room. Please try again.");

    }

};


// JOIN ROOM

window.joinRoom = async function () {

    if (!currentUser || !database) {
        alert("Please wait. Firebase is loading!");
        return;
    }

    const name =
        document.getElementById("playerName").value.trim();

    const code =
        document.getElementById("joinCode").value.trim();

    if (!name) {
        alert("Please enter your name!");
        return;
    }

    if (!/^\d{6}$/.test(code)) {
        alert("Enter a valid 6-digit room code!");
        return;
    }

    try {

        const roomRef = ref(database, "rooms/" + code);

        const snapshot = await get(roomRef);

        if (!snapshot.exists()) {
            alert("Room not found!");
            return;
        }

        const room = snapshot.val();

        if (room.status !== "waiting") {
            alert("This game has already started!");
            return;
        }

        currentRoom = code;
        isHost = false;

        await set(
            ref(
                database,
                "rooms/" + code + "/players/" + currentUser.uid
            ),
            {
                name: name,
                score: 0
            }
        );

        showRoom();

        document.getElementById("message").textContent =
            "You joined the room successfully! 🎉";

        listenToRoom();

    } catch (error) {

        console.error(error);

        alert("Could not join room. Please try again.");

    }

};


// SHOW ROOM

function showRoom() {

    document.getElementById("entrySection").style.display =
        "none";

    document.getElementById("roomSection").style.display =
        "block";

    document.getElementById("roomCode").textContent =
        currentRoom;

    document.getElementById("startButton").style.display =
        isHost ? "inline-block" : "none";

}


// LISTEN TO FIREBASE ROOM

function listenToRoom() {

    if (stopRoomListener) {
        stopRoomListener();
    }

    const roomRef = ref(
        database,
        "rooms/" + currentRoom
    );

    stopRoomListener = onValue(roomRef, (snapshot) => {

        if (!snapshot.exists()) {
            document.getElementById("message").textContent =
                "Room no longer exists.";
            return;
        }

        const room = snapshot.val();

        displayPlayers(room.players || {});

        if (room.status === "waiting") {

            document.getElementById("roomSection").style.display =
                "block";

            document.getElementById("quizSection").style.display =
                "none";

            document.getElementById("resultSection").style.display =
                "none";

            document.getElementById("waitingMessage").textContent =
                "Waiting for the host to start...";

        }

        if (room.status === "playing") {

            document.getElementById("roomSection").style.display =
                "none";

            document.getElementById("quizSection").style.display =
                "block";

            document.getElementById("resultSection").style.display =
                "none";

            displayQuestion(room);

            displayScores(room.players || {});

            scheduleNextQuestion(room);

        }

        if (room.status === "completed") {

            clearInterval(timerInterval);
            clearTimeout(hostAdvanceTimeout);

            document.getElementById("roomSection").style.display =
                "none";

            document.getElementById("quizSection").style.display =
                "none";

            showFinalResults(room.players || {});

        }

    });

}


// DISPLAY PLAYERS

function displayPlayers(players) {

    const playerList =
        document.getElementById("playerList");

    playerList.innerHTML = "";

    Object.values(players).forEach((player) => {

        const li = document.createElement("li");

        li.textContent =
            "👤 " + player.name;

        playerList.appendChild(li);

    });

}


// START QUIZ BUTTON

document.getElementById("startButton").addEventListener(
    "click",
    async function () {

        if (!isHost || !currentRoom) return;

        try {

            const roomRef = ref(
                database,
                "rooms/" + currentRoom
            );

            const snapshot = await get(roomRef);

            const room = snapshot.val();

            if (Object.keys(room.players || {}).length < 2) {

                alert("At least 2 players are needed!");
                return;

            }

            await update(roomRef, {

                status: "playing",

                questionIndex: 0,

                questionStartedAt: Date.now(),

                answers: {}

            });

        } catch (error) {

            console.error(error);

            alert("Could not start the quiz.");

        }

    }
);


// DISPLAY QUESTION

function displayQuestion(room) {

    const index = room.questionIndex;

    const questionData =
        multiplayerQuestions[index];

    if (!questionData) return;

    document.getElementById("categoryName").textContent =
        "General Knowledge Challenge";

    document.getElementById("questionNumber").textContent =
        "Question " + (index + 1) +
        " of " + multiplayerQuestions.length;

    document.getElementById("question").textContent =
        questionData.question;

    const answersBox =
        document.getElementById("answers");

    const answerMessage =
        document.getElementById("answerMessage");

    const alreadyAnswered =
        room.answers &&
        room.answers[currentUser.uid];

    answersBox.innerHTML = "";

    answerMessage.textContent = alreadyAnswered
        ? "✅ Answer submitted! Waiting for the next question..."
        : "";

    questionData.answers.forEach((answer) => {

        const button = document.createElement("button");

        button.textContent = answer;

        button.disabled = Boolean(alreadyAnswered);

        button.onclick = function () {

            submitAnswer(answer, questionData, room);

        };

        answersBox.appendChild(button);

    });

    startQuestionTimer(room);

}


// SUBMIT ANSWER

async function submitAnswer(answer, questionData, room) {

    const answerRef = ref(
        database,
        "rooms/" + currentRoom +
        "/answers/" + currentUser.uid
    );

    const existingAnswer = await get(answerRef);

    if (existingAnswer.exists()) return;

    const remaining =
        15000 - (Date.now() - room.questionStartedAt);

    if (remaining <= 0) return;

    const isCorrect =
        answer === questionData.correct;

    try {

        await set(answerRef, {

            answer: answer,

            correct: isCorrect,

            answeredAt: Date.now()

        });

        if (isCorrect) {

            const playerScoreRef = ref(
                database,
                "rooms/" + currentRoom +
                "/players/" + currentUser.uid + "/score"
            );

            const scoreSnapshot = await get(playerScoreRef);

            const oldScore = Number(scoreSnapshot.val()) || 0;

            await set(playerScoreRef, oldScore + 1);

        }

        document.getElementById("answerMessage").textContent =
            isCorrect
                ? "🎉 Correct answer!"
                : "❌ Incorrect answer!";

        document.querySelectorAll("#answers button").forEach(
            button => button.disabled = true
        );

    } catch (error) {

        console.error(error);

        alert("Could not submit your answer.");

    }

}


// QUESTION TIMER

function startQuestionTimer(room) {

    const questionKey =
        room.questionIndex + "_" + room.questionStartedAt;

    if (activeTimerKey === questionKey) return;

    activeTimerKey = questionKey;

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        const elapsed =
            Date.now() - room.questionStartedAt;

        const remaining =
            Math.max(0, 15 - Math.floor(elapsed / 1000));

        document.getElementById("timer").textContent =
            remaining;

        if (remaining <= 0) {

            clearInterval(timerInterval);

            document.querySelectorAll("#answers button").forEach(
                button => button.disabled = true
            );

            document.getElementById("answerMessage").textContent =
                "⏰ Time's up!";

        }

    }, 200);

}


// LIVE SCOREBOARD

function displayScores(players) {

    const liveScores =
        document.getElementById("liveScores");

    liveScores.innerHTML = "";

    const sortedPlayers = Object.values(players).sort(
        (a, b) => (b.score || 0) - (a.score || 0)
    );

    sortedPlayers.forEach((player, index) => {

        const p = document.createElement("p");

        p.textContent =
            (index + 1) + ". " +
            player.name + " — " +
            (player.score || 0) + " points";

        liveScores.appendChild(p);

    });

}


// HOST MOVES TO NEXT QUESTION

function scheduleNextQuestion(room) {

    if (!isHost) return;

    const questionKey =
        room.questionIndex + "_" + room.questionStartedAt;

    if (scheduledQuestionKey === questionKey) return;

    scheduledQuestionKey = questionKey;

    clearTimeout(hostAdvanceTimeout);

    const elapsed =
        Date.now() - room.questionStartedAt;

    const remaining =
        Math.max(0, 15000 - elapsed);

    hostAdvanceTimeout = setTimeout(async () => {

        const roomRef = ref(
            database,
            "rooms/" + currentRoom
        );

        const snapshot = await get(roomRef);

        if (!snapshot.exists()) return;

        const latestRoom = snapshot.val();

        if (
            latestRoom.status !== "playing" ||
            latestRoom.questionIndex !== room.questionIndex
        ) {
            return;
        }

        const nextIndex =
            latestRoom.questionIndex + 1;

        if (nextIndex >= multiplayerQuestions.length) {

            await update(roomRef, {
                status: "completed"
            });

        } else {

            await update(roomRef, {

                questionIndex: nextIndex,

                questionStartedAt: Date.now(),

                answers: {}

            });

        }

    }, remaining);

}


// FINAL RESULTS

function showFinalResults(players) {

    document.getElementById("resultSection").style.display =
        "block";

    const finalScores =
        document.getElementById("finalScores");

    finalScores.innerHTML = "";

    const sortedPlayers = Object.values(players).sort(
        (a, b) => (b.score || 0) - (a.score || 0)
    );

    sortedPlayers.forEach((player, index) => {

        const p = document.createElement("p");

        p.textContent =
            (index + 1) + ". " +
            player.name + " — " +
            (player.score || 0) + " points";

        finalScores.appendChild(p);

    });

    if (sortedPlayers.length === 0) return;

    const highestScore =
        sortedPlayers[0].score || 0;

    const winners = sortedPlayers.filter(
        player => (player.score || 0) === highestScore
    );

    document.getElementById("winner").textContent =
        winners.length > 1
            ? "🤝 It's a tie!"
            : "🏆 Winner: " + winners[0].name + "!";

}
