import { addScrollHandler } from "./utils/addScrollHandler.js";

const avatar = document.querySelector(".profile__avatar");
const popupAvatarChange = document.querySelector(".popup__change-avatar");

// Открывает попап редактирования аватарки
export function openAvatarPopupHandler() {
	avatar.addEventListener("click", openAvatarPopup);
}

function openAvatarPopup() {
	popupAvatarChange.classList.add("active");
	addScrollHandler(popupAvatarChange);
}
