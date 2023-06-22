// Удаляет обработчик события скролла
export function removeScrollHandler(popup) {
	popup.removeEventListener("wheel", (evt) => blockScroll(evt));
}