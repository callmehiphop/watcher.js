var assert = require('assert');
var Watcher = require('./watcher');


// fake "class" for testing purposes
var Person = function(name, age) {
  this.name = name;
  this.age = age;
};

Person.prototype.greet = function() {
  return 'Hi, my name is ' + this.name + '!';
};


// and away we go
describe('Watcher', function() {
  var stephen, counter;
  var increment = function() {
    counter += 1;
  };


  beforeEach(function() {
    stephen = new Watcher(new Person('Stephen', 26));
    counter = 0; 
  });


  it('should maintain the objects original structure', function() {
    assert.equal(stephen.greet(), 'Hi, my name is Stephen!');
  });


  describe('#get()', function() {
    it('should retrieve the value of a supplied key', function() {
      assert.equal(stephen.get('age'), 26);
    });
  });


  describe('#set()', function() {
    it('should assign a value to a property', function() {
      stephen.set('name', 'Steve');
      assert.equal(stephen.get('name'), 'Steve');
      assert.equal(stephen.greet(), 'Hi, my name is Steve!');
    });    
  });


  describe('#watch()', function() {
    it('should fire a callback when a watched value is changed', function() {
      stephen.watch('age', increment);
      stephen.set('age', 27);
      assert.equal(counter, 1);
      stephen.set('age', 28);
      assert.equal(counter, 2);
    });

    it('should not fire a callback when the value does not change', function() {
      stephen.watch('age', increment);
      stephen.set('age', 26);
      assert.equal(counter, 0);
    });

    it('should not fire a callback when a different value changes', function() {
      stephen.watch('age', increment);
      stephen.set('name', 'Steve');
      assert.equal(counter, 0);
    });
  });


  describe('#unwatch()', function() {
    it('should unbind a specified callback', function() {
      stephen.watch('age', increment);
      stephen.set('age', 27);
      stephen.unwatch('age', increment);
      stephen.set('age', 28);
      assert.equal(counter, 1);
    });

    it('should remove all callbacks if a callback was not specified', function() {
      stephen.watch('age', increment);
      stephen.watch('age', function() {
        this.set('name', 'Old Fart');
      });
      stephen.unwatch('age');
      stephen.set('age', 31);
      assert.equal(counter, 0);
      assert.equal(stephen.get('name'), 'Stephen');
    });
  });
  
});