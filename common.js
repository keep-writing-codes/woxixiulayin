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
            callback(xmlhttp.responseText);  //拉勾网返回的是json数据
        }
    }
}

function $(id) {
    return document.getElementsById(id);
}
