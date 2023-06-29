import { deleteData } from "./firestore/deleteData.js";
import { cardsQuantityDecrement, loadBtnToggler } from "./firestore/getData.js";
import { addScrollHandler } from "./utils/addScrollHandler.js";

const popupConfirmation = document.querySelector(".popup-delete_confirmation");
const popupProfile = document.querySelector(".popup-profile");

// Открывает попап подтверждения удаления
export function clickBasketHandler(evt) {
	popupConfirmation.classList.add("active");
	addScrollHandler(popupProfile);
	let deleteCardForm = document.querySelector(".delete-form");
	deleteCardForm.addEventListener("submit", (e) => deleteCard(e, evt));
}

async function deleteCard(e, evt) {
	e.preventDefault();
	await cardsQuantityDecrement();
	loadBtnToggler();
	let currentCardId = evt.target.closest(".card").id;
	deleteData(currentCardId);
	popupConfirmation.classList.remove("active");
}

