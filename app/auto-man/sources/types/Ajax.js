goog.provide('AutoMan.sources.types.Ajax');

goog.require('goog.net.XhrIo');
goog.require('goog.labs.Promise');

goog.require('AutoMan.common');
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

AutoMan.common.implementsInterface(AutoMan.sources.types.Ajax, AutoMan.sources.abstract.SourceStrategyInterface);

AutoMan.common.implementsInterface(AutoMan.sources.types.Ajax, AutoMan.sources.abstract.SourceFactoryItemInterface);

/**
 * Errors supported by dom source.
 * 
 * @enum {String}
 */
AutoMan.sources.types.Ajax.Errors = {
  'ResourceNotFound': 'Unable to locate resource.'
};

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
 * @returns {!goog.labs.Promise}
 */
AutoMan.sources.types.Ajax.prototype.fetch = function(resource) {
  return new goog.labs.Promise(function(fulfilled, rejected) {
    goog.net.XhrIo.send(resource.resource, function(event) {
      if(!event.target.isSuccess()) {
        return rejected(new AutoMan.common.Error(this.Errors.ResourceNotFound));
      }

      fulfilled(event.target.getResponseText());
    }.bind(this));
  }, this);
};

/**
 * Easy 'this' access to errros.
 * 
 * @alias AutoMan.sources.types.Ajax.Errors
 */
AutoMan.sources.types.Ajax.prototype.Errors = AutoMan.sources.types.Ajax.Errors;