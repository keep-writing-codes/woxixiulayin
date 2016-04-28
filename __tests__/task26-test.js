jest.dontMock('../task26/main.js');

var main = require('../task26/main.js')

describe('Entity object', function() {
    var entity;
    var Entity = main.Entity;
    beforeEach(function(){
        entity = new Entity(100, 100);
    });

    it("check basic constructor funciton", function () {
        expect(entity.x).toBe(100);
        expect(entity.y).toBe(100);
    })
});