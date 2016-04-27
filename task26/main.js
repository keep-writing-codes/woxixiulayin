var $ = function (id) {
    return document.getElementById(id);
}

function Convas(canvasEle) {
    this.convas = canvasEle;
    this.width = canvasEle.width;
    this.height = canvasEle.height;
    this.c = canvasEle.getContext("2d");
}

Convas.prototype.setBackground = function (rgba) {
    this.c.fillStyle = rgba;
    this.c.fillRect(0, 0, this.width, this.height);
}

Convas.prototype.drawCircle = function (x, y, radius, rgba) {
    this.c.beginPath();
    this.c.fillStyle = rgba;
    this.c.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.c.closePath();
    this.c.fill();
}

function main() {
    var container = $("container");
    var monitor = $("monitor");
    var control = $("control");
    var myConvas = new Convas(monitor);
    
    myConvas.setBackground("black");
    myConvas.drawCircle(myConvas.width/2, myConvas.height/2, myConvas.width/4, "blue");

}
main();