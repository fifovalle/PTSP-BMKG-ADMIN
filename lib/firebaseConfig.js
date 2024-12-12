import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzNKTdbl05zREzZ3TxHEH4_NwPn1ELPvg",
  authDomain: "ptsp-bmkg-4eee9.firebaseapp.com",
  projectId: "ptsp-bmkg-4eee9",
  storageBucket: "ptsp-bmkg-4eee9.appspot.com",
  messagingSenderId: "829294397794",
  appId: "1:829294397794:web:f3593f85e5a6a863c6043b",
  measurementId: "G-MJTFSY82TY",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { database, auth, storage, analytics };
