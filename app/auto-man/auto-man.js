/**
 * @namespace AutoMan
 */

goog.provide('AutoMan');
goog.provide('AutoMan.start');

goog.require('AutoMan.boot');
goog.require('AutoMan.ui');

AutoMan.start = function(options) {
  this.options_ = options || {};
};