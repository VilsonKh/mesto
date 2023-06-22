import { createFormData } from "./utils/createFormData.js";
import { updateProfileField } from "./firestore/updateDocField.js";
import { removeScrollHandler } from "./utils/removeScrollHandler.js";
import { byteConverter } from "./utils/byteConverter.js";

// Изменяет аватарку
(function editAvatar() {
	const avatarUploadForm = document.querySelector(".avatar__upload");
	const popupAvatarChange = document.querySelector(".popup__change-avatar");
	avatarUploadForm.addEventListener("submit", function (evt) {
		console.log("обновляю профиль");
		evt.preventDefault();
		const currentProfileId = document.querySelector(".profile").getAttribute("id");

		const srcField = avatarUploadForm.querySelector("input[type='url']");

		const testImg = new Image();
		testImg.src = srcField.value;
		testImg.addEventListener("load", () => {
			//проверка изображения

			// const req = new XMLHttpRequest();
			// req.open("GET", srcField.value, false);
			// req.send();
			// const size = byteConverter(req.getResponseHeader("content-length"));
			testImg.width > 0 && testImg.height > 0 ? updateProfileField(currentProfileId, createFormData(evt)) : "";
			popupAvatarChange.classList.remove("active");
			avatarUploadForm.reset();
			removeScrollHandler(popupAvatarChange);
		});

		testImg.addEventListener("error", () => {
			srcField.nextElementSibling.textContent = "По этому адресу нет изображения.";
		});

		setTimeout(() => {
			srcField.nextElementSibling.textContent = "Ошибка загрузки изображения. Попробуйте снова.";
			const btnSave = avatarUploadForm.querySelector(".popup__btn-save");
			btnSave.setAttribute("disabled", true);
		}, 10000);
	});
})();
