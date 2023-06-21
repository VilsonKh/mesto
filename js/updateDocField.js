import { updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db } from "../firebase/config.js";

export function updateCardField(cardId, value) {
	console.log("отправлено обновление карточек");
	updateDoc(doc(db, "cards", cardId), { isLiked: value });
}

export function updateProfileField(profileId, formData) {
	console.log("отправлено обновление профиля");
	console.log(formData);
	updateDoc(doc(db, "profiles", profileId), { ...formData });
}
