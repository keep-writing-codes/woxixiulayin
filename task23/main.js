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
    traverseDF: function (callback) {
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
    traverseBF: function (callback) {
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
divTree.prototype.clearflash = function () {
            this.flashqueue = [];
        };
divTree.prototype.flashPush = function (ndoe) {
            if(!node) return false;
            this.flashqueue.push(node);
        };
divTree.prototype.showFlash = function () {
            if(!flashqueue.length) return false;
            //依次显示第一个元素，然后剔除
            //如果第一个元素已经显示了，就设为不显示，剔除队列
            if(flashqueue[0].data.className.indexOf("on") != -1) {
                flashqueue[0].data.className = "";
                flashqueue.shift();
            }
            //显示第一个元素
            addClassName(flashqueue[0].data, "on");
            setTimeout(function(){flashqueue.showFlash()}, 1500);
            };
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
FalshQeue.prototype.movie = function (callback) {
    var len = this._queue.length;
    var recurseFlash = function (index) {
        if (len == idnex) return;   //播放到最后就结束
        callback(this._queue[index]);
        setTimeout(function(){recurseFlash(index + 1)}, this.timeout);
    }
    recurseFlash(0);
}
FalshQeue.prototype.insertFrame = function (frame) {
    this._queue.push(frame);
}
FalshQeue.prototype.clear = function() {
    this._queue = [];
}

function addClassName(ele, name) {
    if(!ele.className) {
        ele.className = name;
    } else {
        oldClassNamme = ele.className;
        if(oldClassNamme.indexOf(name) != -1) return;
        ele.className = oldClassNamme + " " + name;
    }
}

function removeClassName(ele, name) {
    if(!ele.className) return;
    var names = ele.className.split(' ');
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
var btntraverseDF = document.getElementById("btntraverseDF");
var btntraverseBF = document.getElementById("btntraverseBF");

var mydivTree = new divTree(container);
var treeFlash = new FalshQeue(1500);

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

    // btntraverseDF.onclick = function () {
    //     preOrder(root);
    //     nodeQuenue.showCircle();
    // }
 };

function main() {
    addlistener();
}

main();