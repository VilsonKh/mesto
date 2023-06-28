import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { API_KEY, APP_ID, AUTH_DOMAIN, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUSKET } from "./const.js";

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUSKET,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
