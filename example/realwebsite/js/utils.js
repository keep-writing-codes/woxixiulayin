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
         currentli = lis[index],
         time = 4000;

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
        currentli.style.zIndex = "0";
        nextli.style.zIndex = "1";
        nextli.style.animation = "in 1.5s";
        setTimeout(function () {
            nextli.style.animation = "";
            currentli.style.zIndex = "-1";
        }, 2000);
        index = nextindex;
     }

     var timer = setInterval(next, time);

     return {
        ele: dom,
        idnex: index,
        next: next,
        time:timer
     }
}

