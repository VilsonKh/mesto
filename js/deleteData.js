import { deleteDoc, doc, collection } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db } from "../firebase/config.js";

export async function deleteData(cardId) {
	await deleteDoc(doc(db, `cards/${cardId}`));
}