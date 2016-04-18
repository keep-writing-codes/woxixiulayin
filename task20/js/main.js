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

function createNumSpan(){
    var num = getInputNum();
    return num == "bad"? null : createSpan(num);
}

function getInputNum(){
    var num = input.value;
    console.log(num);
    input.value = "";
    if(isNaN(num)||num==""||num==false) {
        alert("请输入数字");
        return "bad";
    }
    else return num;
}

function leftIn(){
    var span = createNumSpan();
    if(span == null) return;
    spanArry.unshift(span);
    createSpans();
}

function leftOut(){
    if(0 == spanArry.length) return;
    spanArry.shift();
    createSpans();
}

function rightIn(){
    var span = createNumSpan();
    if(span == null) return;
    spanArry.push(span);
    createSpans();
}

function rightOut() {
    if(0 == spanArry.length) return;
    spanArry.pop();
    createSpan();
}

function createSpans() {
    spanDis.innerHTML = "";
    for (var i = 0, len = spanArry.length; i < len; i++) {
        spanDis.appendChild(spanArry[i]);
    }
}

function addListener() {
    btnLeftIn.onclick = leftIn;
    btnLeftOut.onclick = leftOut;
    btnRightIn.onclick = rightIn;
    btnRightOut.onclick = rightOut;
}
addListener();
// addLoadEvent(addListener);

