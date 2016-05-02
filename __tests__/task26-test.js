
function checkProperty(object) {
    for(var p in object){
        expect(object[p]).toBeDefined();
    }
}

jest.dontMock('../task26/main.js');

var main = require('../task26/main.js')
var Ship = main.Ship;
var World = main.World;
var Entity = main.Entity;
var Star = main.Star;

describe('Entity object', function() {
    var entity;
    beforeEach(function(){
        entity = new Entity(100, 100);
        world = new World(document.createElement("canvas"));
    });

    it("Check Entity factory", function () {
        expect(entity.x).toBe(100);
        expect(entity.y).toBe(100);
        checkProperty(entity);
    });

    it("Check Entity addTo", function () {
        expect(world.entites.length).toBe(0);
        entity.addTo(world);
        expect(world.entites.length).toBe(1);
    });

    it("Check Entity Destroy", () => {
        entity.addTo(world);
        expect(world.entites.length).toBe(1);
        entity.destroy();
        expect(world.entites.length).toBe(0);
    });

});

describe("Check World Object", () => {
    var world;
    var World = main.World;
    beforeEach(() => {
        world = new World(document.createElement("canvas"));
        ship = new Ship(200, 200, Math.PI/2);
    });

    it("check world fatory", () => {
        checkProperty(world);
    });

    it("Check world add", () => {
        expect(world.entites.length).toBe(0);
        world.add(ship);
        expect(world.entites.length).toBe(1);
        expect(world.Ship.length).toBe(1);
    });
});

describe('Check Ship Object', () => {
    var ship;
    var world;
    beforeEach(() => {
        world = new World(document.createElement("canvas"));
        ship = new Ship(200, 200, Math.PI/2);
        star = new Star(200,200,100,"blue");
        world.add(ship);
        ship.attach2Star(star);
    });

    it("Check Ship factory", () => {
        checkProperty(ship);
        expect(ship.x).toBe(200);
        expect(ship.y).toBe(200);
    });

    it("Check Ship Destroy", () => {
        expect(world.entites.length).toBe(1);
        ship.destroy();
        expect(world.entites.length).toBe(0);
    }); 

    it ("Check Ship step", () => {
        ship.speed = 0.2;
        ship.enable(true);
        ship.step();
        expect(ship.isstop).toBe(false);
        expect(ship.angle).toBeCloseTo(1.5747, 0.001);
        expect(ship.energy).toBeLessThan(100);
    });
});