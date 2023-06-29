import { cleanErrorMessages } from "./cleanErrorMessages.js";
import { submitButtonToggler } from "../sumbitButtonToggler.js";

// Выводит сообщения об ошибке в поле ввода
export function showErrorMessages() {
	const inputs = document.querySelectorAll("input");

	inputs.forEach((input) => {
		input.addEventListener("input", () => {
			submitButtonToggler();
			const validity = input.validity;
			if (!input.checkValidity()) {
				console.log("check validity");
				input.style.borderBottom = "1px solid red";
				if (validity.valueMissing) {
					input.nextElementSibling.textContent = "Вы пропустили это поле.";
				} else if (validity.tooShort) {
					input.nextElementSibling.textContent = `Минимальная количество символов - ${input.getAttribute("minlenght")} символов`;
				} else if (validity.tooLong) {
					input.nextElementSibling.textContent = `Максимальная длина символов - ${input.getAttribute("maxlength")} символов`;
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
