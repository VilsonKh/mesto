// создает formData и преобразует в объект
export function createFormData(evt) {
	const formData = {};
	let formDataInitial = {};
	formDataInitial = new FormData(evt.target);
	for (let pair of formDataInitial.entries()) {
		formData[pair[0]] = pair[1];
	}
	return formData;
}
