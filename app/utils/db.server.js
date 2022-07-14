// Import the functions you need from the SDKs you need
import admin from "firebase-admin";
import { applicationDefault, initializeApp as initializeAdminApp } from "firebase-admin/app";
import { initializeApp } from "firebase/app";

require("dotenv").config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

if (!admin.apps.length) {
  initializeAdminApp({
    credential: applicationDefault()
  });
}

const db = admin.firestore();

let Firebase;

if (!Firebase?.apps?.length) {
  Firebase = initializeApp(firebaseConfig);
}

export { db };
