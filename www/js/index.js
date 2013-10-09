var homeBooks = {
    tabs: ["promoted", "newest", "sell"],
    activeTab: 0,
    activeAjax: null,
    openTab: function (el) {
        homeBooks.activeTab = el.getAttribute("data-action") * 1;
        homeBooks.getBooks();
    },
    getBooks: function () {
        document.getElementById("content").style.overflowY = "hidden";

        var homeButtons = document.querySelectorAll(".sub_menu .item");

        [].forEach.call(homeButtons, function (el) {
            el.classList.remove("active");
        });
        var el = document.querySelector("[data-action='" + homeBooks.activeTab + "']");
        el.classList.add("active");

        var type = homeBooks.tabs[homeBooks.activeTab];

        document.getElementById("bookList").innerHTML = "";
        document.getElementById("bookList").style.height = "auto";

        global.openContentLoader();

        if (homeBooks.activeAjax)
            homeBooks.activeAjax.abort();
        homeBooks.activeAjax = global.get(global.apiAddress + "books/" + type, function (data) {
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

            var imageWidth = Math.round(((windowWidth - itemCount * 16) / itemCount) * window.devicePixelRatio);

            var images = document.querySelectorAll("#bookList img");
            for (var i = 0; i < images.length; i++) {
                var src = images[i].getAttribute("data-src") + "" + imageWidth + "/0.jpg";
                images[i].setAttribute("src", src);
                images[i].setAttribute("width", (windowWidth - itemCount * 16) / itemCount + "px");
            }

            imagesLoaded(document.querySelector('#bookList'), function (instance) {

                var items = document.querySelectorAll("#bookList li");
                for (var i = 0; i < images.length; i++) {
                    items[i].style.width = ((windowWidth - itemCount * 16) / itemCount) + "px";
                }

                if ($("#bookList").hasClass("isotope"))
                    $("#bookList").isotope('destroy');

                $("#bookList").isotope({
                    itemSelector: '.item'
                }, function () {
                    global.closeContentLoader();
                    document.getElementById("content").style.overflowY = "auto";
                });




            });
        }, "jsonp");
    },
    prevTab: function () {
        if (homeBooks.activeTab != 0) {
            homeBooks.activeTab--;
            homeBooks.getBooks();
        }
    },
    nextTab: function () {
        if (homeBooks.activeTab + 1 != homeBooks.tabs.length) {
            homeBooks.activeTab++;
            homeBooks.getBooks();
        }
    },
    setupBindings: function () {
        var homeButtons = document.querySelectorAll(".sub_menu .item");

        for (var i = 0; i < homeButtons.length; i++) {
            homeButtons[i].addEventListener("click", function () {
                homeBooks.openTab(this);
            });
        }

        //Hammer(document).on("swipeleft", function (event) {
        //    homeBooks.nextTab();
        //});

        //Hammer(document).on("swiperight", function (event) {
        //    homeBooks.prevTab();
        //});
    }
}
