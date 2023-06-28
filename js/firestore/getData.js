import { db } from "./config.js";
import { collection, onSnapshot, orderBy, query, limit, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { createCards } from "../createCards.js";
import { fillProfile } from "../fillProfile.js";

let limitCard = 6;
// let visibleCardsCount = 0;

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
	console.log(await checkQuantity());
	limitCard += 3;
	loadBtnToggler();
	getCards();
}

export async function loadBtnToggler() {
	console.log(limitCard);
	if ((await checkQuantity()) <= limitCard) {
		document.querySelector(".load__btn").setAttribute("disabled", true);
	} else if ((await checkQuantity()) > limitCard) {
		document.querySelector(".load__btn").removeAttribute("disabled");
	}
}

async function checkQuantity() {
	const docRef = doc(db, "checkQuantity/VjLm1zqlZK1dkkTAuI7G");
	const docSnap = await getDoc(docRef);
	console.log(docSnap.data().quantityNumb + " " + "общее число карточек");
	return docSnap.data().quantityNumb;
}

export async function cardsQuantityDecrement() {
	const currentNumb = +(await checkQuantity());
	const data = { quantityNumb: `${currentNumb - 1}` };
	const docRef = doc(db, "checkQuantity", "VjLm1zqlZK1dkkTAuI7G");
	updateDoc(docRef, data);

	limitCard -= 1;
}

export async function cardsQuantityIncrement() {
	const currentNumb = +(await checkQuantity());
	const data = { quantityNumb: `${currentNumb + 1}` };
	const docRef = doc(db, "checkQuantity", "VjLm1zqlZK1dkkTAuI7G");
	updateDoc(docRef, data);
}

export async function getProfile() {
	await onSnapshot(collection(db, "profiles"), (snapshot) => {
		let profileData = {};
		profileData = { ...snapshot.docs[0].data(), id: snapshot.docs[0].id };

		fillProfile(profileData);
	});
}
