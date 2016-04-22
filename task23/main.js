var container = document.getElementById("container");
var inputdep = document.getElementById("inputDep");
var btncreate = document.getElementById("btnCreate");
var btntraverseDF = document.getElementById("btntraverseDF");
var btntraverseBF = document.getElementById("btntraverseBF");

var mydivTree = new divTree(container);
//二叉树节点构造函数
function Node (data) {
    this.data = data;
    this.children = [];
}

//二叉树构造函数
function Tree(data) {
    var node = new Node(data);
    this.root = node;
}

function getRandomInt(n) {

    return Math.Math.round(Math.random() * parseInt(n));
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
    var flashqueue = [];
}

divTree.prototype = {
    constructor: divTree,
    clearflash: function () {
            flashqueue = [];
        },
    flashPush: function (ndoe) {
            if(!node) return false;
            flashqueue.push(node);
        },
    showFlash: function () {
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
            },
    add: function (pdiv, cdiv, traversal) {
            Tree.prototype.add.call(this, pdiv, cdiv, traversal);
            pdiv.appendChild(cdiv);
        },
    create: function(depth) {
            var recurseCreate = function (root, depth) {
                if (0 == depth) return null;
                if (1 == depth) return root;
                var childNode = null;
                var newDiv = null;
                for(var i=0,len=getRandomInt(4);i<len;i++) {
                    newDiv = createRandomDiv();
                    childNode = new Node(newDiv);
                    root.children.push(childNode);
                    root.data.appendChild(newDiv);
                    recurseCreate(root.children[i], depth - 1);
                }
            return recurseCreate(this.root, depth);
            }
        }
};


function addClassName(ele, name) {
    if(!ele.className) {
        ele.className = name;
    } else {
        oldClassNamme = ele.className;
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
    div.width = getRandomInt(10) + 25 + "px";
    div.height = getRandomInt(10) + 20 + "px";
    div.innerHTML = "" + getRandomInt(100);
    return div;
}

//根据深度创建二叉树
function createNodeTree(root, depth) {
    if(depth == 0) return null;
    if(depth == 1) return root;
    root.leftnode = new Node(createEle("div"));
    root.rightnode = new Node(createEle("div"));
    createNodeTree(root.leftnode, depth - 1);
    createNodeTree(root.rightnode, depth - 1);
}

//二叉树转成具有父子关系的DOM元素
function tree2Dom (root) {
    if(null == root) return false;
    var rootdiv = root.value;
    if(root.leftnode != null) {
        var leftdiv = root.leftnode.value;
        rootdiv.appendChild(leftdiv);
        tree2Dom(root.leftnode);
    }
    if(root.rightnode != null) {
        var rightdiv = root.rightnode.value;
        rootdiv.appendChild(rightdiv);
        tree2Dom(root.rightnode);
    }

 }

//前序遍历
 function preOrder(root) {
    if(null == root) return false;
    nodeQuenue.push(root);
    preOrder(root.leftnode);
    preOrder(root.rightnode);
 }

//添加监听事件
 function addlistener() {
    //生成二叉树的按键事件
    btncreate.onclick = function () {
        var depth = inputdep.value;
        //检查深度输入的有效性
        if(isNaN(depth)) {
            alert("输入数字");
            return;
        }
        console.log("depth = " + depth);
        mydivTree.create(depth);
        console.log(mydivTree);
        addClassName(container, "show");
        console.log(divTree);

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