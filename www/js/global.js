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
        document.getElementById("content").style.overflowY = "hidden";
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
        document.getElementById("content").style.overflowY = "auto";
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

var headerSearch = {
    status: false,
    toggle: function () {
        if (!headerSearch.status) {
            document.getElementById("headerTitle").style.display = "none";
            document.getElementById("headerSearchArea").style.display = "block";
            document.getElementById("btnHeaderSearch").style.transform = "translate(-" + (document.getElementById("txtHeaderSearch").clientWidth - 20) + "px,0)";
            document.getElementById("txtHeaderSearch").focus();
            headerSearch.status = true;
        }
        else {
            document.getElementById("headerTitle").style.display = "block";
            document.getElementById("headerSearchArea").style.display = "none";
            document.getElementById("btnHeaderSearch").style.right = "0px";
            document.getElementById("txtHeaderSearch").blur();
            headerSearch.status = false;
        }
    }
}

var global = {
    apiAddress: "http://192.168.2.77:1002/",
    setupBindings: function () {
        document.getElementById("btnLeftMenu").addEventListener("click", function () {
            leftMenu.toggle();
        });

        document.getElementById("leftMenuCurtain").addEventListener("click", function () {
            leftMenu.toggle();
        }, false);

        document.getElementById("btnHeaderSearch").addEventListener("click", function () {
            headerSearch.toggle();
        });

        document.getElementById("txtHeaderSearch").addEventListener("blur", function () {
            headerSearch.toggle();
        });

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
        var ajax = $.ajax({
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

        return ajax;
    },
    openContentLoader: function () {
        document.getElementById("contentLoader").style.display = "block";
        if (document.querySelector("#contentLoader .spinner") == null)
            global.loadSpinner(document.getElementById("contentLoader"));
    },
    closeContentLoader: function () {
        document.getElementById("contentLoader").style.display = "none";
    },
    loadSpinner: function (target) {
        var opts = {
            lines: 13, // The number of lines to draw
            length: 0, // The length of each line
            width: 7, // The line thickness
            radius: 21, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#444', // #rgb or #rrggbb or array of colors
            speed: 1.4, // Rounds per second
            trail: 66, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        };
        var spinner = new Spinner(opts).spin(target);
    }
}
$(document).ready(function () {
    global.setupBindings();

    global.loadHoverable();

    initFastButtons();
});

