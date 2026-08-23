import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    initializeAppCheck,
    ReCaptchaEnterpriseProvider
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app-check.js";

import {
    getAI,
    getGenerativeModel,
    GoogleAIBackend
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-ai.js";


const firebaseConfig = {
    apiKey: "AIzaSyDn2FGBysOj_WdFRiieyfQIKh_s6s961oI",
    authDomain: "capitnj-73a53.firebaseapp.com",
    projectId: "capitnj-73a53",
    storageBucket: "capitnj-73a53.firebasestorage.app",
    messagingSenderId: "1019609008991",
    appId: "1:1019609008991:web:5f19dca479b475d221c4ea",
    measurementId: "G-TGSCVHMGQZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase App Check
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(
        "6Le3v5QtAAAAADmrLYAj45flAtG13rwxjrZUIe83"
    ),
    isTokenAutoRefreshEnabled: true
});


// Initialize Firebase AI
const ai = getAI(app, {
    backend: new GoogleAIBackend()
});


// Gemini model
const model = getGenerativeModel(ai, {
    model: "gemini-3.6-flash"
});


// Page elements
const chatMessages = document.getElementById("chatMessages");
const questionInput = document.getElementById("questionInput");
const sendButton = document.getElementById("sendButton");


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


async function sendQuestion() {

    const question = questionInput.value.trim();

    if (!question) return;


    addMessage(question, "user");

    questionInput.value = "";

    sendButton.disabled = true;
    sendButton.textContent = "Thinking...";


    try {

        const prompt = `
You are Capi, the friendly AI college assistant for CapitNJ.

CapitNJ is a website that helps students find and match with colleges.

Help students with:
- college admissions
- GPA questions
- SAT and ACT questions
- choosing colleges
- reach, target, and safety schools
- applications
- essays
- financial aid
- FAFSA
- scholarships
- college life

Be friendly, helpful, and easy to understand.

Keep answers relatively concise unless the user asks for more detail.

Do not pretend you know a student's exact admission chances unless they provide enough information.

User question:
${question}
        `;


        const result = await model.generateContent(prompt);

        const response = result.response;

        const answer = response.text();

        addMessage(answer, "ai");

    } catch (error) {

        console.error("CAPI ERROR:", error);

        // Show the actual error while we're debugging
        addMessage(
            "Capi hit an error 😭\n\n" +
            (error?.message || "Unknown error"),
            "ai"
        );
    }


    sendButton.disabled = false;
    sendButton.textContent = "Send";
}


sendButton.addEventListener("click", sendQuestion);


questionInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendQuestion();
    }

});


window.askSuggestion = function(question) {

    questionInput.value = question;

    sendQuestion();

};