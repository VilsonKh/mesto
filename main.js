import { PLACES, NEW_PLACES } from "./const.js";

// Открывает попап редактирования профиля

let editBtn = document.querySelector(".profile__btn-edit");
let popupProfile = document.querySelector(".popup-profile");

editBtn.addEventListener("click", () => {
  popupProfile.classList.add("active");
  popupProfile.addEventListener("wheel", function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  });
});

// Открывает редактирование аватарки
let avatar = document.querySelector(".profile__avatar");
let popupAvatarChange = document.querySelector(".popup-change_avatar");
avatar.addEventListener("click", function () {
  popupAvatarChange.classList.add("active");
  popupAvatarChange.addEventListener("wheel", function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  });
});

// Изменяет аватарку

let avatarUploadForm = document.querySelector('.avatar__upload')
let profileAvatar = document.querySelector('.profile__avatar-img')
let inputAvatarSource = document.querySelector('.popup__form__avatar')

avatarUploadForm.addEventListener('submit',function(){
  profileAvatar.src = inputAvatarSource.value 
  avatarUploadForm.reset()}
)

// Изменения в профиле

let inputName = document.querySelector(".popup__form__name");
let inputWork = document.querySelector(".popup__form__work");
let formProfile = document.querySelector(".popup__form-profile");
let profileName = document.querySelector(".profile__name");
let profileWork = document.querySelector(".profile__work");

formProfile.addEventListener("submit", function () {
  profileName.innerHTML = inputName.value;
  profileWork.innerHTML = inputWork.value;
  formProfile.reset();
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
  newImg.alt = place.alt;
  newImg.setAttribute("number", place.number);
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
  let currentCard = evt.target.closest('.card')
  console.log(currentCard)

  popupConfirmation.classList.add("active");
  popupProfile.addEventListener("wheel", function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  });
  let deleteCardForm = document.querySelector(".delete-form");
  deleteCardForm.addEventListener("submit", function (evt) {
    currentCard.remove()
    popupConfirmation.classList.remove("active");
  });

}

// Открывает фуллскрин изображение
let popupCard = document.querySelector(".popup-image");
let popupImg = popupCard.querySelector(".popup-image__img");
let popupImgCaption = popupCard.querySelector(".popup-image__caption");

function openPopupImg(evt) {
  popupImg.src = evt.target.src;
  popupImgCaption.textContent = evt.target.alt;
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

window.addEventListener("click", function (evt) {
  let target = evt.target;
  if (evt.target.classList.contains("popup")) {
    target.closest(".popup").classList.remove("active");
  }
});

// Закрытие попапа по крестику

let closeButtons = document.querySelectorAll(".popup__btn-close");
closeButtons.forEach((btn) => {
  btn.addEventListener("click", function (evt) {
    evt.target.closest(".popup").classList.remove("active");
  });
});

// // Валидация

// let inputs = document.querySelectorAll(".popup__input");
// let forms = document.querySelectorAll(".popup__form");

// function CustomValidation() {}

// CustomValidation.prototype = {
//   invalidities: [],
//   checkValidity: function (input) {
//     var validity = input.validity;

//     if (validity.patternMismatch) {
//       this.addInvalidity("This is the wrong pattern for this field");
//     }

//     if (validity.rangeOverflow) {
//       var max = getAttributeValue(input, "max");
//       this.addInvalidity("The maximum value should be " + max);
//     }

//     if (validity.rangeUnderflow) {
//       var min = getAttributeValue(input, "min");
//       this.addInvalidity("The minimum value should be " + min);
//     }

//     if (validity.stepMismatch) {
//       var step = getAttributeValue(input, "step");
//       this.addInvalidity("This number needs to be a multiple of " + step);
//     }
//   },

//   addInvalidity: function (message) {
//     this.invalidities.push(message);
//   },

//   getInvalidities: function () {
//     return this.invalidities.join(". \n");
//   },
// };
// forms.forEach((form) => {
//   form.addEventListener("click", function (e) {
//     for (var i = 0; i < inputs.length; i++) {
//       var input = inputs[i];

//       if (input.checkValidity() == false) {
//         var inputCustomValidation = new CustomValidation();
//         inputCustomValidation.checkValidity(input);
//         var customValidityMessage = inputCustomValidation.getInvalidities();
//         input.setCustomValidity(customValidityMessage);
//       }
//     }
//   });
// });
