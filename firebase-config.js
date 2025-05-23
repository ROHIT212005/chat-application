// firebase-config.js

// Initialize Firebase (Compat Version)
import 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js ';
import 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js ';
import 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database-compat.js ';

const firebaseConfig = {
  apiKey: "AIzaSyCyhvEz-Dgs3k3DpW6sH6I1zhfHNP5HE1o",
  authDomain: "chat-app-internship-f3609.firebaseapp.com",
  databaseURL: "https://chat-app-internship-f3609-default-rtdb.firebaseio.com ",
  projectId: "chat-app-internship-f3609",
  storageBucket: "chat-app-internship-f3609.firebasestorage.app",
  messagingSenderId: "597277265571",
  appId: "1:597277265571:web:20731d29bc60abee7e7916"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Firebase Services
const auth = firebase.auth();
const database = firebase.database();

// Export only what you need
export { auth, database };