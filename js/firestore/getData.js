import { db } from "./config.js";
import { collection, onSnapshot, orderBy, query, limit, startAfter, startAt } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { createCards } from "../createCards.js";
import { fillProfile } from "../fillProfile.js";

let limitCard = 6;

export async function getCards() {
	const ref = query(collection(db, "cards"), orderBy("date", "desc"), limit(limitCard));
	const snapshotConst = (snapshot) => {
		const cardsData = [];
		snapshot.docs.forEach((doc) => {
			cardsData.push({ ...doc.data(), id: doc.id });
		});
		cardsData.sort((a, b) => a.date - b.date);
		document.querySelectorAll(".card").forEach((item) => item.remove());
		createCards(cardsData);
	};
	await onSnapshot(ref, snapshotConst);
}

(function limitIncrement() {
	const loadBtn = document.querySelector(".load__btn");
	loadBtn.addEventListener("click", () => {
		limitCard += 3;
		getCards();
	});
})();

export async function getProfile() {
	await onSnapshot(collection(db, "profiles"), (snapshot) => {
		let profileData = {};
		profileData = { ...snapshot.docs[0].data(), id: snapshot.docs[0].id };

		fillProfile(profileData);
	});
}
