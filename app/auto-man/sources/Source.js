goog.provide('AutoMan.sources.Source');

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

AutoMan.common.implementInterface(AutoMan.sources.Source, AutoMan.sources.abstract.SourceStrategyInterface);
AutoMan.common.implementInterface(AutoMan.sources.Source, AutoMan.sources.abstract.SourceFactoryItemInterface);

/**
 * Source Errors
 * 
 * @enum {String}
 */
AutoMan.sources.Source.Errors = {
  'NoResourceLocation'        : 'No resource location provided.',
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
AutoMan.sources.Source.getType = function() {
  return '*';
};

/**
 * Fetches an item.
 *
 * @implements {SourceStrategyInterface}
 *
 * @throws {AutoMan.sources.Source.Errors.NoResourceType} If a resource type is not provided.
 * @throws {AutoMan.sources.Source.Errors.NoResourceLocation} If a resource path/location is not provided.
 * @throws {AutoMan.sources.Source.Errors.ResourceTypeNotSupported} If a unregistered resource is attempted to be created.
 * 
 * @param  {!Object<String, String>}   item
 * @param  {Function(?String)} callback
 */
AutoMan.sources.Source.prototype.fetch = function(item, callback) {
  try {
    AutoMan.common.assert(item.type, this.Errors.NoResourceType);
    AutoMan.common.assert(item.location, this.Errors.NoResourceLocation);
    AutoMan.common.assert(this.factory_.isIdRegistered(item.type), this.Errors.ResourceTypeNotSupported);
  } catch (error) {
    callback(null, error);
  }

  this.factory_.create(item.type).fetch(item, callback);
};

/**
 * Easy 'this' access to Errors.
 *
 * @alias AutoMan.sources.Source.Errors
 */
AutoMan.sources.Source.prototype.Errors = AutoMan.sources.Source.Errors;