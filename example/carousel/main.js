window.onload = function() {
    var container = document.getElementById("container");
    var imgs = document.getElementById("imgs");
    var pre = document.getElementById("pre");
    var next = document.getElementById("next");
    var btnsDiv = document.getElementById("btns");
    var btns = btnsDiv.getElementsByTagName("span");
    var width = 800;
    var moveTime = 500;
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
        console.log("newleft = " + newleft);
        var step = offset / moveCounts;
        var stepTime = moveTime / moveCounts;
        var go = function() {
            var left = parseInt(imgs.style.left);
            var nextLeft = left + step;
            if ((step > 0 && nextLeft < newleft) || (step < 0 && nextLeft > newleft)) {
                imgs.style.left = nextLeft + "px";
                setTimeout(go, stepTime);
            } else {
                imgs.style.left = newleft + "px";
                moveOn = false;
                if (parseInt(imgs.style.left) == -4800) {
                    imgs.style.left = -800 + "px";
                } else if (parseInt(imgs.style.left) == 0) {
                    imgs.style.left = -4000 + "px";
                }
            }
        }
        go();
    }

    function jump(preindex, targetindex) {
        var offset = (preindex - targetindex) * 800;
        move(offset);
    }

    function changeBtn(){
        for(var i=0,len=btns.length; i<len; i++){
            if(btns[i].className == "on") {
                btns[i].className = "";
                break;
            }
        }
        btns[picIndex-1].setAttribute("class", "on");
    }

    function addBtnClick(){
        for(var i=0,len=btns.length; i<len; i++){
            btns[i].onclick = function() {
                if (this.getAttribute("class") == "on") return;
                preindex = picIndex;
                picIndex = this.getAttribute("index");
                changeBtn();
                jump(preindex, picIndex);
            };
        }
    }

    function autoMove(intime) {
        var timer = setInterval(next.onclick,intime);
        container.onmouseover = function() {
            clearInterval(timer);
        };
        container.onmouseout = function() {
            timer = setInterval(next.onclick,intime);
        };
    }

    pre.onclick = function() {
        if (moveOn) return false;
        if (1 == picIndex) {
            picIndex = 5;
        } else {
        picIndex -= 1;
        }
        changeBtn();
        move(800);
        return false; //return false to prevent default <a> tag link event
    };
    next.onclick = function() {
        if (moveOn) return false;
        if (5 == picIndex) {
            picIndex = 1;
        } else {
            picIndex += 1;
        }
        changeBtn();
        move(-800);
        return false; //return false to prevent default <a> tag link event
    };

    addBtnClick();
    autoMove(3000);
    console.log(container.childNodes[0].nodeValue)
};