// Закрывает попапа по крестику
(function closePopupHandler() {
	const closeButtons = document.querySelectorAll(".popup__btn-close");
	closeButtons.forEach((btn) => {
		btn.addEventListener("click", function (evt) {
			const popup = evt.target.closest(".popup");
			popup.classList.remove("active");
			const form = popup.querySelector("form");
			form.reset();
			const saveBtns = document.querySelectorAll(".popup__btn-save");
			saveBtns.forEach((btn) => btn.setAttribute("disabled", "true"));
		});
	});
})();
