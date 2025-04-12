import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyARuNNdkAdEtQy4vH7_NeHrVqnaHJ4gAJU",
  authDomain: "cis371-hw3-w25.firebaseapp.com",
  projectId: "cis371-hw3-w25",
  storageBucket: "cis371-hw3-w25.firebasestorage.app",
  messagingSenderId: "204469310178",
  appId: "1:204469310178:web:495df4d2cac16de4d4c4bb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
