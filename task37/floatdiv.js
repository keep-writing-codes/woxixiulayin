function Floatdiv (ele) {
    this.ele = ele;
    this.mask = null;
    this.title = "这是标题";
    this.content = "这是内容";
    this.visibile = false;
    this.animatetime = 600;
    this.init();
}

Floatdiv.prototype = {
    show: function () {
        this.visibile = true;
        this.mask.style.visibility = 'visible';
        this.ele.style.visibility = 'visible';
        this.ele.style.transform = "translate(-50%, -50%) scale(1,1)";
    },

    hide: function () {
        this.visibile = false;
        this.ele.style.transform = "translate(-50%, -50%) scale(0,0)";
        that = this;
        setTimeout(function(){
            that.mask.style.visibility = 'hidden';
        }, that.animatetime);
    },

    init: function () {
        this.mask = createElement("div");
        var mask = this.mask;
        mask.style.width = window.screen.width + "px";
        mask.style.height = window.screen.height + "px";
        mask.style.position = "fixed";
        mask.style.left = "0";
        mask.style.top = "0";
        mask.style.background = 'rgba(100,100,100,0.7)';
        mask.style.visibility = 'hidden';

        var floatdiv = this.ele;
        floatdiv.style.position = "fixed";
        floatdiv.style.left = "50%";
        floatdiv.style.top = "50%";
        floatdiv.style.border = "1px solid black";
        floatdiv.style.transform = "translate(-50%, -50%) scale(0, 0)";
        floatdiv.style.transition = this.animatetime + "ms transform";
        floatdiv.parentNode.removeChild(floatdiv);
        this.mask.appendChild(floatdiv);
        document.body.appendChild(this.mask);

        that = this;
        addEvent(mask, "click" , function(e) {
            if (mask === this) {
                that.hide();
            }
        });

        addEvent(floatdiv, "click", function(e) {
            e.stopPropagation();
        });
    }
};
