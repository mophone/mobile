var homeBooks = {
    getBooks: function (type) {
        global.get(global.apiAddress + "books/promoted", function (data) {
            var html="";
            for (var i = 0; i < data.length; i++) {
                console.log(data[i]);
                html += '<li class="item">' +
                    '<div class="cover">' +
                          '<img data-src="http://www.mobidik.com/resim/kitap/'+data[i].BookID+'/" />' +
                      '</div>' +
                      '<div class="info">' +
                          '<div class="name">' +
                          'Eroini Býrakmak' +
                          '</div>' +
                          '<div class="authors">' +
                          'Arzach Mills' +
                          '</div>' +
                      '</div>' +
                  '</li>';
            }

            document.getElementById("bookList").innerHTML = html;
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var itemCount = 2;

            if (windowWidth > 800)
                itemCount = 6;
            else if (windowWidth > 600)
                itemCount = 4;
            else if (windowWidth > 480)
                itemCount = 3;

            $("#bookList img").each(function () {
                var src = $(this).data("src") + "" + ((windowWidth - 16 - itemCount * 10) / itemCount) * window.devicePixelRatio + "/0.jpg";
                $(this).attr("src", src);
                $(this).attr("width", (windowWidth - 16 - itemCount * 10) / itemCount + "px");
            });

            $("#bookList").imagesLoaded(function () {
                $("#bookList").animate({ opacity: 1 });
                $("#bookList").masonry({
                    itemSelector: '.item',
                    columnWidth: (windowWidth - 16 - itemCount * 10) / itemCount,
                    gutter: 12
                });
            });
        }, "jsonp");
    }

}

function getPPI() {
    // create an empty element
    var div = document.createElement("div");
    // give it an absolute size of one inch
    div.style.width = "1in";
    // append it to the body
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(div);
    // read the computed width
    var ppi = document.defaultView.getComputedStyle(div, null).getPropertyValue('width');
    // remove it again
    body.removeChild(div);
    // and return the value
    return parseFloat(ppi);
}