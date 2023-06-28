export function testImg(elem, imgSrc, imgTitle, id) {
	const testImg = new Image();
	testImg.src = imgSrc;
	let loadStatus = "";
	testImg.addEventListener("load", () => {
		loadStatus = true;
		const imgContainer = document.getElementById(id).querySelector("div");
		imgContainer.style.background = "lightgray";
		elem.src = imgSrc;
		elem.alt = imgTitle;
		return loadStatus;
	});
	testImg.addEventListener("error", () => {
		loadStatus = false;
		elem.src = "img/imgError.webp";
		return loadStatus;
	});
}
