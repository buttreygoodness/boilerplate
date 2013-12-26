goog.provide('AutoMan.sources.types.Ajax');

goog.require('goog.net.XhrIo');

goog.require('AutoMan.sources.abstract.SourceStrategyInterface');
goog.require('AutoMan.sources.abstract.SourceFactoryItemInterface');

/**
 * @class Provides an ability to query Ajax resources.
 * 
 * @implements {AutoMan.sources.abstract.SourceStrategyInterface}
 * @implements {AutoMan.sources.abstract.SourceFactoryItemInterface}
 * 
 * @param {!AutoMan.common.patterns.Factory} factory
 * @param {?Object<String, *>} options
 */
AutoMan.sources.types.Ajax = function(options) {

  /**
   * instance options.
   *
   * @protected
   * @type {Object<String, *>}
   */
  this.options_ = options || {};
};

AutoMan.common.implementInterface(AutoMan.sources.types.Ajax, AutoMan.sources.abstract.SourceStrategyInterface);
AutoMan.common.implementInterface(AutoMan.sources.types.Ajax, AutoMan.sources.abstract.SourceFactoryItemInterface);

/**
 * Returns 'Ajax'.
 *
 * @implements {SourceFactoryItemInterface}
 * 
 * @static
 * @return {!String}
 */
AutoMan.sources.types.Ajax.getType = function() {
  return 'ajax';
};

/**
 * Fetches an resource(get).
 *
 * @implements {SourceStrategyInterface}
 * 
 * @param  {!Object}   resource
 * @param  {Function(?String)} callback
 */
AutoMan.sources.types.Ajax.prototype.fetch = function(resource, callback) {
  goog.net.XhrIo.send(resource.location, function(event) {
    if(event.target.isSuccess()) {
      return callback(event.target.getResponseText());
    }

    callback(null);
  });
};