var $ = function (id) {
    return document.getElementById(id);
}

function Convas(canvasEle) {
    this.convas = canvasEle;
    this.width = canvasEle.width;
    this.height = canvasEle.height;
    this.c = canvasEle.getContext("2d");
}

Convas.prototype.fillStyle = function (rgba) {
     this.c.fillStyle = rgba;
}

Convas.prototype.fillRect = function (x, y, width, height) {
     this.c.fillRect(x, y, width, height);
}
Convas.prototype.setBackground = function(rgba) {
    this.fillStyle = rgba;
    this.fillRect(0, 0, this.width, this.height);
}

function main() {
    var container = $("container");
    var monitor = $("monitor");
    var control = $("control");
    var myConvas = new Convas(monitor);
    
    myConvas.setBackground("black"); 
}
main();