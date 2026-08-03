import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyCkP7WI3KcSdOTbIIe0z7L70CqWoXUhC6Y",
  authDomain: "civichorizonindex.firebaseapp.com",
  databaseURL: "https://civichorizonindex-default-rtdb.firebaseio.com/",
  projectId: "civichorizonindex",
  storageBucket: "civichorizonindex.firebasestorage.app",
  messagingSenderId: "806593810616",
  appId: "1:806593810616:web:7dae33c6ee7db46b55644d"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const auth = getAuth(app);

export { database, auth };