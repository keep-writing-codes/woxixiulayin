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

function validateInput (id) {
    var hint = $("#h" + id);
        input = $("#i" + id);
        str = input.value,
        flag = false;
    switch (parseInt(id)) {
        case 1:
            flag = /^\w{4,16}$/.test(str.replace(/[\u4e00-\u9fa5]/, 'aa'));
            break;
        case 2:
            flag = /^\S{4,16}$/.test(str);
            break;
        case 3:
            flag = str && str == $("#i2").value;
            break;
        case 4:
            flag = /^([a-zA-Z\d])+([-_.][a-zA-Z\d]+)*@([a-zA-Z\d]+\.)+[a-zA-Z\d]{2,5}$/.test(str);
            break;
        case 5:
            flag = /^[1]\d{10}$/.test(str);
            break;
        default:
            break;
    }

    if (flag) {
        hintText[id-1].ispassed = true;
    } else {
        hintText[id-1].ispassed = false;
    }

    return flag ? "right" : "wrong";
}

function showHint (id, flag) {
    var hint = $("#h" + id);
    var input = $("#i" + id);
    hint.style.display = "table-row";
    hint.textContent = hintText[parseInt(id) - 1][flag];
    if (flag === "hint") {
        hint.style.color = "black";
    } else if (flag === "right") {
        hint.style.color = "green";
        input.style.border = "solid 1px green";
    } else if (flag === "wrong") {
        hint.style.color = "red";
        input.style.border = "solid 1px red";
    } 
}


//添加每个hint初始信息
[].forEach.call($$(".hint"), function (hint, index) {
    hint.innerHTML = hintText[index].hint;
});

//添加获得焦点和失去焦点事件
//因为焦点事件无法冒泡，使用事件委托在捕获阶段不方便，所以给每个input单独添加事件
[].forEach.call($$("input"), function (input, index) {
    var id = input["id"][1],
        hint = $("#h" + id);
    addEvent(input, "focus", function (e) {
        showHint(id, "hint");
    });
    addEvent(input, "blur", function (e) {
        var flag = validateInput(id);
        showHint(id, flag);
    });
});

addEvent($("#submit"), "click", function () {
    var result = [0,1,2,3,4].every(function(id) {
        return hintText[id]["ispassed"];
    });
    if (result) {
        alert("提交成功");
    } else {
        alert("提交失败");
    }
});
}) ();