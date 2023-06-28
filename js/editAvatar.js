import { setTimeoutUpdateProfile } from "./firestore/updateDocField.js";
import { createFormData } from "./utils/createFormData.js";
import { removeScrollHandler } from "./utils/removeScrollHandler.js";

// Изменяет аватарку
export function editAvatar() {
	const avatarUploadForm = document.querySelector(".avatar__upload");
	const popupAvatarChange = document.querySelector(".popup__change-avatar");
	avatarUploadForm.addEventListener("submit", async function (evt) {
		evt.preventDefault();
		const currentProfileId = document.querySelector(".profile").getAttribute("id");

		const srcField = avatarUploadForm.querySelector("input[type='url']");

		const testImg = new Image();
		testImg.src = srcField.value;

		testImg.addEventListener("load", async () => {
			const testServ = await setTimeoutUpdateProfile(currentProfileId, createFormData(evt));
			if (testServ.timeout) {
				await testServ.promise;
			}
			popupAvatarChange.classList.remove("active");
			avatarUploadForm.reset();
			removeScrollHandler(popupAvatarChange);
		});

		testImg.addEventListener("error", () => {
			srcField.nextElementSibling.textContent = "По этому адресу нет изображения.";
		});
	});
}
