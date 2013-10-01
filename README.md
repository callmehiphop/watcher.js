# watcher.js

> Easily watch for changes on your objects, based on [Object.prototype.watch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/watch)

> Works in IE7+ and requires no additional shims

### Examples

The `Watcher` constructor accepts only 1 argument, an Object. This can be a literal Object or an instance of a custom classish type thing.
```javascript
var Person = function(name, age) {
  this.name = name;
  this.age = age;
};

Person.prototype.greet = function() {
  console.log('Hi! My name is ', this.name);
};

var steve = new Person('Steve', 22);

steve = new Watcher(steve);
steve.greet();
// "Hi! My name is Steve"
```

Watching for changes is very simple, simply `watch` a specific property and specify a callback to be fired whenever its value changes.
```javascript
steve.watch('age', function() {
  console.log('Hey ', this.get('name'), ', is it your birthday?');
});

steve.set('age', 23);
// "Hey Steve, is it your birthday?"
```

You can add as many watchers to a single property as you'd like
```javascript
steve.watch('age', function(age) {
  if (age > 49) {
    console.log('Looks like some one is over the hill!');
  }
});

steve.set('age', 50);
// "Hey, Steve, is it your birthday?"
// "Looks like some one is over the hill!"
```

Easily remove a single watcher by passing in the handler's reference, or remove all the handlers by passing in just the property name!
```javascript
steve.unwatch('age');
steve.set('age', 99);
// *crickets*
```
