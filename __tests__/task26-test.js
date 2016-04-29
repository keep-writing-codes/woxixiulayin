
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


describe('Entity object', function() {
    var entity;
    beforeEach(function(){
        entity = new Entity(100, 100);
        world = new World(document.createElement("canvas"));
        world.add(entity);
    });

    it("Check Entity factory", function () {
        expect(entity.x).toBe(100);
        expect(entity.y).toBe(100);
        checkProperty(entity);
    });

    it("Check Entity Destroy", () => {
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
        world.add(ship);
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

});