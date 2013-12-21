goog.provide('AutoMan.sources.Factory');

goog.require('AutoMan.common.AbstractFactory');

/**
 * @class Manages sources.
 *
 * @extends {AutoMan.common.AbstractFactory}
 * 
 * @param {Object=} options
 */
AutoMan.sources.Factory = function(options) {
  goog.base(this, options);
};

goog.inherits(AutoMan.sources.Factory, AutoMan.common.AbstractFactory);