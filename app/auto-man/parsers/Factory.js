goog.provide('AutoMan.parsers.Factory');

goog.require('AutoMan.commmon.AbstractFactory');

/**
 * Parser factory.
 *
 * @extends {AutoMan.common.patterns.Factory}
 * 
 * @param {Object=} options
 */
AutoMan.parsers.Factory = function(options) {
  goog.base(this, options);
};

goog.inherits(AutoMan.parsers.Factory, AutoMan.commmon.AbstractFactory);

/**
 * Implements {AutoMan.common.patterns.Factory#getItemId_}
 * 
 * @param  {!AutoMan.parsers.content.AbstractParser} item
 * @return {!String}
 */
AutoMan.parsers.Factory.prototype.getItemId_ = function(item) {
  return item.getType();
};