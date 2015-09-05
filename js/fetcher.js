var fetcher = new function() {
    
    var minor_tag_list = [];
    var error = "<h4>No documentation for the selected version</h4>";
    // marked.setOptions({
    //   highlight: function (code) {
    //     return require('highlight.js').highlightAuto(code).value;
    //   }
    // });

    this.getData = function(callback, data) {
        var request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) { //ready
                callback(request.responseText);
            } else {
                view.injectContentToHtml(error);
            }
        }.bind(this);
        request.open("GET", data, true);
        request.send(null);
    };

    this.getDocumentation = function(link) {
        this.getData(view.parseMarkdownToHtml, link);
    }.bind(this);

    this.getTags = function() {
        var url_to_tags = "https://api.github.com/repos/Sealious/Sealious/tags";

        this.getData(function(response) {
                var tags = {};
                var tag_list = [];
                var choosen_minor_version = 0;
                
                tags = JSON.parse(response); //save tags from github api

                for (var key in tags) {
                    if (tags.hasOwnProperty(key)) {
                        tag_list.push(tags[key].name);
                    }
                }

                tag_list.map(function(element) {
                    var sub = element.substr(element.indexOf(".") + 1);
                    current_minor_version = parseInt(sub.substr(0, sub.indexOf(".")));

                    if (choosen_minor_version !== current_minor_version) {
                        minor_tag_list.push(element);
                    }

                    choosen_minor_version = current_minor_version;
                });
                view.createSelectDiv();
            },
            url_to_tags);
    }.bind(this);

    this.returnMinorTags = function() {
        return minor_tag_list;
    };

    this.getSelectedDocs = function() {
        var url_to_choosen_documentation = "https://raw.githubusercontent.com/Sealious/Sealious/";
        var selected_version = document.getElementById("docs-version").value;
        var link = url_to_choosen_documentation + selected_version + "/docs/reference.md";
        this.getDocumentation(link);
    }.bind(this);

};
//init page
fetcher.getTags();