export let errorTimer;

errorTimer = setTimeout(() => {
	const errorMessage = document.querySelector(".noConnection");
	errorMessage.classList.add("active");
}, 3000);
