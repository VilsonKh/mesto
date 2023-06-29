import { getCards, getProfile } from "./firestore/getData.js";
import { openProfilePopupHandler } from "./openProfilePopup.js";
import { openAvatarPopupHandler } from "./openAvatarPopup.js";
import { openNewPlacePopupHandler } from "./openNewPlacePopup.js";
import { addPlace } from "./addPlace.js";
import { editProfileHandler } from "./editProfile.js";
import { editAvatarHandler } from "./editAvatar.js";
import { checkConnectionState } from "./firestore/checkConnection.js";
import { removeTimer } from "./utils/removeTimer.js";
import { errorTimer } from "./noConnectionError.js";
import { closePopupHandler } from "./utils/closePopupHandler.js";
import { showErrorMessages } from "./utils/showErrorMessages.js";
import { overlayClickHandler } from "./utils/overlayClickHandler.js";

const firstStart = setInterval(startCoroutine, 500);

function startCoroutine() {
	if (checkConnectionState) {
		clearInterval(firstStart);
		closePopupHandler();
		removeTimer(errorTimer);
		getCards();
		getProfile();
		openProfilePopupHandler();
		openAvatarPopupHandler();
		openNewPlacePopupHandler();
		addPlace();
		editProfileHandler();
		editAvatarHandler();
		showErrorMessages();
		overlayClickHandler();

		const errorMessage = document.querySelector(".noConnection");
		errorMessage.classList.remove("active");
	}
}
