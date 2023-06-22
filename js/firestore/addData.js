import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db } from "./config.js";

export function addCardData(formData) {
	addDoc(collection(db, "cards"), { ...formData, date: new Date().getTime(), isLiked: false });

	console.log("отправлены новые данные на сервер");
}
