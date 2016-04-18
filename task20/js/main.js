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
var splits = [',','，','、','\n',' ','\\', '\/'];

function createSpan(text) {
    var span = document.createElement("span");
    var textnode = document.createTextNode(text);
    span.appendChild(textnode);
    return span;
}

function createSpansByArray(array) {
    var spans = [];
    for(var i=0,len=array.length; i<len;i++) {
        if (array[i] == undefined) {
            alert("array["+i+"]is not defined" );
            continue;
        }
        var span = createSpan(array[i]);
        spans.push(span);
    }
    return spans;
}

function createNumSpan(){
    var num = getInputNum();
    return num == "bad"? null : createSpan(num);
}


function createStrSpans() {
    var strs = [];
    var value = input.value;
    console.log("input value = [" + value + "]");
    strs = value2Strs(value);
    return createSpansByArray(strs);
}

function checkSplit(s) {
    return splits.indexOf(s) != -1 ? true : false;
}

function value2Strs(value) {
    var strs = [];
    var str = "";
    if(typeof value == String || value.length != 0) {
        for(var i=0,len=value.length;i<len;i++){
            if(!checkSplit(value[i])) {
                str += value[i];
            } else {
                if(str.length > 0) {
                    strs.push(str);
                    str = "";
                }
            }

        }
    }
    console.log(strs);
    return strs;
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
    var spans = createStrSpans();
    if(spans == undefined || spans.length == 0) return;
    spanArry = spans.concat(spanArry);
    disSpans();
}

function leftOut(){
    if(0 == spanArry.length) return;
    spanArry.shift();
    disSpans();
}

function rightIn(){
    var span = createNumSpan();
    if(span == null) return;
    spanArry.push(span);
    disSpans();
}

function rightOut() {
    if(0 == spanArry.length) return;
    spanArry.pop();
    disSpans();
}

function disSpans() {
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

TEST = false;
(function tes() {
   if(!TEST) return;
   console.log("begin test:");
   var value="ajsiduf,234,3124，34、 、334、 ,323234\
dfsfd\
asdf, 123, ";
    var strs = value2Strs(value);
}());
// addLoadEvent(addListener);

