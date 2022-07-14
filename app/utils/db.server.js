// Import the functions you need from the SDKs you need
import admin from "firebase-admin";
import { initializeApp as initializeAdminApp } from "firebase-admin/app";
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
    credential: admin.credential.cert({
      type: process.env.TYPE,
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      // private_key: process.env.PRIVATE_KEY,
      ...JSON.parse(process.env.PRIVATE_KEY),
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      auth_uri: process.env.AUTH_URI,
      token_uri: process.env.TOKEN_URI,
      auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
    })
  });
}

const db = admin.firestore();

let Firebase;

if (!Firebase?.apps?.length) {
  Firebase = initializeApp(firebaseConfig);
}

export { db };
