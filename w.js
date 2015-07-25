#!/usr/bin/env node

var w = {
  /* Wu wei */
  noop: function() {},
  or: function() {
    var args = Array.prototype.slice.call(arguments);
    args = Array.prototype.concat.apply([], args);
    var token = 0;
    for(var i = 0; i < args.length; i++) {
      token += +!!args[i];
    }
    return !!token;
  },
  and: function() {
    var token = 1;
    var args = Array.prototype.slice.call(arguments);
    args = Array.prototype.concat.apply([], args);
    for(var i = 0; i < args.length; i++) {
      token *= +!!args[i];
    }
    return !!token;
  },
  get: function(haystack, needle, spoon) {
    return haystack[needle] || spoon;
  },
  fi: function() {
    var args = Array.prototype.slice.call(arguments);
    var cond = args.shift();
    w.get(args, +!cond, w.noop).apply(this);
    return w;
  }
};

module.exports = w;
