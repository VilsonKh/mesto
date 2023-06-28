import { addScrollHandler } from "./utils/addScrollHandler.js";

// Открывает фуллскрин изображение
export function openFullscreenImgHandler(elem) {
	const popupCard = document.querySelector(".popup-image");
	const popupImg = popupCard.querySelector(".popup-image__img");
	const popupImgCaption = popupCard.querySelector(".popup-image__caption");
	elem.addEventListener("click", (evt) => {
		popupImg.src = evt.target.src;
		popupImgCaption.textContent = evt.target.closest(".card").querySelector(".card__title").textContent;

		popupCard.classList.add("active");
		addScrollHandler(popupCard);
	});
}
