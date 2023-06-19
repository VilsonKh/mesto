import { PLACES, NEW_PLACES } from "./const.js";

// Открывает попап редактирования профиля
const inputName = document.querySelector(".popup__form__name");
const inputWork = document.querySelector(".popup__form__work");
let editBtn = document.querySelector(".profile__btn-edit");
let popupProfile = document.querySelector(".popup-profile");

editBtn.addEventListener("click", () => {
	popupProfile.classList.add("active");
	inputName.value = profileName.innerHTML;
	inputWork.value = profileWork.innerHTML;
	popupProfile.addEventListener("wheel", function (evt) {
		evt.preventDefault();
		evt.stopPropagation();
	});
});

// Изменения в профиле и закрытие формы

const profileBtnSave = document.querySelector("#profileSaveBtn");
const placeBtnSave = document.querySelector("#placeSaveBtn");
const avatarBtnSave = document.querySelector("#avatarSaveBtn");
const formProfile = document.querySelector(".popup__form-profile");
const profileName = document.querySelector(".profile__name");
const profileWork = document.querySelector(".profile__work");
console.log(profileBtnSave);

formProfile.addEventListener("submit", function () {
	profileName.innerHTML = inputName.value;
	profileWork.innerHTML = inputWork.value;
	popupProfile.classList.remove("active");
	profileBtnSave.setAttribute("disabled", true);
	formProfile.reset();
});

// Открывает редактирование аватарки
let avatar = document.querySelector(".profile__avatar");
let popupAvatarChange = document.querySelector(".popup__change-avatar");
avatar.addEventListener("click", function () {
	popupAvatarChange.classList.add("active");
	popupAvatarChange.addEventListener("wheel", function (evt) {
		evt.preventDefault();
		evt.stopPropagation();
	});
});

// Изменяет аватарку

let avatarUploadForm = document.querySelector(".avatar__upload");
let profileAvatar = document.querySelector(".profile__avatar-img");
let inputAvatarSource = document.querySelector(".popup__form__avatar");

avatarUploadForm.addEventListener("submit", function () {
	profileAvatar.src = inputAvatarSource.value;
	popupAvatarChange.classList.remove("active");
	avatarUploadForm.reset();
});

// Открывает попап нового места

let addPlaceBtn = document.querySelector(".profile__btn-add");
let popupPlace = document.querySelector(".popup-place");

addPlaceBtn.addEventListener("click", () => {
	popupPlace.classList.add("active");
	popupPlace.addEventListener("wheel", function (evt) {
		evt.preventDefault();
		evt.stopPropagation();
	});
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
	deleteBtn.addEventListener("click", handleBusketButtonClick);
	// Удалять карточку по подтверждению

	return newCard;
}

// Открывает попап подтверждения удаления

function handleBusketButtonClick(evt) {
	let popupConfirmation = document.querySelector(".popup-delete_confirmation");
	let currentCard = evt.target.closest(".card");
	console.log(currentCard);

	popupConfirmation.classList.add("active");
	popupProfile.addEventListener("wheel", function (evt) {
		evt.preventDefault();
		evt.stopPropagation();
	});
	let deleteCardForm = document.querySelector(".delete-form");
	deleteCardForm.addEventListener("submit", function (evt) {
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
	popupCard.addEventListener("wheel", function (evt) {
		evt.preventDefault();
		evt.stopPropagation();
	});
}

createInitialCards(PLACES);

// Добавляет интерактивный лайк
function handleLikeButtonClick(evt) {
	evt.target.classList.toggle("checked");
}

// Добавляю новые карточки по заполнению формы

let createForm = document.querySelector("[name='cardForm']");
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
		evt.target.closest(".popup").classList.remove("active");
	});
});

// Validation v2

const profileInputs = document.querySelectorAll(".popup__form-profile input");

// profileInputs.forEach((input) => {
// 	input.addEventListener("input", () => {
// 		profileBtnSave.removeAttribute("disabled");
// 	});
// });

function showErrorMessage(input) {
	const errorMessage = input.closest(".popup__field").querySelector(".popup__error");
	const validity = input.validity;
	console.log(validity);
	console.log(validity.typeMissmatch);
	if (validity.valueMissing) {
		validity.valueMissing;
		errorMessage.textContent = "Вы пропустили это поле.";
	} else if (validity.tooShort) {
		errorMessage.textContent = "Минимальная количество символов - 2";
	} else if (validity.typeMismatch) {
		errorMessage.textContent = "Введите корректный адрес ссылки.";
	} else {
		errorMessage.textContent = "";
	}
}

const allInputs = document.querySelectorAll("input");
allInputs.forEach((input) => {
	input.addEventListener("input", () => showErrorMessage(input));
});

function validation(input1, input2) {}
// Валидация
//Валидация формы добавления карточки
// let createFormInputs = createForm.querySelectorAll("input");

// createFormInputs.forEach((input) => {
// 	input.addEventListener("input", function () {
// 		if (checkPlaceForm()) {
// 			input.closest("form").querySelector("button").classList.remove("disabled");
// 			input.closest("form").querySelector("button").classList.add("btn");
// 		} else {
// 			input.closest("form").querySelector("button").classList.add("disabled");
// 			input.closest("form").querySelector("button").classList.remove("btn");
// 		}
// 	});
// });

// inputPlaceName.addEventListener("input", function () {
// 	if (inputPlaceName.value == "") {
// 		inputPlaceName.closest("label").querySelector("span").textContent = "Вы пропустили это поле.";
// 	} else if (inputPlaceName.value.length < 2) {
// 		inputPlaceName.closest("label").querySelector("span").textContent = "Минимальное количество символов - 2.";
// 	} else {
// 		inputPlaceName.closest("label").querySelector("span").textContent = "";
// 	}
// });

// inputPlaceSource.addEventListener("input", function (evt) {
// 	if (inputPlaceSource.value == "") {
// 		inputPlaceSource.closest("label").querySelector("span").textContent = "Вы пропустили это поле.";
// 	} else if (!inputPlaceSource.value.startsWith("https://www")) {
// 		inputPlaceSource.closest("label").querySelector("span").textContent = "Введите адрес сайта.";
// 	} else {
// 		inputPlaceSource.closest("label").querySelector("span").textContent = "";
// 	}
// });

// let formPlace = document.querySelector('.formPlace')

// if (checkEmptyInput(inputPlaceName) || checkEmptyInput(inputPlaceSource) || checkSourceInput(inputPlaceSource)) {
//   formPlace.querySelector("button").classList.remove("disabled");
//   formPlace.querySelector("button").classList.add("btn");
// }

// function checkPlaceForm() {
// 	if (inputPlaceName.validity.valid && inputPlaceSource.validity.valid) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }

//Валидация формы редактирования профиля

// let editProfileInputs = formProfile.querySelectorAll("input");

// editProfileInputs.forEach((input) => {
// 	input.addEventListener("input", function () {
// 		if (checkProfileForm()) {
// 			input.closest("form").querySelector("button").classList.remove("disabled");
// 			input.closest("form").querySelector("button").classList.add("btn");
// 			input.closest("label").querySelector("span").textContent = "";
// 		} else if (input.value.length == 0) {
// 			input.closest("form").querySelector("button").classList.add("disabled");
// 			input.closest("form").querySelector("button").classList.remove("btn");
// 			input.closest("label").querySelector("span").textContent = "Вы пропустили это поле.";
// 		} else if (input.value.length < 3) {
// 			input.closest("form").querySelector("button").classList.add("disabled");
// 			input.closest("form").querySelector("button").classList.remove("btn");
// 			input.closest("label").querySelector("span").textContent = "Минимальное количество символов - 3.";
// 		}
// 	});
// });

// function checkProfileForm() {
// 	if (inputName.validity.valid && inputWork.validity.valid) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }

// let forms = document.querySelectorAll("form");
// forms.forEach((form) => {
// 	form.addEventListener("submit", function (evt) {
// 		evt.preventDefault();
// 		evt.stopPropagation();
// 	});
// });

// inputs.forEach((input)=>{
//   if(input.value ==""){
//     input.closest('form').querySelector('button').classList.toggle('disabled')
//     input.closest('form').querySelector('button').classList.toggle('btn')
//   }
//   input.addEventListener('input',function(evt){

//     if(input.validity.tooShort){

//     } else if(input.validity.tooLong) {

//     }else if(input.validity.valid){
//       input.closest('form').querySelector('button').classList.toggle('disabled')
//       input.closest('form').querySelector('button').classList.toggle('btn')
//     } else {

//     }

//     if(input.value.length === 0){

//       console.log('error')
//     }

//   })
// })
