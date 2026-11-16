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

function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    document.getElementById("question").textContent = q.question;

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

            if (answer === q.correct) {
                score++;
                document.getElementById("score").textContent = "Correct answer! 🎉";
            } else {
                document.getElementById("score").textContent = "Wrong answer!";
            }
        };

        box.appendChild(button);
    });
}

function nextQuestion() {
    if (!answered) {
        alert("Please select an answer first!");
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        document.body.innerHTML = `
            <h1>Quiz Completed! 🎉</h1>
            <h2>Your Score: ${score}/${questions.length}</h2>
            <button onclick="location.href='quiz.html'">Play Again</button>
            <button onclick="location.href='index.html'">Home</button>
        `;
    }
}

showQuestion();
