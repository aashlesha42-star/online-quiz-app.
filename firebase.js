import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import {
    getAuth,
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyCJdjL9pCJOQNKU88S3HQ0jGW-al_mytnM",
    authDomain: "quizmaster-baf63.firebaseapp.com",
    databaseURL: "https://quizmaster-baf63-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "quizmaster-baf63",
    storageBucket: "quizmaster-baf63.firebasestorage.app",
    messagingSenderId: "990713789354",
    appId: "1:990713789354:web:32596c4da05425250709d3"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const database = getDatabase(app);

window.firebaseAuth = auth;
window.firebaseDB = database;

window.firebaseReady = signInAnonymously(auth)
    .then((userCredential) => {
        console.log("Guest login successful!");
        return userCredential.user;
    })
    .catch((error) => {
        console.error("Firebase login error:", error);
        throw error;
    });
