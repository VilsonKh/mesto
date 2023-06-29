import { db } from "./config.js";
import { collection, onSnapshot, orderBy, query, limit, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
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

(function limitIncrementHandler() {
	const loadBtn = document.querySelector(".load__btn");
	loadBtn.addEventListener("click", limitIncrement);
})();

async function limitIncrement() {
	limitCard += 3;
	loadBtnToggler();
	getCards();
}

export async function loadBtnToggler() {
	if (cardsAvailable <= limitCard) {
		document.querySelector(".load__btn").setAttribute("disabled", true);
	} else if (cardsAvailable > limitCard) {
		document.querySelector(".load__btn").removeAttribute("disabled");
	}
}

let cardsAvailable = 0;

(async function checkQuantity() {
	const ref = doc(db, "checkQuantity/VjLm1zqlZK1dkkTAuI7G");
	const docRef = (snapshot) => {
		if (snapshot.data().quantityNumb) {
			cardsAvailable = snapshot.data().quantityNumb;
		}
	};
	onSnapshot(ref, docRef);
})();

export async function cardsQuantityDecrement() {
	const data = { quantityNumb: `${cardsAvailable - 1}` };
	const docRef = doc(db, "checkQuantity", "VjLm1zqlZK1dkkTAuI7G");
	updateDoc(docRef, data);

	limitCard -= 1;
}

export async function cardsQuantityIncrement() {
	const data = { quantityNumb: `${cardsAvailable + 1}` };
	const docRef = doc(db, "checkQuantity", "VjLm1zqlZK1dkkTAuI7G");
	updateDoc(docRef, data);

	limitCard += 1;
}

export async function getProfile() {
	await onSnapshot(collection(db, "profiles"), (snapshot) => {
		let profileData = {};
		profileData = { ...snapshot.docs[0].data(), id: snapshot.docs[0].id };

		fillProfile(profileData);
	});
}
