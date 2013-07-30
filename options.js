$(document).ready(function() {
	chrome.storage.local.get('urls', function (items) {
		var urls = items.urls;
		var text = "";
		for (var i = 0; i < urls.length; i++) {
			text += urls[i] + '\n';
		}
		document.getElementById('urls').value = text;
	});

	var exts = new Array();
	chrome.management.getAll(function(extensions) {
		var list = document.getElementById('extension-list');
		for (var i = 0; i < extensions.length; i++) {
			if (extensions[i].installType == "development") {
				exts[extensions[i].name] = extensions[i].id;
				var li = document.createElement('li');
				var cb = document.createElement('input');
				cb.type = "checkbox";
				cb.id = 'cb_' + extensions[i].id;
				li.appendChild(cb);
				li.appendChild(document.createTextNode(extensions[i].name));
				list.appendChild(li);
			}
		}
		
		chrome.storage.local.get('extensions', function (items) {
			var extensions = items.extensions;
			for (var i = 0; i < extensions.length; i++) {
				document.getElementById('cb_' + extensions[i]).checked = true;
			}
		});
	});

	document.getElementById('save').addEventListener("click", function() {
		document.getElementById('save-text').innerHTML = '';
		extensions = new Array();
		$('#extension-list li').each(function() {
			if ($(this).find('input')[0].checked) {
				extensions.push(exts[$(this).text()]);
			}
		});
		urls = document.getElementById('urls').value.split('\n');
		chrome.storage.local.set({"urls": urls});
		chrome.storage.local.set({"extensions": extensions});

		setTimeout(function () {
			document.getElementById('save-text').innerHTML = 'Saved';
		}, 100);
	});

	$('#extension-title').click(function() {
		var src = $('#triangle').attr('src')
		if (src == "images/down_triangle.png")
			src = "images/right_triangle.png";
		else
			src = "images/down_triangle.png";
		$('#triangle').attr('src', src);
		$('#extension-list').slideToggle();
	})
});
