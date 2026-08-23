import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getAI,
    getGenerativeModel,
    GoogleAIBackend
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-ai.js";


/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyDn2FGBysOj_WdFRiieyfQIKh_s6s961oI",
    authDomain: "capitnj-73a53.firebaseapp.com",
    projectId: "capitnj-73a53",
    storageBucket: "capitnj-73a53.firebasestorage.app",
    messagingSenderId: "1019609008991",
    appId: "1:1019609008991:web:5f19dca479b475d221c4ea",
    measurementId: "G-TGSCVHMGQZ"
};


const app = initializeApp(firebaseConfig);


/* =========================================================
   CAPi AI
========================================================= */

const ai = getAI(app, {
    backend: new GoogleAIBackend()
});


const model = getGenerativeModel(ai, {
    model: "gemini-3.6-flash"
});


/* =========================================================
   ELEMENTS
========================================================= */

const chatMessages = document.getElementById("chatMessages");
const questionInput = document.getElementById("questionInput");
const sendButton = document.getElementById("sendButton");


if (!chatMessages || !questionInput || !sendButton) {
    console.error("Capi: required chat elements were not found.");
}


/* =========================================================
   ADD MESSAGE
========================================================= */

function addMessage(text, sender) {

    const message = document.createElement("div");

    message.className = `message ${sender}`;

    const bubble = document.createElement("div");

    bubble.className = "bubble";

    bubble.textContent = text;

    message.appendChild(bubble);

    chatMessages.appendChild(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


/* =========================================================
   LOADING
========================================================= */

function showLoading() {

    sendButton.disabled = true;

    sendButton.innerHTML = `
        <span class="button-loading" aria-label="Capi is thinking">
            <span></span>
            <span></span>
            <span></span>
        </span>
    `;
}


function resetSendButton() {

    sendButton.disabled = false;

    sendButton.innerHTML = "Send";
}


/* =========================================================
   SEND QUESTION
========================================================= */

async function sendQuestion() {

    const question = questionInput.value.trim();

    if (!question) {
        return;
    }

    if (sendButton.disabled) {
        return;
    }


    /* Show user's message */

    addMessage(question, "user");

    questionInput.value = "";

    showLoading();


    try {

        const prompt = `
You are Capi, the friendly AI college assistant for CapItNJ.

CapItNJ helps students explore colleges, compare schools,
understand admissions, and build a college list.

Your job is to give useful, accurate, student-friendly advice.

You can help with:

- college admissions
- GPA questions
- SAT and ACT
- reach, target, and safety schools
- choosing colleges
- college applications
- essays
- scholarships
- FAFSA
- financial aid
- majors
- college life
- comparing schools
- understanding admission requirements
- building a balanced college list

IMPORTANT RULES:

1. Be friendly and conversational.
2. Keep answers reasonably concise.
3. Explain complicated things simply.
4. Never guarantee that a student will be admitted.
5. Do not invent statistics.
6. If you are unsure about a current statistic, say so.
7. Ask for more information when it would make the answer substantially better.
8. You are Capi, so speak naturally rather than sounding like a textbook.

Student's question:

${question}
`;


        console.log("Capi: sending request...");


        const result = await model.generateContent(prompt);


        console.log("Capi: response received", result);


        const response = result.response;


        if (!response) {
            throw new Error("No response returned from Gemini.");
        }


        const answer = response.text();


        if (!answer || !answer.trim()) {
            throw new Error("Gemini returned an empty response.");
        }


        addMessage(answer.trim(), "ai");


    } catch (error) {

        console.error("CAPi AI ERROR:", error);


        let errorMessage =
            "Capi couldn't answer right now 😭 Try again in a second.";


        if (error?.message) {

            console.error(
                "Detailed Capi error:",
                error.message
            );

        }


        addMessage(errorMessage, "ai");

    } finally {

        resetSendButton();

    }

}


/* =========================================================
   SEND BUTTON
========================================================= */

sendButton.addEventListener(
    "click",
    sendQuestion
);


/* =========================================================
   ENTER KEY
========================================================= */

questionInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendQuestion();

        }

    }
);


/* =========================================================
   SUGGESTION BUTTONS
========================================================= */

window.askSuggestion = function (question) {

    if (!question) {
        return;
    }

    if (sendButton.disabled) {
        return;
    }

    questionInput.value = question;

    sendQuestion();

};


/* =========================================================
   DEBUG
========================================================= */

console.log("Capi initialized successfully.");