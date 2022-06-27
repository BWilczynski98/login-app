import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCQX2ZIiHRGVeD1GmYAuIv2H9dkES5Axnk",
    authDomain: "login-test-a6d7b.firebaseapp.com",
    projectId: "login-test-a6d7b",
    storageBucket: "login-test-a6d7b.appspot.com",
    messagingSenderId: "1049205098317",
    appId: "1:1049205098317:web:4cde460c610f30853f1904"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);