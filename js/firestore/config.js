import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyDDBt4i6-ETU2Shu6XNhCkvimsRHfdGe1A",
	authDomain: "mesto-project-cae47.firebaseapp.com",
	projectId: "mesto-project-cae47",
	storageBucket: "mesto-project-cae47.appspot.com",
	messagingSenderId: "1020488787603",
	appId: "1:1020488787603:web:49ea097949b415c1aa4f66",
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
