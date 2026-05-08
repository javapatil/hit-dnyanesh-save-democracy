import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  runTransaction
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA6nN1ViHSUWeCBp2WYLKcs_HucABa2blI",
  authDomain: "hit-dnyanesh-save-democracy.firebaseapp.com",
  databaseURL: "https://hit-dnyanesh-save-democracy-default-rtdb.firebaseio.com",
  projectId: "hit-dnyanesh-save-democracy",
  storageBucket: "hit-dnyanesh-save-democracy.firebasestorage.app",
  messagingSenderId: "83763122272",
  appId: "1:83763122272:web:b26cba03a5eaf239b0f305"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const totalRef = ref(db, "totalPunches");

// Elements
const punchBtn = document.getElementById("punchBtn");
const totalDisplay = document.getElementById("totalPunches");
const personImage = document.getElementById("personImage");
const punchEmoji = document.getElementById("punchEmoji");
const skinHit = document.getElementById("skinHit");
const punchSound = document.getElementById("punchSound");

// LIVE UPDATE
onValue(totalRef, (snapshot) => {
  const total = snapshot.val() || 0;
  totalDisplay.innerText = total;
});

// BUTTON CLICK
punchBtn.addEventListener("click", () => {
  // 1. Firebase Transaction
  runTransaction(totalRef, (current) => {
    return (current || 0) + 1;
  });

  // 2. Play Sound
  punchSound.currentTime = 0; // Reset sound to start if clicked rapidly
  punchSound.play().catch(e => console.log("Audio play failed:", e));

  // 3. Trigger Animations
  // Reset animations by removing and re-adding classes
  personImage.classList.remove("shake");
  punchEmoji.classList.remove("animate-punch");
  skinHit.classList.remove("skin-red");

  // Trigger reflow to restart animation
  void personImage.offsetWidth; 

  personImage.classList.add("shake");
  punchEmoji.classList.add("animate-punch");
  skinHit.classList.add("skin-red");
});