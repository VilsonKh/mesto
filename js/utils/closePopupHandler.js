// Закрывает попапа по крестику
export function closePopupHandler() {
	const closeButtons = document.querySelectorAll(".popup__btn-close");
	closeButtons.forEach((btn) => {
		btn.addEventListener("click", function (evt) {
			evt.preventDefault();
			const popup = evt.target.closest(".popup");
			popup.classList.remove("active");
			const form = popup.querySelector("form");
			setTimeout(() => form.reset(), 200);

			const saveBtns = document.querySelectorAll(".popup__btn-save");
			saveBtns.forEach((btn) => btn.setAttribute("disabled", "true"));
		});
	});
}
