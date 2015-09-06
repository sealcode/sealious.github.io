var view = new function() {

    var output = "";
    var self = this;

    this.injectContentToHtml = function(output) {
        document.getElementById('fetcher-output').innerHTML = output;
    };

    this.parseMarkdownToHtml = function(response) {
        var parsed_markdown = marked(response);
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

        this.createTableOfContents = function () {
            $(function(){ $("#toc").tableOfContents(); })
        };
};

