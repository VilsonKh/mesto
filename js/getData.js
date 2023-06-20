import { db } from "../firebase/config.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

let cardsData = [];
export async function getCards() {
	await onSnapshot(collection(db, "cards"), (snapshot) => {
		snapshot.docs.forEach((doc) => {
			cardsData.push(doc.data());
		});
	});
	console.log(cardsData);
}

getCards();
// async function getCards() {
// 	await getDocs(collection(db, "cards")).then((col) => {
// 		console.log(col);
// 	});
// }
