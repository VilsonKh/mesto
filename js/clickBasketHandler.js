import { deleteData } from "./firestore/deleteData.js";
import { addScrollHandler } from "./utils/addScrollHandler.js";
// Открывает попап подтверждения удаления
export function clickBasketHandler(evt) {
	const popupConfirmation = document.querySelector(".popup-delete_confirmation");
	const popupProfile = document.querySelector(".popup-profile");
	popupConfirmation.classList.add("active");
	addScrollHandler(popupProfile);
	let deleteCardForm = document.querySelector(".delete-form");
	deleteCardForm.addEventListener("submit", (e) => {
		e.preventDefault();
		let currentCardId = evt.target.closest(".card").id;
		deleteData(currentCardId);
		popupConfirmation.classList.remove("active");
	});
}
