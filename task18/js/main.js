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
    if(0 == spanArry.length) {
        spanDis.appendChild(span);
    } else {
        spanDis.insertBefore(span, spanArry[0]);
    }
    spanArry.unshift(span);
}

function leftOut(){
    if(0 == spanArry.length) return;
    spanDis.removeChild(spanArry[0]);
    spanArry.shift();
}

function rightIn(){
    var span = createNumSpan();
    if(span == null) return;
    spanDis.appendChild(span);
    spanArry.push(span);
}

function rightOut() {
    if(0 == spanArry.length) return;
    spanDis.removeChild(spanArry[spanArry.length-1]);
    spanArry.pop();
}

function addListener() {
    btnLeftIn.onclick = leftIn;
    btnLeftOut.onclick = leftOut;
    btnRightIn.onclick = rightIn;
    btnRightOut.onclick = rightOut;
}
addListener();
// addLoadEvent(addListener);

