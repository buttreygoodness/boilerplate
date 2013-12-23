goog.provide('AutoMan.sources.Ajax');

goog.require('goog.net.XhrIo');

goog.require('AutoMan.sources.SourceStrategyInterface');
goog.require('AutoMan.sources.SourceFactoryItemInterface');

/**
 * @class Provides an ability to query Ajax resources.
 * 
 * @implements {AutoMan.sources.SourceStrategyInterface}
 * @implements {AutoMan.sources.SourceFactoryItemInterface}
 * 
 * @param {!AutoMan.common.patterns.Factory} factory
 * @param {?Object<String, *>} options
 */
AutoMan.sources.Ajax = function(options) {

  /**
   * instance options.
   *
   * @protected
   * @type {Object<String, *>}
   */
  this.options_ = options || {};
};

AutoMan.common.implementInterface(AutoMan.sources.Ajax, AutoMan.sources.SourceStrategyInterface);
AutoMan.common.implementInterface(AutoMan.sources.Ajax, AutoMan.sources.SourceFactoryItemInterface);

/**
 * Returns 'Ajax'.
 *
 * @implements {SourceFactoryItemInterface}
 * 
 * @static
 * @return {!String}
 */
AutoMan.sources.Ajax.getType = function() {
  return 'ajax';
};

/**
 * Fetches an resource(get).
 *
 * @implements {SourceStrategyInterface}
 * 
 * @param  {!String}   resource
 * @param  {Function(?String)} callback
 */
AutoMan.sources.Ajax.prototype.fetch = function(resource, callback) {
  goog.net.XhrIo.send(resource, function(event) {
    if(event.target.isSuccess()) {
      return callback(event.target.getResponseText());
    }

    callback(null);
  });
};