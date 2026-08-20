const firebaseConfig = {
  apiKey: "AIzaSyDn2FGBysOj_WdFRiieyfQIKh_s6s961oI",
  authDomain: "capitnj-73a53.firebaseapp.com",
  projectId: "capitnj-73a53",
  storageBucket: "capitnj-73a53.firebasestorage.app",
  messagingSenderId: "1019609008991",
  appId: "1:1019609008991:web:5f19dca479b475d221c4ea",
  measurementId: "G-TGSCVHMGQZ"
};

if (typeof firebase === "undefined") {
  console.error(
    "Firebase failed to load. Make sure firebase-app-compat.js, firebase-auth-compat.js, and firebase-firestore-compat.js load before firebase-init.js."
  );
} else {
  try {
    // Prevent duplicate Firebase initialization
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const auth = firebase.auth();
    const db = firebase.firestore();

    window.capitnjFirebase = {
      auth: auth,
      db: db,

      // =========================
      // AUTH FUNCTIONS
      // =========================
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

        EmailAuthProvider: firebase.auth.EmailAuthProvider,

        reauthenticateWithCredential: (user, credential) =>
          user.reauthenticateWithCredential(credential),

        onAuthStateChanged: (callback) =>
          auth.onAuthStateChanged(callback)
      },

      // =========================
      // FIRESTORE FUNCTIONS
      // =========================
      firestoreFns: {
        collection: (...args) =>
          db.collection(...args),

        doc: (...args) =>
          db.doc(...args),

        addDoc: (collectionRef, data) =>
          collectionRef.add(data),

        getDoc: (docRef) =>
          docRef.get(),

        getDocs: (queryRef) =>
          queryRef.get(),

        setDoc: (docRef, data, options) =>
          options
            ? docRef.set(data, options)
            : docRef.set(data),

        updateDoc: (docRef, data) =>
          docRef.update(data),

        deleteDoc: (docRef) =>
          docRef.delete(),

        // Creates a query from Firestore where constraints
        query: (collectionRef, ...constraints) => {
          let q = collectionRef;

          constraints.forEach((constraint) => {
            if (constraint.type === "where") {
              q = q.where(
                constraint.field,
                constraint.operator,
                constraint.value
              );
            }
          });

          return q;
        },

        where: (field, operator, value) => ({
          type: "where",
          field: field,
          operator: operator,
          value: value
        })
      },

      // =========================
      // REQUIRE LOGIN
      // =========================
      requireAuth: (callback) => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            callback(user);
          } else {
            window.location.replace("login.html");
          }
        });
      },

      // =========================
      // LOG OUT
      // =========================
      logOut: async () => {
        try {
          await auth.signOut();

          sessionStorage.clear();

          window.location.replace("login.html");
        } catch (error) {
          console.error("Logout error:", error);
        }
      }
    };

    // Tell all pages Firebase is ready
    window.dispatchEvent(new Event("firebase-ready"));

    console.log("Firebase initialized successfully.");

  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}