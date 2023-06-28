import { setTimeoutUpdateCard } from "./firestore/updateDocField.js";

// Изменяет иконку like
export async function handleLikeButtonClick(evt, bool) {
	const currentCardId = evt.target.closest(".card").getAttribute("id");

	const testServ = await setTimeoutUpdateCard(currentCardId, !bool);
	if (testServ.timeout) {
		await testServ.promise;
	}
}
