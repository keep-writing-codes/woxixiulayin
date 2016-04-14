function addLoadEvent(func) {
    var onload = window.onload;
    if (typeof onload != 'function') {
        onload = func;
    } else {
        onload = function() {
            onload();
            func();
        }
    }
}

var input = document.getElementById("input");
var btnLeftIn = document.getElementById("left-in");
var btnRightIn = document.getElementById("right-in");
var btnLeftOut = document.getElementById("left-out");
var btnRightOut = document.getElementById("right-out");
var spanDis = document.getElementById("spans");
var spanArry = [];

function createSpan(num) {
    var span = document.createElement("span");
    var textnode = document.createTextNode(num);
    span.appendChild(textnode);
    return span;
}

function getInputNum(){
    var num = input.value;
    console.log(num);
    input.value = "";
    return isNaN(num)||num==""||num==false ? "bad" : num;
}

function leftIn(){
    var num = getInputNum();
    if(num == "bad") return;
    var span = createSpan(num);
    if(0 == spanArry.length) {
        spanDis.appendChild(span);
    } else {
        spanDis.insertBefore(span, spanArry[0]);
    }
    spanArry.unshift(span);
}

function addListener() {
    btnLeftIn.onclick = leftIn;
}
addListener();
// addLoadEvent(addListener);

