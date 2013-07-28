chrome.storage.local.get('urls', function (items) {
	var urls = items.urls;
	for (var i = 0; i < urls.length; i++) {
		chrome.tabs.query({'url': urls[i]}, function (tabs) {
			for (var j = 0; j < tabs.length; j++) {
				chrome.tabs.sendMessage(tabs[j].id, "refresh");
			}
		});
	}
});

// window.close();
