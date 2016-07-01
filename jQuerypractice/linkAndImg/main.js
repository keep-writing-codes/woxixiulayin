$(function () {
            var x = 20,
            y = 10;
    $("a.tooltip").mouseover(function (e) {
        this.mytitle = this.title;
        this.title = "";
        var tooltip = "<div id='tooltip'>" + this.mytitle + "</div>";
        $("body").append(tooltip);
        $("#tooltip")
            .css({ //设置位置
                "position": "absolute",
                "left": e.pageX + x + "px",
                "top": e.pageY + y + "px",
                "background": "white"
            })
            .show(fast); //显示元素
        return false; //阻止默认跳转
    }).mouseout(function (e) {
        this.title = this.mytitle;
        $("#tooltip").remove(); //删除元素
    }).mousemove(function (e) {
        $("#tooltip")
            .css({ //重设设置位置
                "left": e.pageX + x + "px",
                "top": e.pageY + y + "px",
            })
    });
})

