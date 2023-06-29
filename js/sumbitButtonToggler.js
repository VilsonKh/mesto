// Управляет аттрибутом disabled для кнопки submit
export function submitButtonToggler() {
	const forms = document.querySelectorAll("form");
	forms.forEach((form) => {
		form.addEventListener("input", () => {
			if (form.checkValidity()) {
				form.querySelector(".popup__btn-save").removeAttribute("disabled");
			} else {
				form.querySelector(".popup__btn-save").setAttribute("disabled", true);
			}
		});
	});
}
