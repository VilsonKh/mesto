import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db } from "./config.js";

const ref = collection(db, "cards");

export async function setTimeoutAddDoc(formData) {
	const time = 1000;
	const setPromise = addDoc(ref, { ...formData, date: new Date().getTime(), isLiked: false });

	return Promise.race([
		setPromise.then(() => ({ timeout: false })),
		new Promise((resolve, reject) => {
			setTimeout(resolve, time, { timeout: true, promise: setPromise });
		}),
	]);
}
