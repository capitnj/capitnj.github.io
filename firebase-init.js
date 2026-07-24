// Firebase project: CapItNJ
// This file initializes Firebase using the config from your project.
// Safe to be public — these are client identifiers, not secret keys.

const firebaseConfig = {
  apiKey: "AIzaSyDn2FGBysOj_WdFRiieyfQIKh_s6s961oI",
  authDomain: "capitnj-73a53.firebaseapp.com",
  projectId: "capitnj-73a53",
  storageBucket: "capitnj-73a53.firebasestorage.app",
  messagingSenderId: "1019609008991",
  appId: "1:1019609008991:web:5f19dca479b475d221c4ea",
  measurementId: "G-TGSCVHMGQZ"
};

import { initializeApp } from "https://gstatic.com";
import { getAuth } from "https://gstatic.com";
import { getFirestore } from "https://gstatic.com";

// Initialize Firebase services cleanly
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Redirects to login.html if nobody is signed in.
function requireAuth(onReady) {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "login.html";
    } else {
      onReady(user);
    }
  });
}

// Make these available to your other files if needed
window.auth = auth;
window.db = db;
window.requireAuth = requireAuth;