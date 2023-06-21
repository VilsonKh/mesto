import { addCardData } from "./js/addData.js";
import { getCards } from "./js/getData.js";
import { deleteData } from "./js/deleteData.js";
import { updateCardField, updateProfileField } from "./js/updateDocField.js";

let currentForm = "";
let formData = {};

getCards();
// Отправляет в базу новое место, введенное пользователем
const newPlaceForm = document.querySelector("[name=addPlaceForm]");
newPlaceForm.addEventListener("submit", (e) => {
	e.preventDefault();
	createFormData(e);
	addCardData(formData);
	popupPlace.classList.remove("active");
	newPlaceForm.reset();
});

// Заполняет профиль
export function fillProfile(data) {
	const avatar = document.querySelector(".profile__avatar-img");
	avatar.src = data.avatar;
	const profileName = document.querySelector(".profile__name");
	profileName.innerHTML = data.name;
	const profileWork = document.querySelector(".profile__work");
	profileWork.innerHTML = data.work;
	const profile = document.querySelector(".profile");
	profile.setAttribute("id", data.id);
}

// Создает formData
function createFormData(evt) {
	formData = {};
	let formDataInitial = {};
	formDataInitial = new FormData(evt.target);
	console.log(formDataInitial);
	for (let pair of formDataInitial.entries()) {
		console.log(pair[0]);
		formData[pair[0]] = pair[1];
	}
	return formData;
}

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
const profileBtnSave = document.querySelector("#avatarSaveBtn");
const formProfile = document.querySelector(".popup__form-profile");
const profileName = document.querySelector(".profile__name");
const profileWork = document.querySelector(".profile__work");

formProfile.addEventListener("submit", function (evt) {
	evt.preventDefault();
	createFormData(evt);
	const currentProfileId = document.querySelector(".profile").getAttribute("id");
	console.log(currentProfileId);
	updateProfileField(currentProfileId, formData);
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

avatarUploadForm.addEventListener("submit", function (evt) {
	evt.preventDefault();
	const currentProfileId = document.querySelector(".profile").getAttribute("id");
	console.log(formData);
	createFormData(evt);
	updateProfileField(currentProfileId, formData);
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

export function createCard(places) {
	places.map((place) => {
		let galleryList = document.querySelector(".gallery__list");
		let cardTemplate = document.querySelector(".template__card").content;
		let card = cardTemplate.querySelector(".card");
		let newCard = card.cloneNode(true);
		let newImg = newCard.querySelector(".card__photo");
		newImg.src = place.img;
		newImg.alt = place.title;
		newImg.addEventListener("error", () => (newImg.src = "img/imgError.webp"));
		const newTitle = newCard.querySelector(".card__title");
		newTitle.textContent = place.title;
		console.log({ title: place.title, id: place.id });
		newCard.setAttribute("id", place.id);
		//Открывает фуллскрин изображение
		newImg.addEventListener("click", openPopupImg);
		// Добавляет интерактивный лайк
		const likeButton = newCard.querySelector(".card__btn-likes");
		place.isLiked ? likeButton.classList.add("checked") : null;
		likeButton.addEventListener("click", (evt) => handleLikeButtonClick(evt, place.isLiked));
		// Удаляет карточку по подтверждению
		let deleteBtn = newCard.querySelector(".card__btn-del");
		deleteBtn.addEventListener("click", handleBusketButtonClick);
		galleryList.prepend(newCard);
	});
}

// let galleryList = document.querySelector(".gallery__list");
// currentCardId = galleryList.addEventListener("click", (e) => e.target.closest(".card").getAttribute("id"));

// Открывает попап подтверждения удаления
function handleBusketButtonClick(evt) {
	let popupConfirmation = document.querySelector(".popup-delete_confirmation");
	popupConfirmation.classList.add("active");
	popupProfile.addEventListener("wheel", (evt) => blockScroll(evt));
	let deleteCardForm = document.querySelector(".delete-form");
	deleteCardForm.addEventListener("submit", (e) => {
		e.preventDefault();
		let currentCardId = evt.target.closest(".card").id;
		deleteData(currentCardId);
		popupConfirmation.classList.remove("active");
	});
}

// Изменяет иконку like
function handleLikeButtonClick(evt, bool) {
	const currentCardId = evt.target.closest(".card").getAttribute("id");
	console.log(currentCardId);

	updateCardField(currentCardId, !bool);
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

// Добавляет новые карточки по заполнению формы
let createForm = document.querySelector("[name='addPlaceForm']");
const inputPlaceName = document.getElementById("place");
const inputPlaceSource = document.getElementById("source");

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
			if (!input.checkValidity()) {
				input.style.borderBottom = "1px solid red";
				if (validity.valueMissing) {
					input.nextElementSibling.textContent = "Вы пропустили это поле.";
				} else if (validity.tooShort) {
					input.nextElementSibling.textContent = "Минимальная количество символов - 2";
				} else if (validity.typeMismatch) {
					input.nextElementSibling.textContent = "Введите корректный адрес ссылки.";
				}
			} else {
				input.nextElementSibling.textContent = "";
				input.style.borderBottom = "";
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
