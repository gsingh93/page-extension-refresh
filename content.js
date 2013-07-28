chrome.runtime.onMessage.addListener(function(request) {
	console.log("Message received");
	if (request == "refresh") {
		window.location.reload();
	}
});
