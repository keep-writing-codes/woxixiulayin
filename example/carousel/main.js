window.onload = function() {
    var imgs = document.getElementById("imgs");
    var pre = document.getElementById("pre");
    var next = document.getElementById("next");
    var btnsDiv = document.getElementById("btns");
    var btns = btnsDiv.getElementsByTagName("span");
    var width = 800;
    var moveTime = 600;
    var moveCounts = 10;
    var moveOn = false; //move flag, prevent  move again when moving
    var picIndex = 1;

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
                picIndex = Math.round(parseInt(imgs.style.left)/(-800));
                console.log(picIndex);
            }
        }
        go();
    }

    function jump(ele) {
        var btn = ele;
        var offset = (btn.getAttribute("index") - picIndex) * (-800);
        move(offset);
    }

    function chagneBtn(ele){
        btns[picIndex-1].style.backgroundColor = "#333";
        ele.style.backgroundColor = "red";
    }

    function addBtnClick(){
        for(var i=0,len=btns.length; i<len; i++){
            btns[i].onclick = function(){
                if (this.getAttribute("index") == picIndex) return;
                chagneBtn(this);
                jump(this);
            };
        }
    }

    function autoMove(intime) {
        var timer = setInterval(next.onclick,intime);
        imgs.onmouseover = function() {
            clearInterval(timer);
        };
        imgs.onmouseout = function() {
            timer = setInterval(next.onclick,intime);
        };
    }

    pre.onclick = function() {
        move(800);
        return false; //return false to prevent default <a> tag link event
    };
    next.onclick = function() {
        move(-800);
        return false; //return false to prevent default <a> tag link event
    };

    addBtnClick();
    autoMove(3000);
};