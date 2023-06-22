// Добавляет обработчик события скролла
export function addScrollHandler(popup) {
	popup.addEventListener("wheel", (evt) => {
		evt.preventDefault();
		evt.stopPropagation();
	});
}
