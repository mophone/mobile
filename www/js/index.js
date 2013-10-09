var homeBooks = {
    activeTab: null,
    getBooks: function (type) {
        global.openContentLoader();
        homeBooks.activeTab = type;
        document.getElementById("bookList").innerHTML = "";
        global.get(global.apiAddress + "books/" + type, function (data) {
            var html = "";
            for (var i = 0; i < data.length; i++) {
                html += '<li class="item">' +
                    '<div class="cover">' +
                          '<img data-src="http://www.mobidik.com/resim/kitap/' + data[i].BookID + '/" />' +
                      '</div>' +
                      '<div class="info">' +
                          '<div class="name">' +
                          data[i].BookName +
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

          
          

            imagesLoaded(document.querySelector('#bookList'), function (instance) {
                var imageWidth = Math.round(((windowWidth - 16 - itemCount * 10) / itemCount) * window.devicePixelRatio);

                var images = document.querySelectorAll("#bookList img");
                for (var i = 0; i < images.length; i++) {
                    var src = images[i].getAttribute("data-src") + "" + imageWidth + "/0.jpg";
                    images[i].setAttribute("src", src);
                }
                document.getElementById("bookList").style.columnCount = itemCount;
                document.getElementById("bookList").style.MozColumnCount = itemCount;
                document.getElementById("bookList").style.webkitColumnCount = itemCount;

                //var items = document.querySelectorAll("#bookList li");
                //for (var i = 0; i < images.length; i++) {
                //    items[i].style.width = items[i].clientWidth - 5 + "px";
                //}
              
            });
            global.closeContentLoader();
        }, "jsonp");
    },
    setupBindings: function () {
        var homeButtons = document.querySelectorAll(".sub_menu .item");
        for (var i = 0; i < homeButtons.length; i++) {
            Hammer(homeButtons[i]).on("tap", function () {
                [].forEach.call(homeButtons, function (el) {
                    el.classList.remove("active");
                });
                this.classList.add("active");
                homeBooks.getBooks(this.getAttribute("data-action"));
            });
        }


    }
}
