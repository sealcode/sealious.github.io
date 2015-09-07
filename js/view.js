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

    this.createTableOfContents = function() {
        var toc = [];
        var renderer = (function() {
            var renderer = new marked.Renderer();
            renderer.heading = function(text, level, raw) {
                if (level < 4) {
                    var anchor = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-');
                    toc.push({
                        anchor: anchor,
                        level: level,
                        text: text
                    });
                    return '<h' + level + ' id="' + anchor + '">' + text + '</h' + level + '>\n' + '<a href="#table-of-contents">Table of Contents<a>\n';
                };
            };
            return renderer;
        })();

        marked.setOptions({
            renderer: renderer,
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        });
        var response = fetcher.returnResponseText();
        var html = marked(response);

        var tocHTML = '<h1 id="table-of-contents">Table of Contents</h1>\n<ul>';
        toc.forEach(function(entry) {
            tocHTML += '<li style="padding-left: ' + entry.level / 2 + 'rem"><a href="#' + entry.anchor + '">' + entry.text + '<a></li>\n';
        });
        tocHTML += '</ul>\n';
        document.querySelector('#toc').innerHTML = tocHTML;
        tocId = document.querySelector('#toc');
    };
};
