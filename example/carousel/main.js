window.onload = function() {
    var imgs = document.getElementById("imgs");
    var pre = document.getElementById("pre");
    var next = document.getElementById("next");
    var width = 800;
    var moveTime = 600;
    var moveCounts = 10;
    var moveOn = false; //move flag, prevent  move again when moving

    function move(offset) {
        if(moveOn) {
            return;
        }
        else {
            moveOn  = true;
        }
        var newleft = parseInt(imgs.style.left) + offset;
        var step = offset / moveCounts;
        var stepTime = moveTime / moveCounts;
        var go = function() {
            var left = parseInt(imgs.style.left);
            var nextLeft = left + step;
            if ((step > 0 && nextLeft < newleft) || (step < 0 && nextLeft > newleft)) {
                imgs.style.left = nextLeft + "px";
                setTimeout(go, stepTime);
            } else {
                imgs.style.left = newleft;
                moveOn = false;
                if (parseInt(imgs.style.left) == -4800) {
                    imgs.style.left = -800;
                } else if (parseInt(imgs.style.left) == 0) {
                    imgs.style.left = -4000;
                }
            }
        }
        go();
    }
    pre.onclick = function() {
        move(800);
        return false; //return false to prevent default <a> tag link event
    };
    next.onclick = function() {
        move(-800);
        return false; //return false to prevent default <a> tag link event
    };
};