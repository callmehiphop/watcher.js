# watcher.js

> Easily watch for changes on your objects, based on [Object.prototype.watch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/watch)

### Examples

```javascript
var person = new Watcher({
  name: 'Steve',
  age: 27
});

person.watch('age', function() {
  console.log('Hey ' + this.get('name') + ', is it your birthday?');
});

person.set('age', 28);
// "Hey Steve, is it your birthday?"
```

You can add as many watchers to a single property as you'd like
```javascript
person.watch('age', function() {
  console.log('Is it your birthday?');
});

person.watch('age', function(age) {
  if (age > 49) {
    console.log('Some one is over the hill!');
  }
});

person.set('age', 50);
// "Is it your birthday?"
// "Some one is over the hill!"
```

Easily remove a single watcher by passing in the handler's reference, or remove all the handlers by passing in just the property name!
```javascript
person.unwatch('age');
person.set('age', 99);
// *crickets*
```
