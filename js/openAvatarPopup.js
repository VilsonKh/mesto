import { addScrollHandler } from "./utils/addScrollHandler.js";
import { currentForm } from "./utils/currentForm.js";
import { showErrorMessages } from "./utils/showErrorMessages.js";

// Открывает попап редактирования аватарки
(function openAvatarPopup() {
	const avatar = document.querySelector(".profile__avatar");
	const popupAvatarChange = document.querySelector(".popup__change-avatar");
	avatar.addEventListener("click", function () {
		popupAvatarChange.classList.add("active");
		showErrorMessages(currentForm(document.querySelector("[name='changeAvatarForm']")));
		addScrollHandler(popupAvatarChange);
	});
})();
