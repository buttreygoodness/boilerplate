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

goog.inherits(AutoMan.sources.Factory, AutoMan.common.patterns.Factory);

/**
 * Returns an id based of type.
 *
 * @implements {AutoMan.common.patterns.Factory}
 *
 * @private
 * @param  {!AutoMan.sources.abstract.SourceFactoryItemInterface} item
 * @return {?AutoMan.sources.abstract.SourceFactoryItemInterface}
 */
AutoMan.sources.Factory.prototype.getItemId_ = function(item) {
  return item.getType();
};