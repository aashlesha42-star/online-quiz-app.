import {
    ref,
    set,
    get,
    update,
    onValue
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-database.js";

let database;
let currentUser;
let currentRoom = "";
let isHost = false;

// Wait for Firebase login
async function initializeMultiplayer() {
    try {
        currentUser = await window.firebaseReady;
        database = window.firebaseDB;

        console.log("Multiplayer Firebase ready!");
    } catch (error) {
        document.getElementById("message").textContent =
            "Firebase login failed. Please refresh the page.";
        console.error(error);
    }
}

initializeMultiplayer();


// Generate a 6-digit room code
function generateRoomCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}


// CREATE ROOM
window.createRoom = async function () {
    if (!currentUser || !database) {
        alert("Please wait. Firebase is loading!");
        return;
    }

    const name = document.getElementById("playerName").value.trim();

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

            players: {
                [currentUser.uid]: {
                    name: name,
                    score: 0
                }
            }
        };

        await set(
            ref(database, "rooms/" + currentRoom),
            roomData
        );

        showRoom();

        document.getElementById("message").textContent =
            "Room created successfully!";

        listenToPlayers();

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

    const name = document.getElementById("playerName").value.trim();

    const code = document.getElementById("joinCode").value.trim();

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
            "You joined the room successfully!";

        listenToPlayers();

    } catch (error) {
        console.error(error);
        alert("Could not join room. Please try again.");
    }
};


// SHOW ROOM
function showRoom() {
    document.getElementById("roomSection").style.display = "block";

    document.getElementById("roomCode").textContent = currentRoom;

    document.getElementById("startButton").style.display =
        isHost ? "inline-block" : "none";
}


// DISPLAY PLAYERS
function listenToPlayers() {
    const playersRef = ref(
        database,
        "rooms/" + currentRoom + "/players"
    );

    onValue(playersRef, (snapshot) => {
        const players = snapshot.val() || {};

        const playerList = document.getElementById("playerList");

        playerList.innerHTML = "";

        Object.values(players).forEach((player) => {
            const li = document.createElement("li");

            li.textContent = player.name;

            playerList.appendChild(li);
        });
    });
}


// START QUIZ
document.getElementById("startButton").addEventListener("click", async () => {
    if (!isHost || !currentRoom) return;

    try {
        await update(
            ref(database, "rooms/" + currentRoom),
            {
                status: "playing"
            }
        );

        document.getElementById("message").textContent =
            "Quiz started! Multiplayer game is ready.";

    } catch (error) {
        console.error(error);
        alert("Could not start the quiz.");
    }
});
