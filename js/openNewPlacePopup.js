import { addScrollHandler } from "./utils/addScrollHandler.js";
import { showErrorMessages } from "./utils/showErrorMessages.js";

// Открывает попап нового места
export function openNewPlacePopupHandler() {
	const addPlaceBtn = document.querySelector(".profile__btn-add");
	const popupPlace = document.querySelector(".popup-place");

	addPlaceBtn.addEventListener("click", () => {
		popupPlace.classList.add("active");
		showErrorMessages(document.querySelector("[name='addPlaceForm']"));
		addScrollHandler(popupPlace);
	});
}
