// Очищает поле ошибки ввода
export function cleanErrorMessages() {
	const errorMessages = document.querySelectorAll(".popup__error");
	errorMessages.forEach((message) => {
		message.textContent = "";
	});
	const inputs = document.querySelectorAll("input");
	inputs.forEach((input) => {
		input.style.borderBottom = "1px solid rgba(0, 0, 0, 0.2)";
	});
}
