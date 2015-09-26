var view = new function() {

	var output = "";
	var self = this;
	var seal_spinner = '<img class="animated seal" id="loading-seal" src="img/logo/sealious_icon.svg" alt="Sealious logo">';

	this.injectContentToHtml = function(output) {
		if (output !== undefined) {
			document.querySelector('#fetcher-output').innerHTML = output;
		} else {
			document.querySelector('#fetcher-output').innerHTML = seal_spinner;
		}
	};

	this.parseMarkdownToHtml = function(markdown) {
		marked.setOptions({
			highlight: function(code) {
				return hljs.highlightAuto(code).value;
			}
		});

		var parsed_markdown = marked(markdown);
		output = parsed_markdown;
		self.injectContentToHtml(output);

	};

	this.createSelectDiv = function() {
		var select_div = document.querySelector("#select-div");
		var array = fetcher.returnMinorTags();

		var selectList = document.createElement("select");
		selectList.setAttribute("id", "docs-version");
		selectList.setAttribute("onChange", "fetcher.getSelectedDocs()");
		select_div.appendChild(selectList);

		for (var i = 0; i < array.length; i++) {
			var option = document.createElement("option");
			option.setAttribute("value", array[i]);
			option.text = array[i];
			selectList.appendChild(option);
		}
		fetcher.getSelectedDocs();

		
	};

	this.createTableOfContents = function(callback) {
		var toc = '<ul>\n';
		var list_of_headers = document.querySelectorAll("h1, h2, h3");

		for (var i in list_of_headers) {

			if (list_of_headers[i].tagName !== undefined) {
				var header_number = list_of_headers[i].tagName[1];
			}

			if (list_of_headers[i].innerHTML !== undefined) {
				toc += '<li style="padding-left: ' + header_number / 2 + 'rem"><a href="#' + list_of_headers[i].id + '">' + list_of_headers[i].innerHTML + '<a></li>\n';
			}
		}

		toc += '</ul>';
		document.querySelector('#toc').innerHTML = toc;
	};
};
