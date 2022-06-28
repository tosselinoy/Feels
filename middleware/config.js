import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyC3HWlMIfQFG2ekTBYv2EuNOecApzd2qgU",
  authDomain: "telegram-bot-2-bacf6.firebaseapp.com",
  projectId: "telegram-bot-2-bacf6",
  storageBucket: "telegram-bot-2-bacf6.appspot.com",
  messagingSenderId: "691875645420",
  appId: "1:691875645420:web:537f177a6b91927b2ca2c9",
  databaseURL: "https://telegram-bot-2-bacf6-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export default {
  database
}