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
var btnSort = document.getElementById("sort");
var spanDis = document.getElementById("spans");
var spanArry = [];
spanDis.style.height = "200px";
var spansMaxheight = parseInt(spanDis.style.height);
var spanWidth = 20;

function createSpan(num) {
    var span = document.createElement("span");
    span.style.width = spanWidth + "px";
    span.style.height = spansMaxheight / 100 * num + "px";
    return span;
}

function createNumSpan() {
    var num = getInputNum();
    return num == "bad" ? null : createSpan(num);
}

function getInputNum() {
    var num = input.value;
    console.log(num);
    input.value = "";
    if (isNaN(num) || num == "" || num == false) {
        alert("请输入数字");
        return "bad";
    }
    if (num > 100 || num < 10) {
        alert("请输入10~100的数字");
        return "bad";
    }
    if (spanArry.length > 60) {
        alert("超过队列上限（60）");
        return "bad";
    } else return num;
}

function leftIn() {
    var span = createNumSpan();
    if (span == null) return;
    // if(0 == spanArry.length) {
    //     spanDis.appendChild(span);
    // } else {
    //     spanDis.insertBefore(span, spanArry[0]);
    // }
    spanArry.unshift(span);
    creatSpans();
}

function leftOut() {
    if (0 == spanArry.length) return;
    spanArry.shift();
    creatSpans();
}

function rightIn() {
    var span = createNumSpan();
    if (span == null) return;
    spanArry.push(span);
    creatSpans();
}

function rightOut() {
    if (0 == spanArry.length) return;
    spanArry.pop();
    creatSpans();
}

function addListener() {
    btnLeftIn.onclick = leftIn;
    btnLeftOut.onclick = leftOut;
    btnRightIn.onclick = rightIn;
    btnRightOut.onclick = rightOut;
    btnSort.onclick = sort;
}

function creatSpans() {
    spanDis.innerHTML = "";
    for (var i = 0, len = spanArry.length; i < len; i++) {
        var left = i * (spanWidth + 1);
        spanArry[i].style.left = left + "px";
        spanDis.appendChild(spanArry[i]);
    }
}

function getHeightN(n) {
    return parseInt(spanArry[n].style.height);
}

function sort() {
    for (var i = 1, len = spanArry.length; i < len; i++) {
        console.log(i);
        var tempHight = getHeightN(i);
        var tempSpan = spanArry[i];
        for (var j = i - 1; j > -1; j--) {
            console.log(j);
            if (tempHight > getHeightN(j)) {
                spanArry[j + 1] = spanArry[j];
                spanArry[j] = tempSpan;
                creatSpans();
            } else {
                break;
            }
        }
    }
}



addListener();
// addLoadEvent(addListener);