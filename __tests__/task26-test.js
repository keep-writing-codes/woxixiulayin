function checkProperty(object) {
    for(var p in object){
        expect(p).toBeDefined();
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
    });

    it("check basic constructor funciton", function () {
        expect(entity.x).toBe(100);
        expect(entity.y).toBe(100);
        checkProperty(entity);
    })
});

describe("check World Object", () => {
    var world;
    var World = main.World;
    beforeEach(() => {
        world = new World(document.createElement("canvas"));
    });

    it("check world fatory", () => {
        checkProperty(world);
    });
});

describe('Check Ship Object', () => {
    var ship;
    var world;
    beforeEach(() => {
        world = new World(document.createElement("canvas"));
        ship = new Ship(200, 200, Math.PI/2);
    });

    it("Check Ship factory", () => {
        expect(ship.x).toBe(200);
        expect(ship.y).toBe(200);
        checkProperty(ship);
    });
});