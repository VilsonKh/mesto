// Закрытие по области вокруг попапа
(function overlayClickHandler() {
	window.addEventListener("click", function (evt) {
		let target = evt.target;
		if (evt.target.classList.contains("popup")) {
			const popup = target.closest(".popup");
			popup.classList.remove("active");
			const forms = document.querySelectorAll("form");
			forms.forEach((form) => {
				form.reset();
			});
			const saveBtns = document.querySelectorAll(".popup__btn-save");
			saveBtns.forEach((btn) => btn.setAttribute("disabled", "true"));
		}
	});
})();
