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
var btnQuery = document.getElementById("btn-query");
var inputQuery = document.getElementById("input-query");
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

function getTextFromSpan(span) {
    if(span.nodeType != 1) return false;
    return span.childNodes[0].nodeValue;
}

function findMatchSpan(spans, str) {
    var matchSpans = [];
    if(!spans || spans.length < 1) return false;
    for(var i=0,len=spans.length;i<len;i++) {
        var span = spans[i];
        if(span.nodeType != 1) continue;
        if(getTextFromSpan(span).indexOf(str) != -1) {
            matchSpans.push(span);
        }
    }
    return matchSpans;
}

function painMatchSpans(allspans, matchspans) {
    if(!allspans || allspans.length == 0 || !matchspans || matchspans.length == 0) return false;
    matchspans.forEach( function(element, index) {
        if(allspans.indexOf(element) == -1){
            matchspans.pop(element);
        }
    });
    setSpansBackground(matchspans, "blue");
}

function value2Strs(value) {
    var strs = [];
    var str = "";
    if(typeof value == String || value.length != 0) {
        for(var i=0,len=value.length;i<len;i++){
            if(!checkSplit(value[i])) {
                str += value[i];
                if(len-1 == i) {
                    strs.push(str);
                }
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

function queryInput() {
    if(spanArry.length < 1) {
        alert("请插入数据");
        return false;
    } 
    var textquery = inputQuery.value;
    if(!checkQueryText(textquery)) return false;
    var matchspans = findMatchSpan(spanArry, textquery);
    setSpansBackground(spanArry, "red");
    painMatchSpans(spanArry, matchspans);
}

function checkQueryText(str){
    if(str == undefined || str == null ) {
        console.log("checkQueryText 输入错误");
        return false;
    } 
    if(splits.indexOf(str) != -1) {
        alert("请输入查询数字或字母组合");
        return false;
    }
    return true;
}
function setSpansBackground(spans, color){
    if(!spans || spans.length < 1 || typeof color != 'string') return false;
    for (var i = 0, len = spans.length; i < len; i++) {
        var span = spans[i];
        if(span.nodeType != 1) continue;
        span.style.background = color;
    }
}


function addListener() {
    btnLeftIn.onclick = leftIn;
    btnLeftOut.onclick = leftOut;
    btnRightIn.onclick = rightIn;
    btnRightOut.onclick = rightOut;
    btnQuery.onclick = queryInput;
}

// addListener();

TEST = false;
(function tes() {
   if(!TEST) return;
   console.log("begin test:");
   var value="ajsiduf,234,3124，34、 、334、 ,323234\
dfsfd\
asdf, 123, ";
    var strs = value2Strs(value);
}());

addLoadEvent(addListener);

