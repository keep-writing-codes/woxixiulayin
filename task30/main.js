(function () {
var hintText = [{hint:"必填，长度为4~16个字符",right:"名称格式正确",wrong:"名称格式错误",ispassed: false},
                {hint:"必填，长度为4~16个字符，包含数字和字母",right:"密码可用",wrong:"密码不可用",ispassed: false},
                {hint:"再输入一次密码",right:"密码输入一致",wrong:"密码输入不一致",ispassed: false},
                {hint:"请输入邮箱",right:"邮箱正确",wrong:"邮箱格式不正确",ispassed: false},
                {hint:"输入手机号",right:"手机格式正确",wrong:"手机格式错误",ispassed: false}];

var doc = document;
//事件添加函数兼容方案
var addEvent = function (element, type, func) {
    if (element.addEventListener) {
        element.addEventListener(type, func, false);
    } else if (element.attchEvent) {
        element.attachEvent("on"+type, func);
    } else {
        element["on"+type] = fun;
    }
}

function $ (id) {
    return doc.querySelector(id);
}

function $$ (id) {
    return doc.querySelectorAll(id);
}
function validateInput (input) {
    var input = document.getElementsByTagName("input")[id],
        hint = document.getElementsByClassName("hint")[id],
        str = input.value,
        flag = false;
    switch (id) {
        case 1:
            // statements_1
            break;
        default:
            // statements_def
            break;
    }

    if (flag) {
        hint.className = "right";
    } else {
        hint.className = "wrong";
    }
}


//添加每个hint初始信息
[].forEach.call($$(".hint"), function (hint, index) {
    hint.innerHTML = hintText[index].hint;
});

//添加获得焦点和失去焦点事件
//因为焦点事件无法冒泡，使用事件委托在捕获阶段不方便，所以给单个input添加事件
[].forEach.call($$("input"), function (input, index) {
    var id = input["id"][1],
        hint = $("#h" + id);
    addEvent(input, "focus", function (e) {
        hint.style.display = "table-row";
    });
});

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

}) ();