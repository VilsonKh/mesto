import { createFormData } from "./utils/createFormData.js";
import { addCardData } from "./firestore/addData.js";

// Отправляет в базу новое место, введенное пользователем
export function addPlace() {
	let popupPlace = document.querySelector(".popup-place");
	const newPlaceForm = document.querySelector("[name=addPlaceForm]");
	newPlaceForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const srcField = newPlaceForm.querySelector("input[type='url']");
		const testImg = new Image();
		testImg.src = srcField.value;
		testImg.addEventListener("load", () => {
			popupPlace.classList.remove("active");
			addCardData(createFormData(e));
		});
		testImg.addEventListener("error", () => {
			srcField.nextElementSibling.textContent = "По этому адресу нет изображения.";
		});
	});
}
