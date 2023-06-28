import { deleteData } from "./firestore/deleteData.js";
import { cardsQuantityDecrement, loadBtnToggler } from "./firestore/getData.js";
import { addScrollHandler } from "./utils/addScrollHandler.js";
import { collection, onSnapshot, orderBy, query, limit, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
// Открывает попап подтверждения удаления
export function clickBasketHandler(evt) {
	const popupConfirmation = document.querySelector(".popup-delete_confirmation");
	const popupProfile = document.querySelector(".popup-profile");
	popupConfirmation.classList.add("active");
	addScrollHandler(popupProfile);
	let deleteCardForm = document.querySelector(".delete-form");
	deleteCardForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		await cardsQuantityDecrement();
		loadBtnToggler();
		let currentCardId = evt.target.closest(".card").id;
		deleteData(currentCardId);
		popupConfirmation.classList.remove("active");
	});
}
