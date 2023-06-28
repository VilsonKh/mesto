// Управляет аттрибутом disabled для кнопки submit
export function submitButtonToggler(form) {
	if (form.checkValidity()) {
		form.querySelector(".popup__btn-save").removeAttribute("disabled");
	} else {
		form.querySelector(".popup__btn-save").setAttribute("disabled", true);
	}
}
