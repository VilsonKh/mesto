import { cleanErrorMessages } from "./cleanErrorMessages.js";

// Закрытие по области вокруг попапа
export function overlayClickHandler() {
	window.addEventListener("click", overlayClick);
}

const forms = document.querySelectorAll("form");
const saveBtns = document.querySelectorAll(".popup__btn-save");

function overlayClick(evt) {
	const target = evt.target;
	if (evt.target.classList.contains("popup")) {
		target.classList.remove("active");
		if (target.querySelector("form")) {
			setTimeout(() => target.querySelector("form").reset(), 200);
			if (target.querySelector(".popup__btn-save")) {
				target.querySelector(".popup__btn-save").disabled = true;
			}
		}
	}
}
