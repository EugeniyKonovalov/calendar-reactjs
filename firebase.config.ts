import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCT3fbb6vh9DM6juyU4SINWXOIowL5sHMc",
  authDomain: "calendar-42d5c.firebaseapp.com",
  databaseURL: "https://calendar-42d5c-default-rtdb.firebaseio.com",
  projectId: "calendar-42d5c",
  storageBucket: "calendar-42d5c.appspot.com",
  messagingSenderId: "956721276770",
  appId: "1:956721276770:web:1bdaa79641e5f191686e3b",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
