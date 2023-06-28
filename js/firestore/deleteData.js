import { deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db } from "./config.js";

export async function deleteData(cardId) {
	await deleteDoc(doc(db, `cards/${cardId}`));
}
