$(document).ready(function() {
	chrome.storage.local.get('urls', function (items) {
		var urls = items.urls;
		var text = "";
		for (var i = 0; i < urls.length; i++) {
			text += urls[i] + '\n';
		}
		document.getElementById('urls').value = text;
	});

	document.getElementById('save').addEventListener("click", function() {
		urls = document.getElementById('urls').value.split('\n');
		chrome.storage.local.set({"urls": urls});
	});
});
