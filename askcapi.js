import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    initializeAppCheck,
    ReCaptchaV3Provider
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
    appId: "1:1019609008991:web:5f19dca479b475d221c4ea"
};




const app = initializeApp(firebaseConfig);



self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;



const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider("YOUR_RECAPTCHA_V3_SITE_KEY"),
    isTokenAutoRefreshEnabled: true
});

console.log("🛡️ App Check initialized");




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

    if (!question || sendButton.disabled) return;

    addMessage(question, "user");
    questionInput.value = "";
    showLoading();

    try {
        console.log("Capi: starting request...");

        const prompt = `
You are Capi, the friendly AI college assistant for CapItNJ.

Help students with college admissions, GPA, SAT and ACT,
college lists, reach/target/safety schools, applications,
essays, FAFSA, financial aid, scholarships, majors,
and college life.

Be friendly, accurate, helpful, and easy to understand.
Keep answers concise unless asked for more detail.
Never guarantee admission.

Student question:
${question}
`;

        const result = await model.generateContent(prompt);
        const answer = result.response.text();

        if (!answer) {
            throw new Error("Firebase returned an empty answer.");
        }

        addMessage(answer, "ai");

    } catch (error) {

        console.error("CAPI ERROR:", error);

        addMessage(
            "Capi hit an error 😭 Check the console.",
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
    if (sendButton.disabled) return;

    questionInput.value = question;
    sendQuestion();
};


console.log("🔥 Capi initialized");
console.log("🛡️ App Check:", appCheck);
console.log("🤖 Firebase AI model:", model);