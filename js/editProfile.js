import { createFormData } from "./utils/createFormData.js";
import { updateProfileField } from "./firestore/updateDocField.js";
import { removeScrollHandler } from "./utils/removeScrollHandler.js";

// Изменяет данные в профиле и закрывает попап
export function editProfileHandler() {
	const formProfile = document.querySelector(".popup__form-profile");
	const popupProfile = document.querySelector(".popup-profile");
	const profileBtnSave = document.querySelector("#avatarSaveBtn");

	formProfile.addEventListener("submit", function (evt) {
		evt.preventDefault();
		const currentProfileId = document.querySelector(".profile").getAttribute("id");
		updateProfileField(currentProfileId, createFormData(evt));
		popupProfile.classList.remove("active");
		profileBtnSave.setAttribute("disabled", true);
		formProfile.reset();
		removeScrollHandler(popupProfile);
	});
}
