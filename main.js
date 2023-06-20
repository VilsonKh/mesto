import { cardsData } from "./js/getData";

let currentForm = "";

// Блокирует скролл при открытом попапе
function blockScroll(evt) {
	evt.preventDefault();
	evt.stopPropagation();
}

// Удаляет обработчик события скролла
function removeScrollHandler(popup) {
	popup.removeEventListener("wheel", (evt) => blockScroll(evt));
}

// Добавляет обработчик события скролла
function addScrollHandler(popup) {
	popup.addEventListener("wheel", (evt) => blockScroll(evt));
}

// Открывает попап редактирования профиля
const editBtn = document.querySelector(".profile__btn-edit");
const inputName = document.querySelector(".popup__form__name");
const inputWork = document.querySelector(".popup__form__work");
const popupProfile = document.querySelector(".popup-profile");

editBtn.addEventListener("click", () => {
	popupProfile.classList.add("active");
	currentForm = document.querySelector("[name='editProfileForm']");
	showErrorMessage(currentForm);
	inputName.value = profileName.innerHTML;
	inputWork.value = profileWork.innerHTML;
	addScrollHandler(popupProfile);
});

// Изменяет данные в профиле и закрывает попап
const profileBtnSave = document.querySelector("#profileSaveBtn");
const formProfile = document.querySelector(".popup__form-profile");
const profileName = document.querySelector(".profile__name");
const profileWork = document.querySelector(".profile__work");

formProfile.addEventListener("submit", function () {
	profileName.innerHTML = inputName.value;
	profileWork.innerHTML = inputWork.value;
	popupProfile.classList.remove("active");
	profileBtnSave.setAttribute("disabled", true);
	removeScrollHandler(popupProfile);
});

// Открывает попап редактирования аватарки
const avatar = document.querySelector(".profile__avatar");
const popupAvatarChange = document.querySelector(".popup__change-avatar");
avatar.addEventListener("click", function () {
	popupAvatarChange.classList.add("active");
	currentForm = document.querySelector("[name='changeAvatarForm']");
	showErrorMessage(currentForm);
	addScrollHandler(popupAvatarChange);
});

// Изменяет аватарку

let avatarUploadForm = document.querySelector(".avatar__upload");
let profileAvatar = document.querySelector(".profile__avatar-img");
let inputAvatarSource = document.querySelector(".popup__form__avatar");

avatarUploadForm.addEventListener("submit", function () {
	profileAvatar.src = inputAvatarSource.value;
	popupAvatarChange.classList.remove("active");
	avatarUploadForm.reset();
	removeScrollHandler(popupAvatarChange);
});

// Открывает попап нового места
let addPlaceBtn = document.querySelector(".profile__btn-add");
let popupPlace = document.querySelector(".popup-place");

addPlaceBtn.addEventListener("click", () => {
	popupPlace.classList.add("active");
	currentForm = document.querySelector("[name='addPlaceForm']");
	showErrorMessage(currentForm);
	addScrollHandler(popupPlace);
});

// Добавляет карточки в список из массива объектов
let galleryList = document.querySelector(".gallery__list");
let listTemplate = document.querySelector(".template__card").content;
let card = listTemplate.querySelector(".card");

function createCard(place) {
	let newCard = card.cloneNode(true);
	let newImg = newCard.querySelector(".card__photo");
	newImg.src = place.imgUrl;
	newImg.alt = place.name;
	let newTitle = newCard.querySelector(".card__title");
	newTitle.textContent = place.name;
	//Открывает фуллскрин изображение
	newImg.addEventListener("click", openPopupImg);
	// Добавляет интерактивный лайк
	let likeBtn = newCard.querySelector(".card__btn-likes");
	likeBtn.addEventListener("click", handleLikeButtonClick);
	// Открывает попап подтверждения удаления карточки
	let deleteBtn = newCard.querySelector(".card__btn-del");
	// Удалять карточку по подтверждению
	deleteBtn.addEventListener("click", handleBusketButtonClick);

	return newCard;
}

// Открывает попап подтверждения удаления
function handleBusketButtonClick(evt) {
	let popupConfirmation = document.querySelector(".popup-delete_confirmation");
	let currentCard = evt.target.closest(".card");

	popupConfirmation.classList.add("active");
	popupProfile.addEventListener("wheel", (evt) => blockScroll(evt));
	let deleteCardForm = document.querySelector(".delete-form");
	deleteCardForm.addEventListener("submit", () => {
		currentCard.remove();
		popupConfirmation.classList.remove("active");
	});
}

// Открывает фуллскрин изображение
let popupCard = document.querySelector(".popup-image");
let popupImg = popupCard.querySelector(".popup-image__img");
let popupImgCaption = popupCard.querySelector(".popup-image__caption");

function openPopupImg(evt) {
	popupImg.src = evt.target.src;
	popupImgCaption.textContent = evt.target.closest(".card").querySelector(".card__title").textContent;

	popupCard.classList.add("active");
	addScrollHandler(popupCard);
}

createInitialCards(cardsData);

// Добавляет интерактивный лайк
function handleLikeButtonClick(evt) {
	evt.target.classList.toggle("checked");
}

// Добавляет новые карточки по заполнению формы
let createForm = document.querySelector("[name='addPlaceForm']");
const inputPlaceName = document.getElementById("place");
const inputPlaceSource = document.getElementById("source");

function addCardHandler(evt) {
	evt.preventDefault();
	let newCard = createCard({
		name: inputPlaceName.value,
		imgUrl: inputPlaceSource.value,
	});
	popupImgCaption.textContent = newCard.name;
	createForm.reset();
	galleryList.prepend(newCard);
	popupPlace.classList.remove("active");
}

createForm.addEventListener("submit", addCardHandler);

function createInitialCards(initialCards) {
	initialCards.forEach((place) => {
		galleryList.append(createCard(place));
	});
}

// Закрытие по области вокруг попапа

const allForms = document.querySelectorAll("form");

window.addEventListener("click", function (evt) {
	let target = evt.target;
	if (evt.target.classList.contains("popup")) {
		target.closest(".popup").classList.remove("active");
		profileBtnSave.setAttribute("disabled", true);
		allForms.forEach((form) => {
			form.reset();
		});
	}
});

// Закрытие попапа по крестику

let closeButtons = document.querySelectorAll(".popup__btn-close");
closeButtons.forEach((btn) => {
	btn.addEventListener("click", function (evt) {
		const popup = evt.target.closest(".popup");
		popup.classList.remove("active");
		const form = popup.querySelector("form");
		form.reset();
	});
});

// Выводит сообщения об ошибке в поле ввода
function showErrorMessage(form) {
	let inputs = form.querySelectorAll("input");
	cleanErrorMessages(form);
	inputs.forEach((input) => {
		input.addEventListener("input", () => {
			buttonDisabler(form);
			const validity = input.validity;
			if (validity.valueMissing) {
				validity.valueMissing;
				input.nextElementSibling.textContent = "Вы пропустили это поле.";
			} else if (validity.tooShort) {
				input.nextElementSibling.textContent = "Минимальная количество символов - 2";
			} else if (validity.typeMismatch) {
				input.nextElementSibling.textContent = "Введите корректный адрес ссылки.";
			} else {
				input.nextElementSibling.textContent = "";
			}
		});
	});
}

// Управляет аттрибутом disabled для кнопки submit
function buttonDisabler(form) {
	if (form.checkValidity()) {
		form.querySelector(".popup__btn-save").removeAttribute("disabled");
	} else {
		form.querySelector(".popup__btn-save").setAttribute("disabled", true);
	}
}

// Очищает поле ошибки ввода
function cleanErrorMessages(form) {
	const errorMessages = form.querySelectorAll(".popup__error");
	errorMessages.forEach((message) => {
		message.textContent = "";
	});
}
