import { updateCardField } from "../firestore/updateDocField.js";

// Изменяет иконку like
export function handleLikeButtonClick(evt, bool) {
	const currentCardId = evt.target.closest(".card").getAttribute("id");
	updateCardField(currentCardId, !bool);
}
