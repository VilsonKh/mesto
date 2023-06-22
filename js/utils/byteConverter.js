export function byteConverter(bytes, decimals = 2) {
	if (bytes === 0) {
		return 0;
	} else {
		const byteInKb = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const size = Math.floor(bytes / byteInKb).toFixed(dm);
		return `${size} КБ`;
	}
}
