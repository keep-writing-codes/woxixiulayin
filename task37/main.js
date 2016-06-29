(function() {

    function createElement(tag) {
        return document.createElement(tag);
    }

    function $(selectors){
        return document.querySelector(selectors);
    }

    function createTip(title, content) {
        var mask = createElement("div");
        mask.style = "opacity: .3;filter: alpha(opacity=30);background-color: #555;width: 100%;height: 100%;position: fixed;left:0;top:0;z-index: 100;display: block;";
        var tip = createElement("div"),
            head = createElement("h4"),
            p = createElement("p"),
            btn_confirm = createElement("button"),
            btn_cancel = createElement("button");
            con = createElement("div");

            head.innerHTML = title;
            head.style = "background:black;color:white;text-align:center;"
            tip.appendChild(head);

            p.innerHTML = content;
            con.appendChild(p);

            btn_confirm.innerHTML = "确认";
            btn_cancel.innerHTML = "取消";
            btn_style = "float: right;width:4em;height:2em;background:#333;color:#ccc;margin-right:10px;margin-top:120px;";
            btn_cancel.style = btn_style;
            btn_confirm.style = btn_style;
            con.appendChild(btn_cancel);
            con.appendChild(btn_confirm);

            tip.appendChild(con);

            tip.style = "position: fixed; width:400px;height:200px;top:50%;left:50%;margin-left:-200px;margin-top:-100px;border: solid 1px black;background:white;z-index:101;"
            var wrap = createElement("div");
            wrap.appendChild(mask);
            wrap.appendChild(tip);
        return wrap;
    }

    var addEvent = function (ele, type, func) {
        if (ele.addEventListener) {
            ele.addEventListener(type, func);
        } else if (ele.attachEvent) {
            ele.attachEvent("on" + type, func);
        } else {
            ele["on" + type] = func;
        }
    };

    var tip_wrap = createTip("这是标题", "浮出的内容"),
    btn_show = $("#btn-show"),
    btn_confirm = tip_wrap.getElementsByTagName("button")[1],
    btn_cancel = tip_wrap.getElementsByTagName("button")[0];

    console.log(tip_wrap)
    tip_wrap.style.display = "none";
    $("body").appendChild(tip_wrap);
    addEvent(btn_show, "click", function(e) {
        tip_wrap.style.display = "block";
    })

    addEvent(btn_confirm, "click", function (e) {
        tip_wrap.style.display = "none";
        alert("确认");
    })

    addEvent(btn_cancel, "click", function (e) {
        tip_wrap.style.display = "none";
        alert("取消");
    })
})();