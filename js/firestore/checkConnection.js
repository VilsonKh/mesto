import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db } from "./config.js";

export let checkConnectionState = false;

export async function checkConnection() {
	await onSnapshot(doc(db, "checkConnection/MdXxpejanBNO3459t8U4"), (snapshot) => {
		if (snapshot.data().isConnected) {
			checkConnectionState = true;
		}
	});
}
