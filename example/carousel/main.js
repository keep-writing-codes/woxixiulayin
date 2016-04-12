window.onload = function() {
    var imgs = document.getElementById("imgs");
    var pre = document.getElementById("pre");
    var next = document.getElementById("next");
    console.log(next);


    function move(offset) {
        var newleft = parseInt(imgs.style.left) + offset;
        imgs.style.left = newleft + "px";

    }

    pre.onclick = function(){
        move(800);
        return false;  //return false to prevent default <a> tag link event        
    };
    next.onclick = function(){
        move(-800);
        return false;  //return false to prevent default <a> tag link event 
    };
};