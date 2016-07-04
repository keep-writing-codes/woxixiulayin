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
});

$(function () {
    var $hilghtlight_tips = $(".highlight_tip span");
    var $btn_prev = $("button.prev");
    var $btn_next = $("button.next");
    var $img_ul = $("div.p_content > ul");
    //总页数
    var page_count = Math.ceil($("div.p_content > ul li").length / 3);
    //当前页码
    var current_page = 1 ;

    $btn_next.click(function () {
        if($img_ul.is(":animated")) return false;
        //如果已到达最后页面
        if (current_page == page_count) {
            current_page = 1;
        } else {
            current_page += 1;
        }
        movePicandTip(current_page);
    });

    $btn_prev.click(function () {
        if($img_ul.is(":animated")) return false;
        //如果到达已最开始页面
        if (current_page == 1) {
            current_page = page_count;
        } else {
            current_page -= 1;
        }
        movePicandTip(current_page);
    });

    $hilghtlight_tips.click(function () {
        current_page = $hilghtlight_tips.index(this) + 1;
        console.log(current_page);
        movePicandTip(current_page);
    });

    var movePicandTip = (function () {
        //闭包，存储page
        var current_page = 1;
        return function (page){
            current_page = page;
            var left = -(current_page - 1) * 504;
            $img_ul.animate({"left":left}, 300);
            //改变指示灯状态
            $hilghtlight_tips.removeClass("current").eq(current_page-1).addClass("current"); 
        }
    })();
});

