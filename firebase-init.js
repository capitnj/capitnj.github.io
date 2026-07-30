// This file initializes Firebase once and exposes the shared instances globally.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDn2FGBysOj_WdFRiieyfQIKh_s6s961oI",
  authDomain: "capitnj-73a53.firebaseapp.com",
  projectId: "capitnj-73a53",
  storageBucket: "capitnj-73a53.firebasestorage.app",
  messagingSenderId: "1019609008991",
  appId: "1:1019609008991:web:5f19dca479b475d221c4ea",
  measurementId: "G-TGSCVHMGQZ"
};

const firebaseState = {
  app: null,
  auth: null,
  db: null,
  ready: null,
  requireAuth: null,
  logOut: null,
  authFns: null,
  firestoreFns: null
};

window.capitnjFirebase = firebaseState;

async function initializeFirebase() {
  if (firebaseState.auth) {
    return firebaseState;
  }

  if (firebaseState.ready) {
    return firebaseState.ready;
  }

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const requireAuth = (onReady) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.replace("login.html");
        return;
      }
      onReady(user);
    });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => window.location.replace("login.html"))
      .catch(() => window.location.replace("login.html"));
  };

  const authFns = {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    updateEmail,
    updatePassword,
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential
  };

  const firestoreFns = { doc, getDoc, setDoc, deleteDoc, collection, addDoc, getDocs, query, orderBy };

  firebaseState.app = app;
  firebaseState.auth = auth;
  firebaseState.db = db;
  firebaseState.requireAuth = requireAuth;
  firebaseState.logOut = logOut;
  firebaseState.authFns = authFns;
  firebaseState.firestoreFns = firestoreFns;

  window.auth = auth;
  window.db = db;
  window.requireAuth = requireAuth;
  window.logOut = logOut;
  window.firebaseAuthFns = authFns;
  window.firestoreFns = firestoreFns;

  window.dispatchEvent(new Event("firebase-ready"));
  return firebaseState;
}

firebaseState.ready = initializeFirebase();
window.capitnjFirebase = firebaseState;

export { initializeFirebase };