goog.provide('AutoMan.parser.Error');

goog.require('AutoMan.common.Error');

/**
 * @class Parser error class.
 * 
 * @extends {AutoMan.common.Error}
 * 
 * @param {Object | String} options
 */
AutoMan.parser.Error = function(options) {
  goog.base(this, options);
};

goog.inherits(AutoMan.parser.Error, AutoMan.common.Error);