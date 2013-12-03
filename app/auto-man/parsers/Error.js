goog.provide('AutoMan.parsers.Error');

goog.require('AutoMan.common.Error');

/**
 * @extends {AutoMan.common.Error}
 * @param {Object | String} options
 */
AutoMan.parsers.Error = function(options) {
  goog.base(this, options);
};

goog.inherits(AutoMan.parsers.Error, AutoMan.common.Error);