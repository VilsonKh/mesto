import { addScrollHandler } from "./utils/addScrollHandler.js";

const popupCard = document.querySelector(".popup-image");
const popupImg = popupCard.querySelector(".popup-image__img");
const popupImgCaption = popupCard.querySelector(".popup-image__caption");

// Открывает фуллскрин изображение
export function openFullscreenImgHandler(elem) {
	elem.addEventListener("click", openFullscreenImg);
}

function openFullscreenImg(evt) {
	popupImg.src = evt.target.src;
	popupImgCaption.textContent = evt.target.closest(".card").querySelector(".card__title").textContent;
	popupCard.classList.add("active");
	addScrollHandler(popupCard);
}
