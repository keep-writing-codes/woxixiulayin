function $ (id) {
    return document.getElementById(id);
}

function log (str) {
    console.log(str);
}

function Canvas(canvasEle) {
    this.canvas = canvasEle;
    this.width = canvasEle.width;
    this.height = canvasEle.height;
    this.c = canvasEle.getContext("2d");
}

//以xy为原点，调用callback进行绘制，然后顺时针旋转角度angle
Canvas.prototype.rotate = function (x, y, angle, callback) {
    this.c.save();
    this.c.translate(x, y);
    this.c.rotate(angle);
    callback();
    this.c.translate(0, 0);
    this.c.restore();
}
Canvas.prototype.setBackground = function (rgba) {
    this.c.fillStyle = rgba;
    this.c.fillRect(0, 0, this.width, this.height);
}

Canvas.prototype.drawLine = function (x1, y1, x2, y2, width, rgba, linecap) {
    this.c.lineCap = linecap;  //butt,round, square
    this.c.lineWidth = width;
    this.c.strokeStyle = rgba;
    this.c.beginPath();
    this.c.moveTo(x1, y1);
    this.c.lineTo(x2, y2);
    this.c.closePath();
    this.c.stroke();
}

Canvas.prototype.drawCircle = function (x, y, radius, rgba) {
    this.c.beginPath();
    this.c.fillStyle = rgba;
    this.c.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.c.closePath();
    this.c.fill();
}

Canvas.prototype.drawText = function (str, rgba, x, y) {
    this.c.font = "bold 14px Arial";
    this.c.textAlign = "center";
    this.c.textBaseline = "middle";
    this.c.fillStyle = rgba;
    this.c.fillText(str, x, y);
}

function Position (x, y) {
    this.x = x;
    this.y = y;
}

function Entity(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Entity.prototype.addTo = function (world) {
    world.add(this);
}

Entity.prototype.destroy = function () {
    var index = this.world.entites.indexOf(this);
    if (index == -1) return;
    this.world.entites.splice(index, 1);
}


function Star(x, y, radius, color) {
    Entity.call(this, x, y);
    this.radius =radius;
    this.color = color;
}
Star.prototype = Object.create(Entity.prototype);
Star.prototype.constructor = Star;
Star.prototype.show = function () {
    if (!this.world) return false;
    this.canvas.drawCircle(this.x, this.y, this.radius, this.color);
}

function Ship(x, y, angle, energy) {
    Entity.call(this, x, y);
    this.angle = angle || 0;  //围绕star的角度
    this.energy = energy || 100; //默认100%
    this.shape = {
        width: 30,
        length: 70
    };
    this.speed = 5; //速度是每秒多少度(一圈360度)
    this.isstop = true;
    this.powerrate = 1; //每1度耗费百分之多少
    this.chargerate = 3; //每秒充电百分之多
}

Ship.prototype = Object.create(Entity.prototype);
Ship.prototype.constructor = Ship;
//旋转需要更改自身的角度
Ship.prototype.rotate = function (angle) {
    this.angle = this.angle + angle;
};
//每一隔一段时间调用该step函数进行移动
//内部规定如何移动
Ship.prototype.step = function () {
    if (this.energy < 100) {
        this.energy += this.chargerate * this.world.steptiming;
        if (this.energy > 100) {
            this.energy = 100;
        }
    }
    if (this.isstop) return;    //如果停止，则不运动
    var moveAngle = this.speed * this.world.steptiming / 180 * Math.PI;
    this.angle += moveAngle;
    var consume = this.powerrate * this.speed * this.world.steptiming;
    this.energy -= consume;
    if ( this.energy <= 0) {
        this.energy = 0;
        this.enable(false);
    }
};
Ship.prototype.show = function () {
    var halflen = this.shape.length/2;
    var width = this.shape.width;
    var headx = -halflen;
    var heady = -this.star.radius - 50;
    var endx = halflen;
    var endy = -this.star.radius - 50;
    var that = this;
    var statstr = this.id + "号-" + parseInt(this.energy) + "%";
    var drawShip = function() {
        that.canvas.drawCircle(endx,endy,width/2, "blue");
        that.canvas.drawLine(headx, heady, endx, endy, width, "#555", "round");
        that.canvas.drawText(statstr, "#000", 0, endy);
    }
    this.canvas.rotate(this.star.x, this.star.y, this.angle, drawShip);

}
Ship.prototype.attach2Star = function (star) {
    this.star = star;
}
Ship.prototype.enable = function (start) {
    start ? this.isstop = false : this.isstop = true;
}
Ship.prototype.handleCommond = function (data) {
    console.log("ship [" + this.id+"] get data = " + data);
    if (this.id != data.id) return;
    var commmond = data.commond;
    switch (commmond) {
        case "stop":
            this.enable(false);
            break;
        case "destory":
            this.destory();
            break;
        case "start":
            this.enable(true);
        default:
            // statements_def
            break;
    }
}

function Commonder (x, y) {
    Entity.call(this, x, y);
    this.shipUntrustCount = 0;
}

Commonder.prototype = Object.create(Entity.prototype);
Commonder.prototype.constructor = Commonder;
Commonder.prototype.createShip = function (star, angle) {
    if (this.shipUntrustCount >= 4) return false;
    var ship = new Ship(this.world.x, this.world.y , angle);
    ship.addTo(this.world);
    ship.attach2Star(star);
    this.shipUntrustCount++;
    ship.id = this.shipUntrustCount;
    return ship;
}

Commonder.prototype.sendCommond = function (data) {
    if (!this.world.Ship) return;
    var that = this;

    var spreadCmd = function () {
        that.world.Ship.forEach( function(element, index) {
        if (!element.handleCommond) return;
        //模拟丢包率，有30%几率接收不到信息
        if (Math.random() < 0.3) {
            return;
        }
        element.handleCommond(data);
        });
    };
    setTimeout(spreadCmd, 1000); //传播信号需要1s
}

function World (canvas) {
    this.canvas = new Canvas(canvas);
    this.c = this.canvas.c;
    this.entites = [];
    this.steptiming = 0.02; //world内部实体运动的最小间隔时间/秒
    this.showtiming = 0.02;  //world显示美帧的间隔,/秒
}
World.prototype.add = function (entity) {
    entity.world = this;
    entity.canvas = this.canvas;
    this.entites.push(entity);  //加入world.entities数组
    var entityType = entity.constructor.name;
    if (!this[entityType]) {
        this[entityType] = [];
    }
    this[entityType].push(entity); //push到特定类型的数组
}

World.prototype.runStep = function () {
    //对每个有step的物体进行移动
    var ents = this.entites;
        for(var i=0, len=ents.length;i<len;i++) {
            var ent = ents[i];
            if(ent.step) {
                ent.step();
            }
        }
} 

World.prototype.show = function () {
    this.canvas.setBackground("black");//先显示背景
     var ents = this.entites;
     //依次显示world内的实体
        for(var i=0, len=ents.length;i<len;i++) {
            var ent = ents[i];
            if(ent.show) {
                ent.show();
            }
        }
}

World.prototype.enableRun = function (enable) {
    if (enable) {
        var steptimer = setInterval(this.runStep.bind(this), this.steptiming*1000);
        var showtimer = setInterval(this.show.bind(this), this.showtiming*1000); 
    } else {
        clearInterval(steptimer);
        clearInterval(showtimer);
    }
}

function Shipctldiv (id) {
    var div = document.createElement("div");
    div.className = "ship";
    div.setAttribute("index", id);
    var label = document.createElement("label");
    label.innerHTML = id + "号飞船";
    var btnstart = document.createElement("button");
    btnstart.name = "btnstart";
    btnstart.innerHTML = "启动";
    var btnstop = document.createElement("button");
    btnstop.name = "btnstop";
    btnstop.innerHTML = "停止";
    var btndestory = document.createElement("button");
    btndestory.innerHTML = "摧毁";
    btndestory.name = "btndestory";
    div.appendChild(label);
    div.appendChild(btnstart);
    div.appendChild(btnstop);
    div.appendChild(btndestory);
    return div;
}

function main() {
    var container = $("container");
    var monitor = $("monitor");
    var control = $("control");
    var divships = $("ships");
    var btncreate = $("btncreate");
    var divships = $("ships");
    var world = new World(monitor);
    var star = new Star(200,200,100,"blue");
    var commonder = new Commonder(0, 0);
    commonder.addTo(world);
    star.addTo(world);
    commonder.createShip(star, 1);
    world.enableRun(true);
    // var commmond = {
    //     id: 1,
    //     commond: "start"
    // };
    // commonder.sendCommond(commmond);

    // function btnListener (event) {
    // var target = event.target;
    // var index = target.getAttribute("index");
    // switch (target.getAttribute("name")) {
    //     "btnstart": 
    // };

    btncreate.onclick = function (event) {
        var ship = commonder.createShip(star, 0);
        if (!ship) return;
        var shipctldiv = Shipctldiv(ship.id);
        ships.appendChild(shipctldiv);
    }

    //事件委托，在ships div中处理ship的按钮事件
    // divships.onclick = function (event) {
    //     var target = event.target;
    //     if (target != this) return;
    //     var index = target.getAttribute("index");
    //     switch (target.name) {
    //         "btnstart": commonder.send
    //     }
    // }

}

//console.log(navigator.userAgent);  
//如果在jest中会显示”Node.js (darwin; U; rv:v5.3.0)“
function isTestMode() {
    return (navigator.userAgent.indexOf("Node") != -1) ;
}

if (isTestMode()) {
    module.exports = {
        Canvas: Canvas,
        Entity: Entity,
        Star: Star,
        Ship: Ship,
        World: World,
        Commonder: Commonder
    }    
} else {
    main();
}