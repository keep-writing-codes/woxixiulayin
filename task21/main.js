var inputtext = document.getElementById("input-text");
var tags = document.getElementById("tags");
var texthobbits = document.getElementById("text-hobbits");
var tagshobbits = document.getElementById("tags-hobbits");
var splits = [',','，','、','\n',' ','\\', '\/'];
var splitskey = [188, 108, 220, 191, 192, 32, 9, 13];
var tagsArray = [];
var bobbitsArray = [];

function createSpan(text) {
    if(!text || text == "") return false;
    var span = document.createElement("span");
    var textnode = document.createTextNode(text);
    span.appendChild(textnode);
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
    if(typeof array1 != "array" || typeof array2 != "array") return false;
    Array.prototype.forEach(array2, function(element, index) {
        if(array1.indexOf(element) == -1) {
            array1.push(element);
        }
    });
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
     // var lastChar = text[text.length-1];
     // if(splits.indexOf(lastChar) == -1) return;
     // var eles = [];
     // var strs = value2Strs(text);
     // console.log(strs);
     // insertIfNoRepeat(tagsArray, strs);
     // eles = createSpansByArray(strs);
     // inputtext.value = "";
     // parent.innerHTML = "";
     // appendElements(tags, eles);
     if(splitskey.indexOf(key) == -1) return;
     var span = createSpan(text);
     inputtext.value = "";
     parent.innerHTML = "";
     tags.appendChild(span);
     return false;  //阻止默认的按键动作即输入字符
}

function addListener(){
    inputtext.onkeydown = inputTextListener;
}

addListener();

