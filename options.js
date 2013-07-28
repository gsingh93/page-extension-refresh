$(document).ready(function() {
	chrome.storage.local.get('urls', function (items) {
		var urls = items.urls;
		var text = "";
		for (var i = 0; i < urls.length; i++) {
			text += urls[i] + '\n';
		}
		document.getElementById('urls').value = text;
	});

	chrome.management.getAll(function(extensions) {
		var list = document.getElementById('extension-list');
		for (var i = 0; i < extensions.length; i++) {
			if (extensions[i].installType == "development") {
				var li = document.createElement('li');
				li.innerHTML = extensions[i].name;
				list.appendChild(li);
			}
		}
	});

	document.getElementById('save').addEventListener("click", function() {
		urls = document.getElementById('urls').value.split('\n');
		chrome.storage.local.set({"urls": urls});
	});

	$('#extension-title').click(function() {
		var src = $('#triangle').attr('src')
		if (src == "down_triangle.png")
			src = "right_triangle.png";
		else
			src = "down_triangle.png";
		$('#triangle').attr('src', src);
		$('#extension-list').slideToggle();
	})
});
