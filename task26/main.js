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
    this.speed = 0.3; //初始速度为0，单位为每度每秒
    this.isstop = true;
    this.powerrate = 1; //每0.1度耗费1%
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
    if (this.isstop) return;    //如果停止，则不运动
    var moveDegree = this.speed * this.world.steptiming;
    this.angle += moveDegree;
    var consume = this.powerrate * moveDegree;
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
    var drawShip = function() {
        that.canvas.drawCircle(endx,endy,width/2, "blue");
        that.canvas.drawLine(headx, heady, endx, endy, width, "#555", "round");
    }
    this.canvas.rotate(this.star.x, this.star.y, this.angle, drawShip);

}
Ship.prototype.attach2Star = function (star) {
    this.star = star;
}
Ship.prototype.enable = function (start) {
    start ? this.isstop = false : this.isstop = true;
}
Ship.prototype.handleCommand = function (data) {
    console.log("ship [" + this.id+"] get data = " + data);
}
function World (canvas) {
    this.canvas = new Canvas(canvas);
    this.c = this.canvas.c;
    this.entites = [];
    this.steptiming = 0.01; //world内部实体运动的最小间隔时间/秒
    this.showtiming = 0.01;  //world显示美帧的间隔,/秒
}

function Commander (x, y) {
    Entity.call(this, x, y);
    this.ships = [];
}
Commander.prototype = Object.create(Entity.prototype);
Commander.prototype.constructor = Commander;
Commander.prototype.createShip = function () {
    var ship = new Ship(this.world.x, this.world.y ,0);
    ship.addTo(this.world);
    this.ships.push(ship);
}

Commander.prototype.sendCommand = function (data) {
    if (!this.world.ships) return;
    this.world.ships.forEach( function(element, index) {
        element.handleCommand(data);
    });
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
    entity.id = this[entityType].length;
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

function main() {
    var container = $("container");
    var monitor = $("monitor");
    var control = $("control");
    var world = new World(monitor);

    var star = new Star(200,200,100,"blue");
    var commander = new Commander(0, 0);
    commander.addTo(world);
    star.addTo(world);
    world.canvas.setBackground("black");
    // world.add(star);
    // world.add(ship1);
    // ship1.attach2Star(star);
    // ship1.enable(true);
    world.enableRun(true);
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
        World: World
    }    
} else {
    main();
}
