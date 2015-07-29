#!/usr/bin/env node

var w = {
  /* Wu wei */
  noop: function() {},
  /* "clone" of lodash _.get */
  get: function(haystack, needle, spoon) {
    return haystack[needle] || spoon;
  },
  /* evaluates at least one expression to be true
   * accepts multiple arguments or array or arrays */
  or: function() {
    var args = Array.prototype.slice.call(arguments);
    args = Array.prototype.concat.apply([], args);
    var token = 0;
    for(var i = 0; i < args.length; i++) {
      token += +!!args[i];
    }
    return !!token;
  },
  /* evaluates every expression to be true
   * accepts multiple arguments or array or arrays */
  and: function() {
    var token = 1;
    var args = Array.prototype.slice.call(arguments);
    args = Array.prototype.concat.apply([], args);
    for(var i = 0; i < args.length; i++) {
      token *= +!!args[i];
    }
    return !!token;
  },
  /* @param {expression} cond condition to be evaluated
   * @param {Function} then callback executed if cond is true
   * @param {Function} else (optional!) executed if cond is false */
  si: function() {
    var args = Array.prototype.slice.call(arguments);
    var cond = args.shift();
    w.get(args, +!cond, w.noop).apply(this);
  }
};

module.exports = w;
