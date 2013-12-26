goog.provide('AutoMan.sources.types.Dom');

goog.require('goog.dom');

goog.require('AutoMan.sources.abstract.SourceStrategyInterface');
goog.require('AutoMan.sources.abstract.SourceFactoryItemInterface');

/**
 * @class Provides an ability to query dom elements.
 * 
 * @implements {AutoMan.sources.abstract.SourceStrategyInterface}
 * @implements {AutoMan.sources.abstract.SourceFactoryItemInterface}
 * 
 * @param {!AutoMan.common.patterns.Factory} factory
 * @param {?Object<String, *>} options
 */
AutoMan.sources.types.Dom = function(options) {

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

AutoMan.common.implementInterface(AutoMan.sources.types.Dom, AutoMan.sources.abstract.SourceStrategyInterface);
AutoMan.common.implementInterface(AutoMan.sources.types.Dom, AutoMan.sources.abstract.SourceFactoryItemInterface);

/**
 * Returns 'dom'.
 *
 * @implements {SourceFactoryItemInterface}
 * 
 * @static
 * @return {!String}
 */
AutoMan.sources.types.Dom.getType = function() {
  return 'dom';
};

/**
 * Fetches an resource.
 *
 * @implements {SourceStrategyInterface}
 * 
 * @param  {!String}   resource
 * @param  {Function(?String, ?AutoMan.common.Error)} callback
 */
AutoMan.sources.types.Dom.prototype.fetch = function(resource, callback) {
  var element = this.dom_.$(resource.location);

  if(!element) {
    return callback();
  }

  callback(this.dom_.getTextContent(element));
};