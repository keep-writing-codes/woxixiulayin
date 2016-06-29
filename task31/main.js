(function main() {

    var addEvent = function (ele, type, func) {
        console.log(type);
        if (ele.addEventListener) {
            ele.addEventListener(type, func);
        } else if (ele.attachEvent) {
            ele.attachEvent("on"+type, func);
        } else {
            ele["on"+ type]=func;
        }
    };

    var $ = function (selectors) {
        return document.querySelector(selectors);
    }

    var universityInfo = {
        "北京":["北京大学","清华大学","北京科技大学"],
        "上海":["复旦大学","上海交通大学","上海理工大学"],
        "南京":["南京大学","东南大学","南京航空航天大学"]
    };

    addEvent($("#career"), "click", function(e) {
        console.log(e.target);
        if (e.target === $("input[value='student']")) {
            alert("yes");
        }
    });
})();
