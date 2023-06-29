import { addScrollHandler } from "./utils/addScrollHandler.js";
import { cleanErrorMessages } from "./utils/cleanErrorMessages.js";

const addPlaceBtn = document.querySelector(".profile__btn-add");
const popupPlace = document.querySelector(".popup-place");

// Открывает попап нового места
export function openNewPlacePopupHandler() {
	addPlaceBtn.addEventListener("click", openNewPlacePopup);
}

function openNewPlacePopup() {
	popupPlace.classList.add("active");
	cleanErrorMessages(document.querySelector("[name='addPlaceForm']"));
	addScrollHandler(popupPlace);
}
