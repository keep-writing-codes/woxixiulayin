function $(selector){
    return document.querySelector(selector);
}

var input_name = $("#input_name");
var input_check = $("#input_check");
var name_hint = $("#name_hint")


function checkInputName() {
    var str = input_name.value;
    var num = getStrLenth(str);
    if (num == 0) {
        showHint(name_hint, "不能为空");
    } else if (num < 4 || num > 16) {
        showHint(name_hint, "必填，长度为4~16个字符");
    } else {
        showHint(name_hint, "名称格式正确");
    }
}

function showHint(ele, info) {
    if(!ele) return;
    if((typeof info) != "string") return;
    ele.innerHTML = info;
}

function getStrLenth(str){
    var num = 0;
    var arr = str.split("");
    arr.forEach( function(element, index) {
        if(isChineseChar(element)) {
            num += 2;
        } else {
            num++;
        }
    });
    return num;
}

function isChineseChar(char) {
    var reg = /[\u4e00-\u9fa5]/;
    return reg.test(char);
}
console.log($("#content").childNodes)
input_check.onclick = checkInputName;