var fetcher = new function() {
    
    var minor_tag_list = [];
    var error = "<h4>No documentation for the selected version</h4>";
    var self = this;
    
    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });

    this.getData = function(callback, data) {
        var request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) { //ready
                callback(request.responseText);
            } else {
                view.injectContentToHtml(error);
            }
        };
        request.open("GET", data, true);
        request.send(null);
    };

    this.getDocumentation = function(link) {
        self.getData(view.parseMarkdownToHtml, link);
    };

    this.getTags = function() {
        var url_to_tags = "https://api.github.com/repos/Sealious/Sealious/tags";

        self.getData(function(response) {
                var tags = {};
                var tag_list = [];
                var sub = "";
                var choosen_minor_version = 0;
                
                tags = JSON.parse(response); //save tags from github api

                for (var key in tags) {
                    if (tags.hasOwnProperty(key)) {
                        tag_list.push(tags[key].name);
                    }
                }

                tag_list.map(function(element) {
                    sub = element.substr(element.indexOf(".") + 1);
                    current_minor_version = parseInt(sub.substr(0, sub.indexOf(".")));

                    if (choosen_minor_version !== current_minor_version) {
                        minor_tag_list.push(element);
                    }

                    choosen_minor_version = current_minor_version;
                });
                view.createSelectDiv();
            },
            url_to_tags);
    };

    this.returnMinorTags = function() {
        return minor_tag_list;
    };

    this.getSelectedDocs = function() {
        var url_to_choosen_documentation = "https://raw.githubusercontent.com/Sealious/Sealious/";
        var selected_version = document.getElementById("docs-version").value;
        var link = url_to_choosen_documentation + selected_version + "/docs/reference.md";
        self.getDocumentation(link);
    };

};
//init page
fetcher.getTags();