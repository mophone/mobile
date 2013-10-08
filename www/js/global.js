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
        curtain.style.display = "block";
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
            curtain.style.display = "none";
        }, 1000);
        menu.setAttribute('data-closed', true);
    }
}
var global = {
    setupBindings: function () {
        document.getElementById("btnLeftMenu").addEventListener("click", function () {
            leftMenu.toggle();
        }, false);
        document.getElementById("leftMenuCurtain").addEventListener("click", function () {
            leftMenu.toggle();
        }, false);


        var touches = []
        Hammer(window).on("swipeleft", function (event) {
            leftMenu.close();
        });

        Hammer(window).on("swiperight", function (event) {
            leftMenu.open();
        });
    }
}
$(document).ready(function () {
    global.setupBindings();
});

window.addEventListener('load', function () {
    FastClick.attach(document.body);
}, false);