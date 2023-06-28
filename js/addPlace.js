import { createFormData } from "./utils/createFormData.js";
import { setTimeoutAddDoc } from "./firestore/addData.js";

// Отправляет в базу новое место, введенное пользователем
export function addPlace() {
	let popupPlace = document.querySelector(".popup-place");
	const newPlaceForm = document.querySelector("[name=addPlaceForm]");
	newPlaceForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const srcField = newPlaceForm.querySelector("input[type='url']");
		const testImg = new Image();
		testImg.src = srcField.value;

		testImg.addEventListener("load", async () => {
			popupPlace.classList.remove("active");
			const testServ = await setTimeoutAddDoc(createFormData(e));
			if (testServ.timeout) {
				await testServ.promise;
			}
		});
		testImg.addEventListener("error", () => {
			srcField.nextElementSibling.textContent = "По этому адресу нет изображения.";
		});
	});
}
