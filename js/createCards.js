import { clickBasketHandler } from "./clickBasketHandler.js";
import { handleLikeButtonClick } from "./clickLikeHandler.js";
import { openFullscreenImgHandler } from "./openFullscreenImg.js";
import { testImg } from "./utils/imageTest.js";

const galleryList = document.querySelector(".gallery__list");
const cardTemplate = document.querySelector(".template__card").content;
const card = cardTemplate.querySelector(".card");

// Добавляет карточки в список из массива объектов
export function createCards(places) {
	places.map((place) => {
		const newCard = card.cloneNode(true);
		const newImg = newCard.querySelector(".card__photo");
		const newTitle = newCard.querySelector(".card__title");

		newTitle.textContent = place.title;
		newCard.setAttribute("id", place.id);

		if (newCard.getAttribute("id") === undefined) {
			throw new Error("undefined attribute");
		}

		// Тестируе изображение, если загрузилось, то подставляет значение, если нет, то подставляет изображение ошибки
		testImg(newImg, place.img, place.title, place.id);
		//Открывает фуллскрин изображение
		openFullscreenImgHandler(newImg);
		// Добавляет интерактивный лайк
		const likeButton = newCard.querySelector(".card__btn-likes");
		place.isLiked ? likeButton.classList.add("checked") : null;
		likeButton.addEventListener("click", (evt) => handleLikeButtonClick(evt, place.isLiked));
		// Удаляет карточку по подтверждению
		const deleteBtn = newCard.querySelector(".card__btn-del");
		deleteBtn.addEventListener("click", clickBasketHandler);

		galleryList.prepend(newCard);
	});
}
