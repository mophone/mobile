var leftMenu = {
    status: false,
    toggle: function () {
        var menu = document.getElementById("leftMenu");
        var curtain = document.getElementById("leftMenuCurtain");
        if (menu.getAttribute('data-closed') == "true") {
            menu.style.left = "0px";
            curtain.style.opacity = "0.3";
            menu.setAttribute('data-closed', false);
        }
        else {
            menu.style.left = "-250px";
            curtain.style.opacity = "0";
            menu.setAttribute('data-closed', true);
        }
        if (!leftMenu.status) {
            setTimeout(function () {
                $.get("./leftMenu.html", function (data) {
                    menu.insertAdjacentHTML("afterbegin", data);
                    leftMenu.status = true;
                });
            }, 500);
        }
    }
}
var global = {
    setupBindings: function () {
        document.getElementById("btnLeftMenu").addEventListener("click", function () {
            leftMenu.toggle();
        }, false);
    }
}
$(document).ready(function () {
    global.setupBindings();
});

window.addEventListener('load', function () {
    FastClick.attach(document.body);
}, false);