$("#setHome").onclick = function (e) {
    SetHome(window, window.location);
    alert("设为首页");
};

$("#addFavorite").onclick = function (e) {
    AddFavorite(window.location, document.title);
}

var ad = carousel($(".ad"));


var click_enable = true;
$("#ad_pre").onclick = function () {
    if(click_enable === true){
        ad.prev();
        click_enable = false;
        setTimeout(function(){
            click_enable = true;
        }, 1500);
    } else {
        return false;
    }
};
$("#ad_next").onclick = function () {
    if(click_enable === true){
        ad.next();
        click_enable = false;
        setTimeout(function(){
            click_enable = true;
        }, 1500);
    } else {
        return false;
    }
};
