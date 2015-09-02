var fetcher = new function() {

    var output = "";
    var url_to_file = "https://raw.githubusercontent.com/Sealious/Sealious/dev/docs/reference.md";

    this.getMarkdownFile = function() {
        var request = new XMLHttpRequest();
        
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) { //ready
                this.parseMarkdownToHtml(request.responseText);
            }
        }.bind(this);
        request.open("GET", url_to_file, true);
        request.send(null);
    };

    this.parseMarkdownToHtml = function (response) {
        var parsed_markdown = marked(response);
        output = parsed_markdown;
    };

    // this.checkOutput = function () {
    // 	console.log(output);
    // }.bind(this)

    this.changeUrlToMarkdown = function (argument) {
    	// replace url for fetchnig other version of markdown
    };

    this.injectContentToHtml = function () {
    	// search node in html
    	// inject content
    	document.getElementById('fetcher_output').innerHTML = output;
    };


    //test for marked
    console.log(marked('I am using __markdown__.'));


}
