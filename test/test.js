var _ = require('../w');
var assert = require("assert");

describe('noop', function() {
  it('should ... noop! :)', function() {
    var nothing = true; // nothing is true nowadays...
    _.noop();
    assert(nothing);
  });
});
describe('or', function() {
  it('should true any truthy', function() {
    assert.equal(_.or(true), true);
    assert.equal(_.or(1, true, "a"), true);
    assert.equal(_.or([2], {a: 1}), true);
    var asArray = [false, false, false, true, false, false];
    assert.equal(_.or(asArray), true);
  });
  it('should true any falsy', function() {
    assert.equal(_.or(1, true, false), true);
    assert.equal(_.or(true, [], {}, "", false), true);
  });
  it('should false all falsy', function() {
    assert.equal(_.or(false), false);
    assert.equal(_.or(false, NaN), false);
    assert.equal(_.or(false, ""), false);
  });
});

describe('and', function() {
  it('should true all truthy', function() {
    assert.equal(_.and(true), true);
    assert.equal(_.and(1, true, "a"), true);
    assert.equal(_.and([2], {a: 1}), true);
    var asArray = [true, true, true, "very true"];
    assert.equal(_.and(asArray), true);
  });
  it('should false any falsy', function() {
    assert.equal(_.and(1, true, false), false);
    assert.equal(_.and(true, [], {}, "", false), false);
    assert.equal(_.and(true, true, true, false, true), false);
    var asArray = [true, true, false, "very true"];
    assert.equal(_.and(asArray), false);
  });
  it('should false all falsy', function() {
    assert.equal(_.and(false), false);
    assert.equal(_.and(false, NaN), false);
    assert.equal(_.and(false, ""), false);
    var asArray = [false, false, false];
    assert.equal(_.and(asArray), false);
  });
});

describe('si', function() {
  it('should exec then', function() {
    var global = 1;
    var test = 2;
    _.si(test === 2, function(){
      global = 2;
    });
    assert.equal(global, 2);
  });
  it('should not exec if false', function() {
    var global = 1;
    var test = 2;
    _.si(test === 1, function(){
      global = 2;
    });
    assert.equal(global, 1);
  });
  
  it('should exec else', function() {
    var global = 1;
    var test = 2;
    _.si(test === 1, function(){
      global = 2;
    }, function() {
      global = 3;
    });
    assert.equal(global, 3);
  });
  
  it('works with and and or', function() {
      var data = [true, true, true, false, true, true];
      var p = 1;
      _.si(_.and.apply([], data), function() {
          p = 2;
      }, function() {
          var orData = [false, false, false, false, false, true, false];
          _.si(_.or(orData), function() {
              p = 3;
          });
      });
      assert.equal(p, 3);
  });
});

describe('get', function() {
  it('should return array value', function() {
      var p = [14, "q", 23];
      assert.equal(_.get(p, 1), "q");
  });
  it('should return object property', function() {
      var p = { q: 4, r: 9 };
      assert.equal(_.get(p, "q"), 4);
  });
  it('should return fallback value', function() {
      var p = [6, 7, 8];
      assert.equal(_.get(p, 3, "fb"), "fb");
      var q = { r: 5, s: 7 }; 
      assert.equal(_.get(q, "t", 12), 12);
      assert.equal(_.get(q, "a"), undefined);
  });
});
