goog.provide('AutoMan.sources.types.Dom');

goog.require('goog.dom');
goog.require('goog.labs.Promise');

goog.require('AutoMan.common');
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
 * Errors supported by dom source.
 * 
 * @enum {String}
 */
AutoMan.sources.types.Dom.Errors = {
  'ResourceNotFound': 'Unable to locate resource'
};

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
 * @returns {!goog.labs.Promise}
 */
AutoMan.sources.types.Dom.prototype.fetch = function(resource) {
  return new goog.labs.Promise(function(fulfilled, rejected) {
    var element = this.dom_.$(resource.resource);

    if(!element) {
      return rejected(new AutoMan.common.Error(this.Errors.ResourceNotFound));
    }

    fulfilled(this.dom_.getTextContent(element));
  }, this);
};

/**
 * Easy 'this' access to Errors.
 *
 * @alias AutoMan.sources.types.Dom.Errors
 */
AutoMan.sources.types.Dom.prototype.Errors = AutoMan.sources.types.Dom.Errors;