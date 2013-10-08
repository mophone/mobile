﻿var leftMenu = {
    status: false,
    open: function () {
        if (!leftMenu.status)
            $.get("./leftMenu.html", function (data) {
                $("body").append(data);
                leftMenu.toggle();
            });
        leftMenu.status = true;
    },
    toggle: function () {
        if (leftMenu.status) {
            var menu = $("#leftMenu");
            var curtain = $("#leftMenuCurtain");
            if (menu.data("closed")) {
                menu.animate({ width: "250px" }, 200);
                curtain.animate({ opacity: 0.3 }, 100);
                menu.data("closed", false);
            }
            else {
                menu.animate({ width: "0px" }, 200);
                curtain.animate({ opacity: 0 }, 100);
                menu.data("closed", true);
            }
        }
        else
            leftMenu.open();
    }
}
var global = {
    setupBindings: function () {
        $("#btnLeftMenu").click(function () {
            leftMenu.toggle();
        });
    }
}
$(document).ready(function () {
    global.setupBindings();
});