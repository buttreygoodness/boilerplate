goog.provide('AutoMan.sources.Factory');

goog.require('AutoMan.common.patterns.Factory');

/**
 * @class Generates a source.
 *
 * @implements {AutoMan.common.patterns.Factory}
 * 
 * @param {?Object<String, *>} options
 */
AutoMan.sources.Factory = function(options) {
  goog.base(this, options);
};

/**
 * Returns an id based of type.
 *
 * @implements {AutoMan.common.patterns.Factory}
 *
 * @private
 * @param  {!AutoMan.sources.SourceFactoryItemInterface} item
 * @return {?AutoMan.sources.SourceFactoryItemInterface}
 */
AutoMan.sources.Factory.prototype.getItemId_ = function(item) {
  return item.getType();
};

goog.inherits(AutoMan.sources.Factory, AutoMan.common.patterns.Factory);