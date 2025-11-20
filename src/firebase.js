import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAkY6PtkwdBl4WGsphDWdxVeISQ-wBe7c4",
    authDomain: "xiansocketchat.firebaseapp.com",
    projectId: "xiansocketchat",
    storageBucket: "xiansocketchat.firebasestorage.app",
    messagingSenderId: "753662714732",
    appId: "1:753662714732:web:ae5b22180ed4a0ed5d4949",
    measurementId: "G-7826RPB8PM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);