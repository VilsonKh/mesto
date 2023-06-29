const avatar = document.querySelector(".profile__avatar-img");
const profileName = document.querySelector(".profile__name");
const profileWork = document.querySelector(".profile__work");
const profile = document.querySelector(".profile");

// Заполняет профиль
export function fillProfile(data) {
	const testImg = new Image();
	testImg.src = data.avatar;
	testImg.addEventListener("load", () => {
		avatar.src = data.avatar;
		avatar.alt = "profile-photo";
	});
	testImg.addEventListener("error", () => (avatar.src = "img/imgError.webp"));

	profileName.textContent = data.name;
	profileWork.textContent = data.work;
	profile.setAttribute("id", data.id);
}
