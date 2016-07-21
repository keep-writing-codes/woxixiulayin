$("#setHome")[0].onclick = function (e) {
    SetHome(window, window.location);
    alert("设为首页");
};

$("#addFavorite")[0].onclick = function (e) {
    AddFavorite(window.location, document.title);
}