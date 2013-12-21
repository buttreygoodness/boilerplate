goog.provide('AutoMan.sources.Factory');

goog.require('AutoMan.common.Factory');

/**
 * @class Manages sources.
 *
 * @extends {AutoMan.common.Factory}
 * 
 * @param {Object=} options
 */
AutoMan.sources.Factory = function(options) {
  goog.base(this, options);
};

goog.inherits(AutoMan.sources.Factory, goog.common.Factory);