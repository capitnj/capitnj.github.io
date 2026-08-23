import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
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

    sendButton.innerHTML = `
        <span class="button-loading" aria-label="Capi is thinking">
            <span></span>
            <span></span>
            <span></span>
        </span>
    `;

}


function resetSendButton() {

    sendButton.innerHTML = "Send";

}


async function sendQuestion() {

    const question = questionInput.value.trim();

    if (!question || sendButton.disabled) return;


    addMessage(question, "user");

    questionInput.value = "";

    sendButton.disabled = true;

    showLoading();


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

        console.error("Capi error:", error);

        addMessage(
            "Oops 😭 Capi couldn't answer right now. Please try again in a moment.",
            "ai"
        );

    }


    sendButton.disabled = false;

    resetSendButton();

}


sendButton.addEventListener("click", sendQuestion);


questionInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        sendQuestion();

    }

});


window.askSuggestion = function(question) {

    if (sendButton.disabled) return;

    questionInput.value = question;

    sendQuestion();

};