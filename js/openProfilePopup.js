import { addScrollHandler } from "./utils/addScrollHandler.js";
import { currentForm } from "./utils/currentForm.js";
import { showErrorMessages } from "./utils/showErrorMessages.js";

// Открывает попап редактирования профиля
export function openProfilePopup() {
	const profileWork = document.querySelector(".profile__work");
	const profileName = document.querySelector(".profile__name");
	const editBtn = document.querySelector(".profile__btn-edit");
	const inputName = document.querySelector(".popup__form__name");
	const inputWork = document.querySelector(".popup__form__work");
	const popupProfile = document.querySelector(".popup-profile");

	editBtn.addEventListener("click", () => {
		popupProfile.classList.add("active");
		showErrorMessages(currentForm(document.querySelector("[name='editProfileForm']")));
		inputName.value = profileName.innerHTML;
		inputWork.value = profileWork.innerHTML;
		addScrollHandler(popupProfile);
	});
}
