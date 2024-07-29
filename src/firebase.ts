import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

// firebase configuration keys will get from .env file in production environment
// just for testing purposes, I am hardcoding the values here
let config = {
  apiKey: "AIzaSyBaSktkn8DnhG6sWwOobNy6gKtuThHAJRs",
  authDomain: "fir-notifications-8c1be.firebaseapp.com",
  projectId: "fir-notifications-8c1be",
  storageBucket: "fir-notifications-8c1be.appspot.com",
  messagingSenderId: "609382791500",
  appId: "1:609382791500:web:a9be08bdee5db12249b7e9",
};

const app = initializeApp(config);
// firestore database initialization using firebase app
export const firestoreDB = getFirestore(app);

// attach firestore with emulator if running on localhost
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(firestoreDB, "127.0.0.1", 8080);
}
