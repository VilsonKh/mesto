import { getCards } from "./firestore/getData.js";
import { addPlace } from "./addPlace.js";
import { openProfilePopup } from "./openProfilePopup.js";
import "./openAvatarPopup.js";
import "./editAvatar.js";
import "./openNewPlacePopup.js";
import "./utils/overlayClickHandler.js";
import "./utils/closePopupHandler.js";
import { editProfileHandler } from "./editProfile.js";

getCards();
addPlace();
openProfilePopup();
editProfileHandler();
