let firebaseReady = false;

function initializeFirebase() {
  if (typeof firebase === 'undefined') {
    console.error('Firebase SDK not loaded');
    setTimeout(initializeFirebase, 100);
    return;
  }

  const firebaseConfig = {
    apiKey: "AIzaSyDn2FGBysOj_WdFRiieyfQIKh_s6s961oI",
    authDomain: "capitnj-73a53.firebaseapp.com",
    projectId: "capitnj-73a53",
    storageBucket: "capitnj-73a53.firebasestorage.app",
    messagingSenderId: "1019609008991",
    appId: "1:1019609008991:web:5f19dca479b475d221c4ea",
    measurementId: "G-TGSCVHMGQZ"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();

  window.capitnjFirebase = {
    auth: auth,
    db: db,
    authFns: {
      signInWithEmail: (email, password) => auth.signInWithEmailAndPassword(email, password),
      createUserWithEmail: (email, password) => auth.createUserWithEmailAndPassword(email, password),
      signOut: () => auth.signOut(),
      updateProfile: (user, data) => user.updateProfile(data),
      updateEmail: (user, email) => user.updateEmail(email),
      updatePassword: (user, password) => user.updatePassword(password),
      deleteUser: (user) => user.delete(),
      EmailAuthProvider: firebase.auth.EmailAuthProvider,
      reauthenticateWithCredential: (user, credential) => user.reauthenticateWithCredential(credential),
      onAuthStateChanged: (callback) => auth.onAuthStateChanged(callback)
    },
    firestoreFns: {
      doc: (db, ...args) => firebase.firestore.doc(db, ...args),
      getDoc: (docRef) => firebase.firestore.getDoc(docRef),
      setDoc: (docRef, data, options) => firebase.firestore.setDoc(docRef, data, options),
      updateDoc: (docRef, data) => firebase.firestore.updateDoc(docRef, data),
      deleteDoc: (docRef) => firebase.firestore.deleteDoc(docRef),
      collection: (db, name) => firebase.firestore.collection(db, name),
      query: (...args) => firebase.firestore.query(...args),
      where: (...args) => firebase.firestore.where(...args),
      getDocs: (q) => firebase.firestore.getDocs(q)
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
        sessionStorage.clear();
        window.location.replace("login.html");
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  firebaseReady = true;
  window.dispatchEvent(new Event('firebase-ready'));
}

// Start initialization when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFirebase);
} else {
  initializeFirebase();
}