import { addPlace } from "./addPlace.js";
import { addScrollHandler } from "./utils/addScrollHandler.js";
import { currentForm } from "./utils/currentForm.js";
import { showErrorMessages } from "./utils/showErrorMessages.js";

// Открывает попап нового места
(function openNewPlacePopup() {
	const addPlaceBtn = document.querySelector(".profile__btn-add");
	const popupPlace = document.querySelector(".popup-place");

	addPlaceBtn.addEventListener("click", () => {
		popupPlace.classList.add("active");
		showErrorMessages(currentForm(document.querySelector("[name='addPlaceForm']")));
		addScrollHandler(popupPlace);
	});
})();
