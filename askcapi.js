import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getAI,
    getGenerativeModel,
    GoogleAIBackend
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-ai.js";


const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "capitnj-73a53.firebaseapp.com",
    projectId: "capitnj-73a53",
    storageBucket: "capitnj-73a53.firebasestorage.app",
    messagingSenderId: "1019609008991",
    appId: "1:1019609008991:web:5f19dca479b475d221c4ea"
};


const app = initializeApp(firebaseConfig);

const ai = getAI(app, {
    backend: new GoogleAIBackend()
});

const model = getGenerativeModel(ai, {
    model: "gemini-3.6-flash"
});


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
You are Capi, the friendly college assistant for CapItNJ.

Help students with:
- college admissions
- GPA
- SAT and ACT
- reach, target, and safety schools
- college selection
- applications
- essays
- FAFSA
- scholarships
- financial aid
- majors
- college life

Be friendly, clear, accurate, and concise.

Do not guarantee admission.

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


console.log("🔥 Capi initialized");
console.log("Firebase AI model:", model);