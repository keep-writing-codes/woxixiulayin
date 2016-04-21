var container = document.getElementById("container");
var inputdep = document.getElementById("inputDep");
var btncreate = document.getElementById("btnCreate");
var btntraverse = document.getElementById("btntraverse");


//二叉树节点构造函数
function Node (ele) {
    this.value = ele;
    this.leftnode = null;
    this.rightnode = null;
}

//二叉树构造函数
function Tree(root) {
    var node = new Node(root);
    this.root = node; 
}

var nodeQuenue = (function() {
    var q = [];
    q.showCircle = function () {
            if(!q.length) return false;
            //依次显示第一个元素，然后剔除
            //如果第一个元素已经显示了，就设为不显示，剔除队列
            if(q[0].value.className.indexOf("on") != -1) {
                q[0].value.className = "";
                q.shift();
            }
            //显示第一个元素
            addClassName(q[0].value, "on");
            setTimeout(function(){q.showCircle()}, 1500);
            };
    return q;
}());

function addClassName(ele, name) {
    if(!ele.className) {
        ele.className = name;
    } else {
        oldClassNamme = ele.className;
        ele.className = oldClassNamme + " " + name;
    }
}

function createEle (label) {
     var ele = document.createElement(label);
     if(!ele ) return null;
     return ele;
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
 (function addlistener() {
    //生成二叉树的按键事件
    var root = new Node(container); //创建根元素
    btncreate.onclick = function () {
        var text = inputdep.value;
        //检查深度输入的有效性
        if(isNaN(text)) {
            alert("输入数字");
            return;
        }
        createNodeTree(root, parseInt(text));  //根据深度创建二插树
        container.innerHTML = "";
        container.style.display = "block";
        //将二叉树结构转成DOM元素，即将子元素append到父元素中
        tree2Dom(root);
        console.log(root);
        
    };

    btntraverse.onclick = function () {
        preOrder(root);
        nodeQuenue.showCircle();
    }
 }());
