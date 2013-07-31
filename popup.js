chrome.storage.local.get(['urls', 'extensions'], function (items) {
	var ids = items.extensions;
	for (var i = 0; i < ids.length; i++) {
		chrome.management.setEnabled(ids[i], false, (function(id, finished) {
			return function() {
				chrome.management.setEnabled(id, true, function() {
					if (finished) {
						refreshUrls(items.urls);
						window.close();
					}
				});
			}
		})(ids[i], i == ids.length - 1));
	}
});

function refreshUrls(urls) {
	for (var i = 0; i < urls.length; i++) {
		chrome.tabs.query({'url': urls[i]}, function (tabs) {
			for (var j = 0; j < tabs.length; j++) {
				chrome.tabs.sendMessage(tabs[j].id, "refresh");
			}
		});
	}
}
