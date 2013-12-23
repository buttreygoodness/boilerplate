goog.provide('AutoMan.sources.Dom');

goog.require('goog.dom');

goog.require('AutoMan.sources.SourceStrategyInterface');
goog.require('AutoMan.sources.SourceFactoryItemInterface');

/**
 * @class Provides an ability to query dom elements.
 * 
 * @implements {AutoMan.sources.SourceStrategyInterface}
 * @implements {AutoMan.sources.SourceFactoryItemInterface}
 * 
 * @param {!AutoMan.common.patterns.Factory} factory
 * @param {?Object<String, *>} options
 */
AutoMan.sources.Dom = function(options) {

  /**
   * instance options.
   *
   * @protected
   * @type {Object<String, *>}
   */
  this.options_ = options || {};

  /**
   * dom helper to query dom.
   *
   * @protected
   * @type {goog.dom}
   */
  this.dom_ = goog.dom;
};

AutoMan.common.implementInterface(AutoMan.sources.Dom, AutoMan.sources.SourceStrategyInterface);
AutoMan.common.implementInterface(AutoMan.sources.Dom, AutoMan.sources.SourceFactoryItemInterface);

/**
 * Returns 'dom'.
 *
 * @implements {SourceFactoryItemInterface}
 * 
 * @static
 * @return {!String}
 */
AutoMan.sources.Dom.getType = function() {
  return 'dom';
};

/**
 * Fetches an item.
 *
 * @implements {SourceStrategyInterface}
 * 
 * @param  {!String}   item
 * @param  {Function(?String)} callback
 */
AutoMan.sources.Dom.prototype.fetch = function(item, callback) {
  try {
    callback(this.dom_.getTextContent(this.dom_.$(item)));
  } catch(e) {
    callback();
  }
};