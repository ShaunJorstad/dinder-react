import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDv-nM3fqrprPGhowq3RJ8W1H9bhv5z5AI",
  authDomain: "dinder-react.firebaseapp.com",
  projectId: "dinder-react",
  storageBucket: "dinder-react.appspot.com",
  messagingSenderId: "102072158034",
  appId: "1:102072158034:web:161c1fb4eb6adf92331c8b",
  measurementId: "G-Z3TPBN6KS4",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const fireStore = firebase.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
// googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export default fireStore;
export { googleProvider, auth };
