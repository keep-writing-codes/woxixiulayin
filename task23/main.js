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
            //深度优先遍历，先遍历下层节点
            for(var i=0,len=currentNode.children.length;i<len;i++) {
                recurse(currentNode.children[i]);
            }
            //然后处理本层节点
            callback(currentNode);
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
                parentNode = node;
            }
        };

        contains.call(this, checkPdata, traversal);

        if (parsentNode && cdata) {
            var childNode = new Node(cdata);
            parsentNode.children.push(childNode);
        }
    }
};

function divTree(data) {
    Tree.call(this, data);
}

divTree.prototype = new Tree(container);
divTree.prototype.constructor = divTree;
divTree.prototype.add = function (pdiv, cdiv, traversal) {
            Tree.prototype.add.call(this, pdiv, cdiv, traversal);
            pdiv.appendChild(cdiv);
        };
divTree.prototype.create = function (depth) {
            var recurseCreate = function (currentNode, depth) {
                if (0 == depth) return null;
                if (1 == depth) return currentNode;
                var childNode = null;
                var newDiv = null;
                currentNode.children = [];
                for(var i=0,len=getRandomInt(3)+1;i<len;i++) {
                    console.log("depth= " + depth + ",i = " + i);
                    newDiv = createRandomDiv();
                    childNode = new Node(newDiv);
                    currentNode.children.push(childNode);
                    currentNode.data.appendChild(newDiv);
                    recurseCreate(currentNode.children[i], depth - 1);
                };
            }
            this.root.data.innerHTML = "";
            recurseCreate(this.root, depth);
        };

//flash动画队列，一次存入需要播放的动作元素
//存入后不需要pop，依次遍历播放就可以
function FalshQeue (timeout) {
    this._queue = [];
    this.timeout = timeout;
}
FalshQeue.prototype.insertFrame = function (frame) {
    this._queue.push(frame);
}

FalshQeue.prototype.movie = function (callback) {
    var len = this._queue.length;
    var that = this;
    var recurseFlash = function (index) {
        if (len == index) return;   //播放到最后就结束
        callback(index);
        setTimeout(function(){recurseFlash(index + 1)}, that.timeout);
    }
    recurseFlash(0);
}
FalshQeue.prototype.clear = function() {
    this._queue = [];
}

function addClassName(ele, name) {
    if(!ele.className) {
        ele.className = name;
    } else {
        oldClassNamme = ele.className;
        if(hasClassName(ele, name)) return;
        ele.className = oldClassNamme + " " + name;
    }
}

function removeClassName(ele, name) {
    if(!ele.className) return;
    if(!hasClassName(ele, name)) return;
    var names = ele.className.split(' ');
    names.forEach( function(element, index) {
        if (name == element) names.pop(name);
    });
    ele.className = names.join(" ");
}

function hasClassName(ele, name) {
    if(!ele.className) return false;
    return (ele.className.indexOf(name) != -1);
}

function createEle (label) {
     var ele = document.createElement(label);
     if(!ele ) return null;
     return ele;
}

function createRandomDiv() {
    var div = createEle("div");
    div.innerHTML = "" + getRandomInt(100);
    return div;
}

var container = document.getElementById("container");
var inputdep = document.getElementById("inputDep");
var btncreate = document.getElementById("btnCreate");
var btntraversalDF = document.getElementById("btntraversalDF");
var btntraversalBF = document.getElementById("btntraversalBF");

var TRAVERSAL = {
    traversalDF: 1,
    traversalBF: 2
}

var mydivTree = new divTree(container);

//定义mydivTree的动画
mydivTree.flash = function (mytraversal) {
    //插入动画队列每点的元素
    var insetAction = function (currentNode) {
        treeFlash.insertFrame(currentNode.data);
    };
    //基于每个队列元素，生成美帧的动作
    var flashAction = function (index) {
        if (treeFlash.length == index) return;
        if (index != 0) {
            var preDiv = treeFlash._queue[index-1];
            removeClassName(preDiv, "on");
        }
        var currentDiv = treeFlash._queue[index];
        addClassName(currentDiv, "on");
    };
    var treeFlash = new FalshQeue(1500);
    //遍历divTree，插入动画队列
    treeFlash.insertFrames = function () {
        switch (mytraversal) {
            case 1:
                mydivTree.traversalDF(insetAction); 
                break;
            case 2:
                mydivTree.traversalBF(insetAction); 
                break;
            default:
                console.log("wrong traversal");
        }
    };
    treeFlash.movie = function () {
        FalshQeue.prototype.movie.call(treeFlash, flashAction);
    }
    return treeFlash;
};


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
        mydivTree.create(depth);
        addClassName(container, "show");

    };

    btntraversalDF.onclick = function () {
        var flash = mydivTree.flash(TRAVERSAL.traversalDF);
        flash.insertFrames();
        flash.movie();
    };

    btntraversalBF.onclick = function () {
        var flash = mydivTree.flash(TRAVERSAL.traversalBF);
        flash.insertFrames();
        flash.movie();
    }
 };

function main() {
    addlistener();
}

main();