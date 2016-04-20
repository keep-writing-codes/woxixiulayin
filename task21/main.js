var inputtext = document.getElementById("input-text");
var tags = document.getElementById("tags");
var texthobbits = document.getElementById("text-hobbits");
var tagshobbits = document.getElementById("tags-hobbits");
var btnconform = document.getElementById("conform");
var splits = [',','，','、','\n',' ','\\', '\/'];
var splitskey = [188, 108, 220, 191, 192, 32, 9, 13];
var tagsArray = [];
var hobbitsArray = [];

function createSpan(text) {
    if(!text || text == "") return false;
    var span = document.createElement("span");
    var textnode = document.createTextNode(text);
    span.appendChild(textnode);
    addSpanListener(span);
    return span;
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

function appendElements(parent, eles) {
    if(!parent.nodeType || parent.nodeType != 1 ) return false;
    for (var i = 0, len = eles.length; i < len; i++) {
        parent.appendChild(eles[i]);
    }
}


function insertIfNoRepeat(array1, array2) {
    if(!(array1 instanceof Array) || !(array2 instanceof Array)) return false;
    array2.forEach(function(element, index) {
    if(array1.indexOf(element) == -1) {
            array1.push(element);
        }
    });
    return array1;
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

function inputTextListener (event) {
     var key = event.keyCode || window.event.keyCode;
     var text = inputtext.value;
     if(splitskey.indexOf(key) == -1) return;
     var span = createSpan(text);
     if(!span) return false;
     inputtext.value = "";
     parent.innerHTML = "";
     tags.appendChild(span);
     return false;  //阻止默认的按键动作即输入字符
}

function removeEle(ele) {
    if(!ele || ele.nodeType != 1 ) return false;
    ele.parentNode.removeChild(ele);
    return true;
}

function addPrefix(ele, prefix) {
    ele.innerHTML = prefix + " " + ele.innerHTML;
}

function removePrefix(ele, prefix) {
    ele.innerHTML = ele.innerHTML.slice(5);
}


function mouseOverListener () {
    var ele = this;
    if(!ele || ele.nodeType != 1) return false;
    ele.removeAllow = true;
    ele.style.background = "green";
    addPrefix(ele, "点击删除");
}

function mouseOutListener () {
    var ele = this;
    if(!ele || ele.nodeType != 1) return false;
    ele.removeAllow = false;
    ele.style.background = "blue";
    removePrefix(ele, "点击删除");
}

function onClickListener () {
    if(typeof this.removeAllow == "undefined" || !this.removeAllow) return;
    removeEle(this);
}

function addSpanListener (span) {
    span.onmouseover = mouseOverListener;
    span.onmouseout = mouseOutListener;
    span.onclick = onClickListener;
}

function hobbitsListener () {
    var value = texthobbits.value;
    if(value == "") return false;
    texthobbits.value = "";
    var strs = value2Strs(value);
    insertIfNoRepeat(hobbitsArray, strs);
    var hobbitstag = createSpansByArray(hobbitsArray);
    setElechildren(tagshobbits, hobbitstag);
}

function addListener(){
    inputtext.onkeydown = inputTextListener;
    btnconform.onclick = hobbitsListener;
}

function setElechildren(ele, children) {
    ele.innerHTML = "";
    appendElements(ele, children);
}

addListener();
