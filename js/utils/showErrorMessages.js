import { cleanErrorMessages } from "./cleanErrorMessages.js";
import { submitButtonToggler } from "./sumbitButtonToggler.js";

// Выводит сообщения об ошибке в поле ввода
export function showErrorMessages(form) {
	let inputs = form.querySelectorAll("input");
	cleanErrorMessages(form);
	inputs.forEach((input) => {
		input.addEventListener("input", () => {
			// if (input.type === "url") {
			// 	const testImg = new Image();
			// 	testImg.src = input.value;
			// 	testImg.addEventListener("load", () => {
			// 		return;
			// 	});
			// 	testImg.addEventListener("error", () => {
			// 		alert("Это не картинка");
			// 	});
			// }

			submitButtonToggler(form);
			const validity = input.validity;
			if (!input.checkValidity()) {
				input.style.borderBottom = "1px solid red";
				if (validity.valueMissing) {
					input.nextElementSibling.textContent = "Вы пропустили это поле.";
				} else if (validity.tooShort) {
					input.nextElementSibling.textContent = "Минимальная количество символов - 2";
				} else if (validity.typeMismatch) {
					input.nextElementSibling.textContent = "Введите корректный адрес ссылки.";
				}
			} else {
				input.nextElementSibling.textContent = "";
				input.style.borderBottom = "";
			}
		});
	});
}
