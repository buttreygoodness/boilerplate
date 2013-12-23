goog.provide('AutoMan.sources.Source');

goog.require('AutoMan.common');
goog.require('AutoMan.sources.SourceStrategyInterface');
goog.require('AutoMan.sources.SourceFactoryItemInterface');

/**
 * @class Provides an ability to query outside sources. 
 * 
 * @implements {AutoMan.sources.SourceStrategyInterface}
 * @implements {AutoMan.sources.SourceFactoryItemInterface}
 * 
 * @param {!AutoMan.common.patterns.Factory} factory
 * @param {?Object<String, *>} options
 */
AutoMan.sources.Source = function(factory, options) {

  /**
   * instance factory.
   *
   * @protected
   * @type {AutoMan.common.patterns.Factory}
   */
  this.factory_ = factory;

  /**
   * instance options.
   *
   * @protected
   * @type {Object<String, *>}
   */
  this.options_ = options || {};
};

AutoMan.common.implementInterface(AutoMan.sources.Source, AutoMan.sources.SourceStrategyInterface);
AutoMan.common.implementInterface(AutoMan.sources.Source, AutoMan.sources.SourceFactoryItemInterface);

/**
 * Returns '*' wildcard.
 *
 * @implements {SourceFactoryItemInterface}
 * 
 * @static
 * @return {!String}
 */
AutoMan.sources.Source.getType = function() {
  return '*';
};

/**
 * Fetches an item.
 *
 * @implements {SourceStrategyInterface}
 * 
 * @param  {!String}   item
 * @param  {Function(?String)} callback
 */
AutoMan.sources.Source.prototype.fetch = function(item, callback) {};