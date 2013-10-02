# watcher.js

> Easily watch for changes on your objects, based on [Object.prototype.watch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/watch)

> Works in IE7+ and requires no additional shims

### Installation

This can be installed via Bower with `bower install watcher.js`.

Alternatively, you can download the [zip](https://github.com/callmehiphop/watcher.js/archive/0.0.2.zip).

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

var stephen = new Person('Stephen', 26);

stephen = new Watcher(stephen);
stephen.greet();
// "Hi! My name is Stephen"
```

Watching for changes is very simple, simply `watch` a specific property and specify a callback to be fired whenever its value changes.
```javascript
stephen.watch('age', function() {
  console.log('Hey ', this.get('name'), ', is it your birthday?');
});

stephen.set('age', 27);
// "Hey Stephen, is it your birthday?"
```

You can add as many watchers to a single property as you'd like
```javascript
stephen.watch('age', function(age) {
  if (age > 39) {
    console.log('Looks like some one is over the hill!');
  }
});

stephen.set('age', 40);
// "Hey, Stephen, is it your birthday?"
// "Looks like some one is over the hill!"
```

Easily remove a single watcher by passing in the handler's reference, or remove all the handlers by passing in just the property name!
```javascript
stephen.unwatch('age');
stephen.set('age', 99);
// *crickets*
```
