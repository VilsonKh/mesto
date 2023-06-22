import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyAytpANIcQfAaB0UxbGZqo5BA_YPMiYggM",
	authDomain: "mesto-d3949.firebaseapp.com",
	projectId: "mesto-d3949",
	storageBucket: "mesto-d3949.appspot.com",
	messagingSenderId: "251950108656",
	appId: "1:251950108656:web:ce5f89dff9b08b607f1735",
};

// const firebaseConfig = {
// 	apiKey: "AIzaSyCz3C3miV8wlMZjjzum8eA6932b3aaq-98",
// 	authDomain: "mesto-45675.firebaseapp.com",
// 	projectId: "mesto-45675",
// 	storageBucket: "mesto-45675.appspot.com",
// 	messagingSenderId: "288337423402",
// 	appId: "1:288337423402:web:2680242d592e8b1f88a753",
// };

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
