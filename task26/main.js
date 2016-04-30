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

function Vector(x, y) {
    if (x == 0 && y == 0) {
        this.x = 0;
        this.y = 0;
        return;
    }
    var len = Math.sqrt(Math.pow(x) + Math.pow(y));
    this.x = x/len;
    this.y = y/len;
}

Entity.prototype.addTo = function (world) {
    this.world = world;
    this.canvas = world.canvas;
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

function Ship(x, y, angle) {
    Entity.call(this, x, y);
    this.angle = angle;  //围绕star的角度
    this.shape = {
        width: 30,
        length: 70
    };
    this.speed = 0;
    this.isstop = true;
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
    this.angle += this.speed;
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

function World (canvas) {
    this.canvas = new Canvas(canvas);
    this.c = this.canvas.c;
    this.entites = [];
}

World.prototype.add = function (entity) {
    entity.addTo(this);
    this.entites.push(entity);  //加入world.entities数组
    var entityType = entity.constructor.name;
    if (!this[entityType]) {
        this[entityType] = [];
    }
    this[entityType].push(entity); //push到特定类型的数组
    entity.id = this[entityType].length;
}

function main() {
    var container = $("container");
    var monitor = $("monitor");
    var control = $("control");
    var world = new World(monitor);

    var star = new Star(200,200,100,"blue");
    var star2 = new Star(300, 300, 30, "yellow");
    var ship1 = new Ship(200, 200, 1.8);
    world.canvas.setBackground("black");
    world.add(star);
    world.add(ship1);
    world.add(star2);
    ship1.attach2Star(star);
    star.show();
    star2.show();
    ship1.show();
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
