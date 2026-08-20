let firebaseReady = false;

const firebaseConfig = {
  apiKey: "AIzaSyDn2FGBysOj_WdFRiieyfQIKh_s6s961oI",
  authDomain: "capitnj-73a53.firebaseapp.com",
  projectId: "capitnj-73a53",
  storageBucket: "capitnj-73a53.firebasestorage.app",
  messagingSenderId: "1019609008991",
  appId: "1:1019609008991:web:5f19dca479b475d221c4ea",
  measurementId: "G-TGSCVHMGQZ"
};

function initializeFirebase() {
  if (typeof firebase === "undefined") {
    console.error(
      "Firebase SDK not loaded. Make sure the compat Firebase scripts load before firebase-init.js."
    );
    return;
  }

  try {
    // Prevent "Firebase app already exists" errors.
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const auth = firebase.auth();
    const db = firebase.firestore();

    window.capitnjFirebase = {
      auth: auth,
      db: db,

      authFns: {
        signInWithEmail: (email, password) =>
          auth.signInWithEmailAndPassword(email, password),

        createUserWithEmail: (email, password) =>
          auth.createUserWithEmailAndPassword(email, password),

        sendPasswordResetEmail: (email) =>
          auth.sendPasswordResetEmail(email),

        signOut: () =>
          auth.signOut(),

        updateProfile: (user, data) =>
          user.updateProfile(data),

        updateEmail: (user, email) =>
          user.updateEmail(email),

        updatePassword: (user, password) =>
          user.updatePassword(password),

        deleteUser: (user) =>
          user.delete(),

        EmailAuthProvider:
          firebase.auth.EmailAuthProvider,

        reauthenticateWithCredential: (user, credential) =>
          user.reauthenticateWithCredential(credential),

        onAuthStateChanged: (callback) =>
          auth.onAuthStateChanged(callback)
      },

      requireAuth: (callback) => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            callback(user);
          } else {
            window.location.replace("login.html");
          }
        });
      },

      logOut: async () => {
        try {
          await auth.signOut();
          localStorage.removeItem("userLoggedIn");
          localStorage.removeItem("userProfile");
          sessionStorage.clear();
          window.location.replace("login.html");
        } catch (error) {
          console.error("Logout error:", error);
        }
      }
    };

    firebaseReady = true;
    window.dispatchEvent(new Event("firebase-ready"));

    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

initializeFirebase();