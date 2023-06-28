export let errorTimer;

function noConnectionError() {
	errorTimer = setTimeout(() => {
		const errorMessage = document.querySelector(".noConnection");
		errorMessage.classList.add("active");
	}, 3000);
}

noConnectionError();
