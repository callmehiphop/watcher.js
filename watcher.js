(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.Watcher = factory();
  }

}(this, function() {
  
  'use strict';


  /**
   * Watcher constructor, takes literal object
   * and extends Watcher methods
   *
   * @param {object} data, JSON
   * @return {object} Watcher instance
   */
  var Watcher = function(data) {

    // map of all the handlers associated with a given key
    var handlers = {};


    // original object passed into constructor
    data = data || {};


    // add watcher methods..
    extend(data, {

      /**
       * Just for fun.., retrieves specific item by key name
       * if it doesn't exist, returns false
       *
       * @param {string} key / property name
       * @return {mixed} value or false
       */
      get: function(key) {
        if (key) {
          return this[key];
        }

        return false;
      },


      /**
       * Sets property value of specific item on object, then
       * checks to see if there are any registered callbacks
       * (is this thing being watched?) and fires them if so
       *
       * @param {string} key / property name
       * @param {mixed} value to be set to
       * @return {void}
       */
      set: function(key, value) {
        if (!key || this[key] === value) {
          return;
        }

        this[key] = value;

        forEach(handlers[key], function(handler) {
          if (isFunc(handler)) {
            handler.call(this, value);
          }
        }, this);
      },


      /**
       * Registers handler to be executed when a specific
       * property is changed
       *
       * @param {string} key / property name
       * @param {function} handler
       * @return {void}
       */
      watch: function(key, handler) {
        if (!key || !handler || !isFunc(handler)) {
          return;
        }

        handlers[key] = handlers[key] || [];
        handlers[key].push(handler);
      },


      /**
       * Attemps to remove a registered handler
       *
       * @param {string} key / property currently being watched
       * @param {function} handler to be fired upon change
       * @return {void}
       */
      unwatch: function(key, handler) {
        if (!handler) {
          handlers[key].length = 0;
          return;
        }

        forEach(handlers[key], function(savedHandler, i) {
          if (handler === savedHandler) {
            handlers[key].splice(i, 1);
          }
        });
      }

    });

    
    // start the party!
    return data;

  };





  /**
   * Simple forEach loop
   *
   * @param {array} items to iterate over
   * @param {function} callback to fired per item
   * @param {context} optional context to scope callback with
   * @return {void}
   */
  function forEach(things, callback, context) {
    var length = things ? things.length : 0;
    var i = -1;

    context = context || this;

    while (++i < length) {
      if (callback.call(context, things[i], i) === false) {
        break;
      }
    }
  }


  /**
   * Checks to see if supplied item is indeed a function
   *
   * @param {mixed} hopefully a function!
   * @return {boolean} test results..
   */
  function isFunc(thing) {
    return typeof thing === 'function';
  }


  /**
   * Shallow copy of one object to another
   *
   * @param {object} recieving
   * @param {object} giving
   * @return {object} reciever
   */
  function extend(to, from) {
    var i;

    for (i in from) {
      if (from.hasOwnProperty(i)) {
        to[i] = from[i];
      }
    }

    return to;
  }




  return Watcher;


}));
