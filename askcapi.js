import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    initializeAppCheck,
    DebugProvider
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app-check.js";

import {
    getAI,
    getGenerativeModel,
    GoogleAIBackend
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-ai.js";


// =====================================================
// FIREBASE CONFIG
// =====================================================

const firebaseConfig = {
    apiKey: "AIzaSyDn2FGBysOj_WdFRiieyfQIKh_s6s961oI",
    authDomain: "capitnj-73a53.firebaseapp.com",
    projectId: "capitnj-73a53",
    storageBucket: "capitnj-73a53.firebasestorage.app",
    messagingSenderId: "1019609008991",
    appId: "1:1019609008991:web:5f19dca479b475d221c4ea"
};


// =====================================================
// FIREBASE APP
// =====================================================

const app = initializeApp(firebaseConfig);


// =====================================================
// APP CHECK - LOCAL DEVELOPMENT DEBUG MODE
// =====================================================

const appCheck = initializeAppCheck(app, {
    provider: new DebugProvider(),
    isTokenAutoRefreshEnabled: true
});

console.log("🛡️ App Check initialized");


// =====================================================
// FIREBASE AI
// =====================================================

const ai = getAI(app, {
    backend: new GoogleAIBackend()
});

const model = getGenerativeModel(ai, {
    model: "gemini-2.5-flash"
});


// =====================================================
// ELEMENTS
// =====================================================

const chatMessages = document.getElementById("chatMessages");
const questionInput = document.getElementById("questionInput");
const sendButton = document.getElementById("sendButton");


// =====================================================
// ADD MESSAGE
// =====================================================

function addMessage(text, sender) {

    const message = document.createElement("div");
    message.className = "message " + sender;

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    bubble.textContent = text;

    message.appendChild(bubble);
    chatMessages.appendChild(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// =====================================================
// LOADING BUTTON
// =====================================================

function showLoading() {

    sendButton.disabled = true;

    sendButton.innerHTML = `
        <span class="dot-loader">
            <span></span>
            <span></span>
            <span></span>
        </span>
    `;
}


function resetButton() {

    sendButton.disabled = false;
    sendButton.textContent = "Send";

}


// =====================================================
// SEND QUESTION
// =====================================================

async function sendQuestion() {

    const question = questionInput.value.trim();

    if (!question || sendButton.disabled) {
        return;
    }

    addMessage(question, "user");

    questionInput.value = "";

    showLoading();


    try {

        console.log("Capi: starting request...");
        console.log("Question:", question);


        const prompt = `
You are Capi, the friendly AI college assistant for CapItNJ.

CapItNJ helps students discover and compare colleges.

Help students with:
- college admissions
- GPA
- SAT and ACT
- reach, target, and safety schools
- choosing colleges
- applications
- essays
- FAFSA
- scholarships
- financial aid
- majors
- college life

Be friendly, helpful, accurate, and easy to understand.

Keep answers concise unless the student asks for more detail.

Do not guarantee admission to any college.

Student question:
${question}
`;


        const result = await model.generateContent(prompt);

        console.log("Capi raw result:", result);


        const response = result.response;

        if (!response) {
            throw new Error("Firebase returned no response object.");
        }


        const answer = response.text();

        console.log("Capi answer:", answer);


        if (!answer) {
            throw new Error("Firebase returned an empty answer.");
        }


        addMessage(answer, "ai");


    } catch (error) {

        console.error("=================================");
        console.error("CAPI ERROR");
        console.error("=================================");
        console.error(error);
        console.error("Message:", error?.message);
        console.error("Code:", error?.code);
        console.error("Name:", error?.name);


        addMessage(
            "Capi hit an error 😭 Check the browser console for the exact error.",
            "ai"
        );

    } finally {

        resetButton();

    }

}


// =====================================================
// EVENTS
// =====================================================

sendButton.addEventListener("click", sendQuestion);


questionInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();

        sendQuestion();

    }

});


window.askSuggestion = function(question) {

    if (sendButton.disabled) {
        return;
    }

    questionInput.value = question;

    sendQuestion();

};


// =====================================================
// STARTUP LOGS
// =====================================================

console.log("🔥 Capi initialized");
console.log("🛡️ Firebase App Check:", appCheck);
console.log("🤖 Firebase AI model:", model);