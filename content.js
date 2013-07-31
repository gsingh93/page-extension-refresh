chrome.runtime.onMessage.addListener(function(request) {
	if (request == "refresh") {
		window.location.reload();
	}
});
