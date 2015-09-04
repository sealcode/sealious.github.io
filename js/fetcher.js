var fetcher = new function() {

    var output = "";
    var url_to_choosen_documentation = "https://raw.githubusercontent.com/Sealious/Sealious/"
    var url_to_documentation = "https://raw.githubusercontent.com/Sealious/Sealious/dev/docs/reference.md";
    var url_to_tags = "https://api.github.com/repos/Sealious/Sealious/tags";
    var tags = {};
    var tag_list = [];
    var minor_tag_list = [];
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

            }
        };
        request.open("GET", data, true);
        request.send(null);
    };

    this.getDocumentation = function(link) {
        fetcher.getData(this.parseMarkdownToHtml.bind(this), link);
    }

    this.getTags = function() {
        fetcher.getData(function(response) {
                tags = JSON.parse(response) //save tags from github api

                for (var key in tags) {
                    if (tags.hasOwnProperty(key)) {
                        tag_list.push(tags[key].name);
                    }
                };

                var current_minor_version = 0;

                tag_list.map(function(element) {
                    if (current_minor_version !== element[3]) {
                        minor_tag_list.push(element)
                    } else {
                        console.log("the same minor");
                    }
                    current_minor_version = element[3]

                })
                this.createSelectDiv();
            }.bind(this),
            url_to_tags);
    };

    this.parseMarkdownToHtml = function(response) {
        var parsed_markdown = marked(response);
        output = parsed_markdown;
        this.injectContentToHtml();

    };

    // this.changeUrlToMarkdown = function(index) {
    //     var link = url_to_choosen_documentation + tag_list[index] + "/docs/reference.md";
    //     console.log(link);
    // };

    this.showAllTags = function() {
        console.log(tag_list);
        console.log(minor_tag_list);
    };

    // ---------------------------------------------------------------------------
    // functions for view

    this.injectContentToHtml = function() {
        document.getElementById('fetcher-output').innerHTML = output;
    };

    this.getSelectedDocs = function() {
        var selected_version = document.getElementById("docs-version").value;
        var link = url_to_choosen_documentation + selected_version + "/docs/reference.md";
        fetcher.getDocumentation(link);
    };

    this.createSelectDiv = function() {
        var select_div = document.getElementById("select-div");
        var array = minor_tag_list;

        //Create and append select list
        var selectList = document.createElement("select");
        selectList.setAttribute("id", "docs-version");
        selectList.setAttribute("onChange", "fetcher.getSelectedDocs()")
        select_div.appendChild(selectList);

        //Create and append the options
        for (var i = 0; i < array.length; i++) {
            var option = document.createElement("option");
            option.setAttribute("value", array[i]);
            option.text = array[i];
            selectList.appendChild(option);
        }
    }
}