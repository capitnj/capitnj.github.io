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

function initializeFirebase() {
  if (firebaseState.auth) {
    return firebaseState;
  }

  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  const requireAuth = (onReady) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        window.location.replace("login.html");
        return;
      }
      onReady(user);
    });
  };

  const logOut = () => {
    firebase.auth().signOut()
      .then(() => window.location.replace("login.html"))
      .catch(() => window.location.replace("login.html"));
  };

  const authFns = {
    onAuthStateChanged: firebase.auth().onAuthStateChanged,
    createUserWithEmailAndPassword: firebase.auth().createUserWithEmailAndPassword,
    signInWithEmailAndPassword: firebase.auth().signInWithEmailAndPassword,
    sendPasswordResetEmail: firebase.auth().sendPasswordResetEmail,
    updateProfile: firebase.auth().currentUser?.updateProfile,
    updateEmail: firebase.auth().currentUser?.updateEmail,
    updatePassword: firebase.auth().currentUser?.updatePassword,
    deleteUser: firebase.auth().currentUser?.delete,
    EmailAuthProvider: firebase.auth.EmailAuthProvider,
    reauthenticateWithCredential: firebase.auth().currentUser?.reauthenticateWithCredential
  };

  const firestoreFns = {
    doc: firebase.firestore.doc,
    getDoc: firebase.firestore.getDoc,
    setDoc: firebase.firestore.setDoc,
    deleteDoc: firebase.firestore.deleteDoc,
    collection: firebase.firestore.collection,
    addDoc: firebase.firestore.addDoc,
    getDocs: firebase.firestore.getDocs,
    query: firebase.firestore.query,
    orderBy: firebase.firestore.orderBy
  };

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

firebaseState.ready = Promise.resolve(initializeFirebase());
window.capitnjFirebase = firebaseState;

initializeFirebase();