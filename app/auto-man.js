var module = module || {};

var AutoMan = AutoMan || {};

goog.provide('AutoMan.main');

goog.require('AutoMan.components.AbstractComponent');

AutoMan.main = function () {
  var am = {
    hello: 1,

    sayHello: function () {
      return this.hello;
    }
  };

  return am;
};

module.exports = AutoMan;