import { clickBasketHandler } from "./utils/clickBasketHandler.js";
import { handleLikeButtonClick } from "./utils/clickLikeHandler.js";
import { openFullscreenImg } from "./openFullscreenImg.js";

// Добавляет карточки в список из массива объектов
export function createCards(places) {
	places.map((place) => {
		let galleryList = document.querySelector(".gallery__list");
		let cardTemplate = document.querySelector(".template__card").content;
		let card = cardTemplate.querySelector(".card");
		let newCard = card.cloneNode(true);
		let newImg = newCard.querySelector(".card__photo");

		// Тестируе изображение, если загрузилось, то подставляет значение, если нет, то подставляет изображение ошибки
		const testImg = new Image();
		testImg.src = place.img;
		testImg.addEventListener("load", () => {
			newImg.src = place.img;
			newImg.alt = place.title;
			const imgContainer = document.getElementById(place.id).querySelector("div");
			imgContainer.style.background = "lightgray";
		});
		testImg.addEventListener("error", () => (newImg.src = "img/imgError.webp"));

		const newTitle = newCard.querySelector(".card__title");
		newTitle.textContent = place.title;
		newCard.setAttribute("id", place.id);

		//Открывает фуллскрин изображение
		newImg.addEventListener("click", openFullscreenImg);
		// Добавляет интерактивный лайк
		const likeButton = newCard.querySelector(".card__btn-likes");
		place.isLiked ? likeButton.classList.add("checked") : null;
		likeButton.addEventListener("click", (evt) => handleLikeButtonClick(evt, place.isLiked));
		// Удаляет карточку по подтверждению
		let deleteBtn = newCard.querySelector(".card__btn-del");
		deleteBtn.addEventListener("click", clickBasketHandler);
		galleryList.prepend(newCard);
	});
}
