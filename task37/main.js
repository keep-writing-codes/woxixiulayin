(function(){
    var floatediv = new Floatdiv($("#floatdiv"));

    addEvent($("#btn-show"), "click", function (e) {
        floatediv.show();
    });

    addEvent($("#btn-confirm"), "click", function (e) {
        floatediv.hide();
    });

    addEvent($("#btn-cancel"), "click", function (e) {
        floatediv.hide();
    });
})();