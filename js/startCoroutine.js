import { getCards, getProfile } from "./firestore/getData.js";
import { openProfilePopupHandler } from "./openProfilePopup.js";
import { openAvatarPopupHandler } from "./openAvatarPopup.js";
import { openNewPlacePopupHandler } from "./openNewPlacePopup.js";
import { addPlace } from "./addPlace.js";
import { editProfileHandler } from "./editProfile.js";
import { editAvatar } from "./editAvatar.js";
import { checkConnection, checkConnectionState } from "./firestore/checkConnection.js";
import { removeTimer } from "./utils/removeTimer.js";
import { errorTimer } from "./noConnectionError.js";
import { closePopupHandler } from "./utils/closePopupHandler.js";
import { openFullscreenImgHandler } from "./openFullscreenImg.js";

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
		editAvatar();

		const errorMessage = document.querySelector(".noConnection");
		errorMessage.classList.remove("active");
	}
}
