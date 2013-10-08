var leftMenu = {
    status: false,
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
        curtain.style.display = "block";
        curtain.style.opacity = "0.3";
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
        setTimeout(function () {
            curtain.style.display = "none";
        });
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
        

        Event.add(window, "swipe", function (event, self) {
            if (self.angle == 90)
            {
                leftMenu.open;
            }
            else if (self.angle == 270)
            {
                leftMenu.close;
            }
        });
    }
}
$(document).ready(function () {
    global.setupBindings();
});

window.addEventListener('load', function () {
    FastClick.attach(document.body);
}, false);