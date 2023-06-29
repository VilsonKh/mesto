import { createFormData } from "./utils/createFormData.js";
import { setTimeoutUpdateProfile } from "./firestore/updateDocField.js";
import { removeScrollHandler } from "./utils/removeScrollHandler.js";

const formProfile = document.querySelector(".popup__form-profile");
const popupProfile = document.querySelector(".popup-profile");
const profileBtnSave = document.querySelector("#avatarSaveBtn");

// Изменяет данные в профиле и закрывает попап
export function editProfileHandler() {
	formProfile.addEventListener("submit", editProfile);
}

async function editProfile(evt) {
	evt.preventDefault();
	const currentProfileId = document.querySelector(".profile").getAttribute("id");

	const testServ = await setTimeoutUpdateProfile(currentProfileId, createFormData(evt));
	if (testServ.timeout) {
		await testServ.promise;
	}

	popupProfile.classList.remove("active");
	profileBtnSave.setAttribute("disabled", true);
	setTimeout(() => formProfile.reset(), 200);
	formProfile.querySelector(".popup__save-btn").setAttribute("disbled", true);
	removeScrollHandler(popupProfile);
}
