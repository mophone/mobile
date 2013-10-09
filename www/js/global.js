var leftMenu = {
    status: false,
    curtainDisplay: null,
    toggle: function () {
        var menu = document.getElementById("leftMenu");
        if (menu.getAttribute('data-closed') == "true") {
            leftMenu.open();
        }
        else {
            leftMenu.close();
        }
    },
    open: function () {
        var menu = document.getElementById("leftMenu");
        var curtain = document.getElementById("leftMenuCurtain");
        menu.style.transform = "translate(250px,0px)";
        menu.style.MozTransform = "translate(250px,0px)";
        menu.style.webkitTransform = "translate(250px,0px)";
        clearTimeout(leftMenu.curtainDisplay);
        curtain.style.right = "0";
        curtain.style.opacity = "0.4";
        menu.setAttribute('data-closed', false);

        if (!leftMenu.status) {
            setTimeout(function () {
                $.get("./leftMenu.html", function (data) {
                    menu.insertAdjacentHTML("afterbegin", data);
                });
            }, 500);

            leftMenu.status = true;
        }
    },
    close: function () {
        var menu = document.getElementById("leftMenu");
        var curtain = document.getElementById("leftMenuCurtain");
        menu.style.transform = "translate(-250px,0px)";
        menu.style.MozTransform = "translate(-250px,0px)";
        menu.style.webkitTransform = "translate(-250px,0px)";
        curtain.style.opacity = "0";

        leftMenu.curtainDisplay = setTimeout(function () {
            curtain.style.right = "auto";
        }, 200);
        menu.setAttribute('data-closed', true);
    }
}
var global = {
    apiAddress: "http://192.168.2.77:1002/",
    setupBindings: function () {
        Hammer(document.getElementById("btnLeftMenu")).on("tap", function () {
            leftMenu.toggle();
        });

        Hammer(document.getElementById("leftMenuCurtain")).on("tap", function () {
            leftMenu.toggle();
        }, false);

        Hammer(document).on("swipeleft", function (event) {
            leftMenu.close();
        });

        Hammer(document).on("swiperight", function (event) {
            leftMenu.open();
        });
    },
    loadHoverable: function () {
        var hoverable = document.querySelector(".hoverable");
        hoverable.addEventListener("touchstart", function () {
            hoverable.classList.add("active");
        });

        hoverable.addEventListener("touchend", function () {
            hoverable.classList.remove("active");
        });
    },
    get: function (url, callback, type) {
        $.ajax({
            url: url,
            dataType: "jsonp",
            method: "GET",
            beforeSend: function (xhr) {
                if (type == "jsonp") {
                    xhr.setRequestHeader('Accept', 'application/json');
                    xhr.setRequestHeader('Content-Type', 'application/json');
                }
            }
        }).done(function (data) {
            callback(data);
        }).fail(function (jqXHR, textStatus, errorThrown) { });
    },
    openContentLoader: function () {
        document.getElementById("contentLoader").style.display = "block";
    },
    closeContentLoader: function () {
        document.getElementById("contentLoader").style.display = "none";
    }
}
$(document).ready(function () {
    global.setupBindings();
    global.loadHoverable();
});

window.addEventListener('load', function () {
    FastClick.attach(document.body);
}, false);