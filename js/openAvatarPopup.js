import { addScrollHandler } from "./utils/addScrollHandler.js";
import { showErrorMessages } from "./utils/showErrorMessages.js";

// Открывает попап редактирования аватарки
export function openAvatarPopupHandler() {
	const avatar = document.querySelector(".profile__avatar");
	const popupAvatarChange = document.querySelector(".popup__change-avatar");
	avatar.addEventListener("click", function () {
		popupAvatarChange.classList.add("active");
		showErrorMessages(document.querySelector("[name='changeAvatarForm']"));
		addScrollHandler(popupAvatarChange);
	});
}
