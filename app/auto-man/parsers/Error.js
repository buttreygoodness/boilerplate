goog.provide('AutoMan.parsers.Error');

goog.require('AutoMan.common.Error');

/**
 * @extends {AutoMan.common.Error}
 * @param {[type]} options
 */
AutoMan.parsers.Error = function(options) {
  goog.base(options);
};

goog.inherits(AutoMan.parsers.Error, AutoMan.common.Error);