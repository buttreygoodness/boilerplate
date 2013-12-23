goog.provide('AutoMan.parser.Factory');

goog.require('AutoMan.commmon.AbstractFactory');

/**
 * Parser factory.
 *
 * @extends {AutoMan.common.patterns.AbstractFactory}
 * 
 * @param {Object=} options
 */
AutoMan.parser.Factory = function(options) {
  goog.base(this, options);
};

goog.inherits(AutoMan.parser.Factory, AutoMan.commmon.AbstractFactory);

/**
 * Implements {AutoMan.common.patterns.AbstractFactory#getItemId_}
 * 
 * @param  {!AutoMan.parser.content.AbstractParser} item
 * @return {!String}
 */
AutoMan.parser.Factory.prototype.getItemId_ = function(item) {
  return item.getType();
};