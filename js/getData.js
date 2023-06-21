import { db } from "../firebase/config.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { createCard, fillProfile } from "../main.js";

export async function getCards() {
	console.log("загружаю новые карточки");
	await onSnapshot(collection(db, "cards"), (snapshot) => {
		const cardsData = [];
		snapshot.docs.forEach((doc) => {
			cardsData.push({ ...doc.data(), id: doc.id });
		});
		cardsData.sort((a, b) => a.date - b.date);
		document.querySelectorAll(".card").forEach((item) => item.remove());
		createCard(cardsData);
	});
}

export async function getProfile() {
	console.log("загружаю профиль");
	await onSnapshot(collection(db, "profiles"), (snapshot) => {
		let profileData = {};
		profileData = { ...snapshot.docs[0].data(), id: snapshot.docs[0].id };
		console.log(profileData);
		fillProfile(profileData);
	});
}
getProfile();
