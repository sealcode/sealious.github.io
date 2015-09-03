var fetcher = new function() {

    var output = "";
    var url_to_choosen_documentation = "https://raw.githubusercontent.com/Sealious/Sealious/"
    var url_to_documentation = "https://raw.githubusercontent.com/Sealious/Sealious/dev/docs/reference.md";
    var url_to_tags = "https://api.github.com/repos/Sealious/Sealious/tags";
    var tags = {};
    var tag_list = [];

    this.getData = function(callback, data) {
        var request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) { //ready
                callback(request.responseText);
            }
        };
        request.open("GET", data, true);
        request.send(null);
    };


    this.getDocumentation = function() {
        fetcher.getData(fetcher.parseMarkdownToHtml, url_to_documentation);
    }

    this.getTags = function() {
        fetcher.getData(function(response) {
                tags = JSON.parse(response) //save tags from github api

                for (var key in tags) {
                  if( tags.hasOwnProperty( key ) ) {
                    tag_list.push(tags[key].name);
                  } 
                }
            },
            url_to_tags);
    };

    this.parseMarkdownToHtml = function(response) {
        var parsed_markdown = marked(response);
        output = parsed_markdown;
    };

    this.changeUrlToMarkdown = function(index) {
        var link = url_to_choosen_documentation + tag_list[index] + "/docs/reference.md";
        console.log(link); 
    };

    this.showAllTags = function () {
        console.log(tag_list);  
    };

    this.injectContentToHtml = function() {
        document.getElementById('fetcher_output').innerHTML = output;
    };
}