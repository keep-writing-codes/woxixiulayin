$("#setHome").onclick = function (e) {
    SetHome(window, window.location);
    alert("设为首页");
};

$("#addFavorite").onclick = function (e) {
    AddFavorite(window.location, document.title);
}

var ad = carousel($(".ad ul"));
