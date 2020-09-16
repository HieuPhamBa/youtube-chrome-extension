window.onload = function () {
	let dButton = document.getElementById('download-video');
	let format = document.getElementById('format');
	let video = document.getElementsByTagName('video')
	function removeUnicode(str) {
		str = str.toLowerCase();
		str = str.replaceAll(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
		str = str.replaceAll(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
		str = str.replaceAll(/ì|í|ị|ỉ|ĩ/g, "i");
		str = str.replaceAll(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
		str = str.replaceAll(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
		str = str.replaceAll(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
		str = str.replaceAll(/đ/g, "d");
		str = str.replaceAll(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");

		str = str.replaceAll(/-+-/g, "-"); //thay thế 2- thành 1-
		str = str.replaceAll(/^\-+|\-+$/g, "");
		str = str.replaceAll(" ", "");
		str = str.replaceAll("|", "");

		return str;
	}

	dButton.onclick = function () {
		chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
			let url = tabs[0].url;
			let title = tabs[0].title
			let _title = removeUnicode(title)
			let message = {
				'url': url,
				'format': format.value,
				'filename': _title,
			};
			chrome.runtime.sendMessage(message);
		});
	};
}
