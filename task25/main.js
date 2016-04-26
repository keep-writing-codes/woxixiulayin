//二叉树节点构造函数
function Node (data) {
    this.data = data;
    this.children = [];
}

//获得0~n的随机整数
function getRandomInt(n) {

    return Math.round(Math.random() * parseInt(n));
}

//二叉树构造函数
function Tree(data) {
    var node = new Node(data);
    this.root = node;
}


Tree.prototype = {
    constructor: Tree,
    traversalDF: function (callback) {
        //内部放入一个立即执行函数，当地调用traverseDF时，直接执行下面的函数。
        (function recurse(currentNode) {
            if (!currentNode) return false;
            callback(currentNode);
            //深度优先遍历，先遍历下层节点
            for(var i=0,len=currentNode.children.length;i<len;i++) {
                recurse(currentNode.children[i]);
            }
            //然后处理本层节点
        }(this.root));
    },
    traversalBF: function (callback) {
        //数组存储遍历的数据
        var q = [];
        q.push(this.root);
        //currentNode存储当前遍历的节点
        currentNode = q.shift();
        while (currentNode) {
            for(var i=0,len=currentNode.children.length;i<len;i++) {
                //压人子节点
                q.push(currentNode.children[i]);
            }
            //处理当前节点
            callback(currentNode);
            //下一个节点
            currentNode = q.shift();
        }
    },
    contains: function (callback, traversal) {
        traversal.call(this, callback);
    },
    add: function (pdata, cdata, traversal) {
        var parsentNode = null;
        var checkPdata = function (node) {
            if(node.data == pdata) {
                if (!cdata) return;
                parsentNode = node;
                var childNode = new Node(cdata);
                parsentNode.children.push(childNode);
            }
        };

        this.contains(checkPdata, traversal);

    },
    remove: function (pdata, traversal) {
        var removeIfpdata = function (currentNode) {//先找到其父节点
            var children = currentNode.children;
            children.forEach(function (ele, i) {
                if (ele.data == pdata) {
                    ele.data.children = []; //将children置空，取消引用，删除子节点
                    children.splice(i, 1);   //删除当前项
                }
            })
        };
        this.contains(removeIfpdata, traversal);
    }
};

function divTree(depth) {
    var rootDiv = createDiv("根节点");
    removeClassName(rootDiv, "hide");
    addClassName(rootDiv, "show");
    Tree.call(this, rootDiv);
    container.innerHTML = "";
    container.appendChild(rootDiv);
    this.create(depth);
}

divTree.prototype.constructor = divTree;
divTree.prototype.add = function (pdiv, cdiv, traversal) {
    Tree.prototype.add.call(this, pdiv, cdiv, traversal);
    pdiv.appendChild(cdiv);
};
divTree.prototype.remove = function (div, traversal) {
    if (!div || div.tagName != "DIV") {
        console.log('查找的元素不是div');
        return;
    }
    
    Tree.prototype.remove.call(this, div, traversal);   //删除节点
    div.innerHTML = "";
    div.parentNode.removeChild(div);
}
divTree.prototype.findDivsByName = function (name) {
    var destNodes = [];
    var getNodes = function (currentNode) {
        currentDiv = currentNode.data;
        if (hasClassName(currentDiv, name)) {
            console.log(currentDiv);
            console.log(currentDiv.parentNode);
            destNodes.push(currentNode.data);
        }
    };
    Tree.prototype.traversalBF.call(this, getNodes);
    return destNodes;
};
divTree.prototype.findNodes = function (callback) {
    var destNodes = [];
    var getNodes = callback(currentNode);
    Tree.prototype.traversalBF.call(this, getNodes);
    return destNodes;
};
divTree.prototype.findNodeByDiv = function (div) {
    var destNode = null;
    var getNode = function (currentNode) {
        if (currentNode.data == div) destNode = currentNode;
    }
    this.findNodes(getNode);
    return destNode;
}
divTree.prototype.create = function (depth) {
            this.root.children = [];
            var recurseCreate = function (currentNode, depth) {
                if (0 == depth) return null;
                if (1 == depth) return currentNode;
                var childNode = null;
                var currentDiv = currentNode.data;
                var newDiv = null;
                currentNode.children = [];
                currentDiv.firstChild.change2open();
                for(var i=0,len=getRandomInt(3)+1;i<len;i++) {
                    console.log("depth= " + depth + ",i = " + i);
                    newDiv = createDiv();
                    childNode = new Node(newDiv);
                    currentNode.children.push(childNode);
                    currentDiv.appendChild(newDiv);
                    recurseCreate(currentNode.children[i], depth - 1);
                };
            }
            recurseCreate(this.root, depth);
        };
divTree.prototype.reset = function () {
    Tree.prototype.traversalDF.call(this, function (currentNode) {
        if (!currentNode.data) return;
        removeClassName(currentNode.data, "on");
    })
};

//flash动画队列，一次存入需要播放的动作元素
//存入后不需要pop，依次遍历播放就可以
function FlashQueue (timeout) {
    this._queue = [];
    this.timeout = timeout;
    this.isanimating = false;  //是否处于动画播放中,禁止播放到一半又开始播放
    this.frameIndex = 0;  //当前帧所在的位置
    this.timer = null;
}

//插入播放的元素
FlashQueue.prototype.insertFrame = function (frame) {
    this.frameIndex++;
    this._queue.push(frame);
}

FlashQueue.prototype.movie = function (callback, index) {
    var len = this._queue.length;
    this.frameIndex = arguments[1] ? arguments[1] : 0;//默认从0帧开始播放
    this.isanimating = true;
    var that = this;//下面的函数里面用this会指向window,用that传入flashqueue
    var recurseFlash = function () {
        callback();             //index==len也会处理，用于处理所有动画结束的收尾
        if (that.frameIndex >= len)
        {
            that.isanimating = false;
            return;   //播放到最后就结束
        }
        that.frameIndex++;
        that.timer = setTimeout(recurseFlash, that.timeout);
    }
    recurseFlash(0);
};
FlashQueue.prototype.clear = function() {
    this._queue = [];
    this.reset();
};
FlashQueue.prototype.stop = function () {
    this.isanimating = false;
    clearTimeout(this.timer);
};
FlashQueue.prototype.reset = function () {
    this.frameIndex = 0;
    this.stop();
};

//定义divTree的动画
divTree.prototype.flash = function () {
    //插入动画队列每点的元素
    var treeFlash = new FlashQueue(700);
    var insetAction = function (currentNode) {
        treeFlash.insertFrame(currentNode.data);
    };
    //基于每个队列元素，生成每帧的动作
    var flashAction = function () {
        var index = treeFlash.frameIndex;
        if (index != 0) {
            var preDiv = treeFlash._queue[index-1];
            removeClassName(preDiv, "on");
            if(!treeFlash._queue[index]) return;  //当前元素为空就终止
            if (index >= treeFlash._queue.length) return;
        }
        var currentDiv = treeFlash._queue[index];
        addClassName(currentDiv, "on");
    };
    //遍历divTree，插入动画队列
    var divtree = this;
    treeFlash.insertFrames = function (mytraversal) {
        switch (mytraversal) {
            case 1:
                Tree.prototype.traversalDF.call(divtree, insetAction);
                break;
            case 2:
                Tree.prototype.traversalBF.call(divtree, insetAction);
                break;
            default:
                console.log("wrong traversal");
        }
    };
    treeFlash.movie = function () {
        FlashQueue.prototype.movie.call(treeFlash, flashAction);
    }
    return treeFlash;
};

function addClassName(ele, name) {
    if(!ele) return;
    if(!ele.className) {
        ele.className = name;
    } else {
        oldClassNamme = ele.className;
        if(hasClassName(ele, name)) return;
        ele.className = oldClassNamme + " " + name;
    }
}

function removeClassName(ele, name) {
    if(!ele || !ele.className) return;
    if(!hasClassName(ele, name)) return;
    var names = ele.className.split(' ');
    console.log(names);
    names.forEach(function(element, index) {
        if (name == element)   names.splice(index, 1);
    });
    ele.className = names.join(" ");

}

function hasClassName(ele, name) {
    if(!ele.className) return false;
    return (ele.className.indexOf(name) != -1);
}

function replaceClassName(ele, prename, aftname) {
    if(!ele.className) return false;
    removeClassName(ele, prename);
    addClassName(ele, aftname);
}

function reverseName (ele, name1, name2) {
    if(!ele.className) return false;
    if (hasClassName(ele, name1)) {
        replaceClassName(ele, name1, name2);
    } else if (hasClassName(ele, name2)) {
        replaceClassName(ele, name2, name1);
    } else {
        return false;
    }
}
function createEle (label) {
     var ele = document.createElement(label);
     if(!ele ) return null;
     return ele;
}

// function divListener (event) {
//     if (event.target.tagName != "DIV") return;       //tagname返回的是大写标签
//     if (event.currentTarget != event.target) return; //防止事件传递事，多次触发下面的动作，导致div被重新设回去
//     var div = event.target;
//     // console.log(this);  //事件处理函数中，this始终指向currentTarget，事件的捕获和冒泡机制
//     hasClassName(div, "on")?removeClassName(div, "on"):addClassName(div, "on"); //target指向发生事件的元素
// }

function createDiv(text) {
    var text = arguments[0] ? arguments[0] : getRandomInt(100);
    var div = createEle("div");
    var textnode = document.createTextNode(text);
    var label = createEle("label");
    label.change2open = function () {
        label.innerHTML = "+";
        addClassName(label, "open");
    };
    label.change2close = function () {
        label.innerHTML = "-";
        addClassName(label, "close");
    };
    label.onclick = function () {
        if (this != event.target) return;
        var div =this.parentNode;
        children = div.childNodes;
        var flag = div.firstChild.innerHTML;
        div.firstChild.innerHTML = flag == "+" ? "-": "+";
        for(var i=0,len=children.length; i<len;i++) {
            var ele = children[i];
            if(ele.tagName == "DIV") {
                reverseName(ele, "show", "hide");
            }
        }
    }
    var checkbox = createEle("input");
    checkbox.type = "checkbox";
    div.appendChild(label);
    div.appendChild(checkbox);
    div.appendChild(textnode);
    // div.onclick = divListener;  //尽量用上面的，屏蔽浏览器差异
    addClassName(div, "hide");
    return div;
}

function $(id) {
    return document.getElementById(id);
}

var container = $("container");
var inputdep = $("inputDep");
var btncreate = $("btnCreate");
var btntraversalDF = $("btntraversalDF");
var btntraversalBF = $("btntraversalBF");
var btnDelete = $("btnDelete");
var btnAdd = $("btnAdd");
var inputContent = $("inputContent");
var mydivTree = null;
var TRAVERSAL = {
    traversalDF: 1,
    traversalBF: 2
}

//添加监听事件
 function addlistener() {
    //生成二叉树的按键事件
    btncreate.onclick = function () {
        var depth = inputdep.value;
        //检查深度输入的有效性
        if(isNaN(depth) && depth > 10) {
            alert("输入小于10的数字");
            return;
        }
        console.log("depth = " + depth);
        mydivTree = new divTree(depth);
        mydivTree.flash.clear();
        mydivTree.flash.reset();
        mydivTree.create(depth);

    };

    btntraversalDF.onclick = function () {
        var flash = mydivTree.flash();
        mydivTree.reset();
        flash.clear();
        flash.insertFrames(TRAVERSAL.traversalDF);
        flash.movie();
    };

    btntraversalBF.onclick = function () {
        var flash = mydivTree.flash();
        mydivTree.reset();
        flash.clear();
        flash.insertFrames(TRAVERSAL.traversalBF);
        flash.movie();
    };

    btnAdd.onclick = function () {
        var text = inputContent.value;
        divsOn = divTree.prototype.findDivsByName("on");
        if(0 == divsOn.length) {
            alert("请选择节点");
        } else {
            divsOn.forEach(function(ele, i) {
                var childDiv = createDiv(text);
                divTree.prototype.add(ele, childDiv, Tree.prototype.traversalBF);
            })
        }
    };

    btnDelete.onclick = function () {
        var divsOn = divTree.prototype.findDivsByName("on");
        if(0 == divsOn.length) {
            alert("请选择节点");
        } else {
            divsOn.forEach(function(ele, i) {
                divTree.prototype.remove(ele, Tree.prototype.traversalBF);
            })
        }
    }
 }

function main() {
    addlistener();
}

main();