goog.provide('AutoMan.sources.types.Composite');

goog.require('goog.labs.Promise');

goog.require('AutoMan.common');
goog.require('AutoMan.sources.abstract.SourceStrategyInterface');
goog.require('AutoMan.sources.abstract.SourceFactoryItemInterface');

/**
 * @class Provides an ability to query outside sources. 
 * 
 * @implements {AutoMan.sources.abstract.SourceStrategyInterface}
 * @implements {AutoMan.sources.abstract.SourceFactoryItemInterface}
 * 
 * @param {!AutoMan.common.patterns.Factory} factory
 */
AutoMan.sources.types.Composite = function(factory) {

  /**
   * instance factory.
   *
   * @protected
   * @type {AutoMan.common.patterns.Factory}
   */
  this.factory_ = factory;
};

AutoMan.common.implementsInterface(AutoMan.sources.types.Composite, AutoMan.sources.abstract.SourceStrategyInterface);

AutoMan.common.implementsInterface(AutoMan.sources.types.Composite, AutoMan.sources.abstract.SourceFactoryItemInterface);

/**
 * Source Errors
 * 
 * @enum {String}
 */
AutoMan.sources.types.Composite.Errors = {
  'NoResourceresource'        : 'No resource resource provided.',
  'ResourceTypeNotSupported'  : 'Requested source type is not supported.',
  'NoResourceType'            : 'A resource type was not provided.'
};

/**
 * Returns '*' wildcard.
 *
 * @implements {SourceFactoryItemInterface}
 * 
 * @static
 * @return {!String}
 */
AutoMan.sources.types.Composite.getType = function() {
  return '*';
};

/**
 * Fetches an item.
 *
 * @implements {SourceStrategyInterface}
 * 
 * @param  {!Object<String, String>}   item
 * @returns {!goog.labs.Promise}
 */
AutoMan.sources.types.Composite.prototype.fetch = function(item) {
  return new goog.labs.Promise(function(fulfilled, rejected) {
    try {
      AutoMan.common.assert(item.type, this.Errors.NoResourceType);
      AutoMan.common.assert(item.resource, this.Errors.NoResourceresource);
      AutoMan.common.assert(this.factory_.isIdRegistered(item.type), this.Errors.ResourceTypeNotSupported);
    } catch (failedAssertion) {
      rejected(failedAssertion);
    }

    this.factory_.create(item.type).fetch(item).then(fulfilled, rejected);
  }, this);
};

/**
 * Easy 'this' access to Errors.
 *
 * @alias AutoMan.sources.types.Composite.Errors
 */
AutoMan.sources.types.Composite.prototype.Errors = AutoMan.sources.types.Composite.Errors;