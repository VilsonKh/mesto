// Заполняет профиль
export function fillProfile(data) {
	const avatar = document.querySelector(".profile__avatar-img");
	const testImg = new Image();
	testImg.src = data.avatar;
	testImg.addEventListener("load", () => {
		avatar.src = data.avatar;
		avatar.alt = "profile-photo";
	});
	testImg.addEventListener("error", () => (avatar.src = "img/imgError.webp"));
	const profileName = document.querySelector(".profile__name");

	profileName.textContent = data.name;
	const profileWork = document.querySelector(".profile__work");
	profileWork.textContent = data.work;
	const profile = document.querySelector(".profile");
	profile.setAttribute("id", data.id);
}
