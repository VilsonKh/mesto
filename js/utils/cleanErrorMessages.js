// Очищает поле ошибки ввода
export function cleanErrorMessages(form) {
	const errorMessages = form.querySelectorAll(".popup__error");
	errorMessages.forEach((message) => {
		message.textContent = "";
	});
	const inputs = form.querySelectorAll("input");
	inputs.forEach((input) => {
		input.style.borderBottom = "1px solid rgba(0, 0, 0, 0.2)";
	});
}
