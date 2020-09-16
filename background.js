chrome.runtime.onInstalled.addListener(function () {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: { hostContains: 'youtube' }
				})
			],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});

chrome.runtime.onMessage.addListener(function (message) {
	// var url = 'https://quiet-lowlands-72831.herokuapp.com/api/download?';
	var url = 'http://localhost:4000/api/download?'
	var queryString = Object.keys(message).map(key => key + '=' + message[key]).join('&');
	url += queryString;
	console.log({
		url,
		filename:  message.filename + '.' + message.format,
	});
	chrome.downloads.download({
			url,
			filename: message.filename + '.' + message.format
		},
		function (downID) {
			chrome.downloads.show(downID);
		}
	);
});