function AddFavorite(sURL, sTitle)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}

function SetHome(obj,vrl){
        try{    
            console.log(obj);
                obj.style.behavior='url(#default#homepage)';
                obj.setHomePage(vrl);
        }
        catch(e){
                if(window.netscape) {
                        try {
                                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                        }
                        catch (e) {
                                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
                        }
                        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                        prefs.setCharPref('browser.startup.homepage',vrl);
                 }
        }
}

function $(selector) {
    return document.querySelector(selector);
}

function carousel(dom) {
     var lis = dom.getElementsByTagName("li"),
         len=lis.length,
     //标记当前显示索引
         index = 0,
         time = 5000,
         movingli = lis[0];

     dom.style.position = "relative";
     for(var i=0; i<len; i++){
        lis[i].style.position = "absolute";
        lis[i].style.top = 0;
        //初始化显示顺序,使用负zindex
        lis[i].style.zIndex = String(-i);
     }


     //实际显示过程中使用0和1来表示zindex关系
     function next() {
        var currentli = lis[index],
            nextindex = index + 1 >= len ? 0 : index + 1,
            nextli = lis[nextindex];
        movingli = currentli;
        currentli.style.zIndex = "0";
        nextli.style.zIndex = "1";
        nextli.style.animation = "right-in 1.3s";
        setTimeout(function () {
            nextli.style.animation = "";
            currentli.style.zIndex = "-1";
            nextli.style.left = "0";
        }, 1600);
        index = nextindex;
     }

     function prev() {
        var currentli = lis[index],
            previndex = index - 1 < 0 ? len-1 : index - 1,
            prevli = lis[previndex];
        movingli = currentli;
        currentli.style.zIndex = "1";
        //动画结束后会保持原来的状态，即动画前的位置
        currentli.style.left = "-1000px";
        currentli.style.animation = "left-out 1.3s";
        prevli.style.zIndex = "0";
        setTimeout(function () {
            currentli.style.animation = "";
            currentli.style.zIndex = "-1";
            currentli.style.left = "0";
        }, 1600);
        index = previndex;
     }

     var timer = setInterval(next, time);

     dom.onmouseover = function () {
        enableTimer(false);
     };
     dom.onmouseout = function () {
        enableTimer(true);
     }

     function enableTimer(enable) {
        if (enable == true && timer == null) {
            timer = setInterval(next, time);
        } else if ( enable == false && timer !== null) {
            clearInterval(timer);
            timer = null;
        }
     }


    return {
        ele: dom,
        index: index,
        next: next,
        enableTimer: enableTimer,
        lis: lis,
        prev: prev,
        next: next,
        movingli: movingli
     }
}

