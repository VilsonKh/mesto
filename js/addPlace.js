import { createFormData } from "./utils/createFormData.js";
import { setTimeoutAddDoc } from "./firestore/addData.js";
import { cardsQuantityIncrement, loadBtnToggler } from "./firestore/getData.js";

const popupPlace = document.querySelector(".popup-place");
const newPlaceForm = document.querySelector("[name=addPlaceForm]");

// Отправляет в базу новое место, введенное пользователем
export function addPlace() {
	newPlaceForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const srcField = newPlaceForm.querySelector("input[type='url']");
		const testImg = new Image();
		testImg.src = srcField.value;

		testImg.addEventListener("load", async () => {
			popupPlace.classList.remove("active");
			await cardsQuantityIncrement();
			loadBtnToggler();
			const testServ = await setTimeoutAddDoc(createFormData(e));
			if (testServ.timeout) {
				await testServ.promise;
			}
			setTimeout(() => newPlaceForm.reset(), 200);
			newPlaceForm.querySelector(".popup__btn-save").setAttribute("disabled", true);
		});
		testImg.addEventListener("error", () => {
			srcField.nextElementSibling.textContent = "По этому адресу нет изображения.";
		});
	});
}
