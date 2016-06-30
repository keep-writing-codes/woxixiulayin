function Ajax(method, url, async, callback) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Mircrosoft.XMLHTTP");
    }
    xmlhttp.open(method, url, async);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText);  //
        }
    }
}

function $(selector) {
    return document.querySelector(selector);
}

function $$(selectors) {
    return document.querySelector(selectors);
}

function createElement(tag) {
        return document.createElement(tag);
}

function addEvent(ele, type, handler) {
        if (ele.addEventListener) {
            ele.addEventListener(type, handler, false);
        } else if (ele.attachEvent) {
            ele.attachEvent("on" + type, handler);
        } else {
            ele["on" + type] = handler;
        }
}

function removeEvent(ele, type, handler) {
    if (ele.removeEventListener) {
            ele.removeEventListener(type, handler, false);
        } else if (ele.attachEvent) {
            ele.detachEvent("on" + type, handler);
        } else {
            ele["on" + type] = null;
    }
} 

function addLoadEvent (func) {
    var onload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            onload();
            window.onload = func;
        }
    }
}


