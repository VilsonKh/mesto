import { updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db } from "./config.js";

export async function setTimeoutUpdateCard(cardId, value) {
	const ref = doc(db, "cards", cardId);
	const time = 1000;
	const setPromise = updateDoc(ref, { isLiked: value });

	return Promise.race([
		setPromise.then(() => ({ timeout: false })),
		new Promise((resolve, reject) => {
			setTimeout(resolve, time, { timeout: true, promise: setPromise });
		}),
	]);
}

export async function setTimeoutUpdateProfile(profileId, formData) {
	const ref = doc(db, "profiles", profileId);
	const time = 1000;
	const setPromise = updateDoc(ref, { ...formData });

	return Promise.race([
		setPromise.then(() => ({ timeout: false })),
		new Promise((resolve, reject) => {
			setTimeout(resolve, time, { timeout: true, promise: setPromise });
		}),
	]);
}
