goog.provide('AutoMan.sources.Factory');

/**
 * @class Manages sources.
 * 
 * @param {Object=} options
 */
AutoMan.sources.Factory = function(options) {
  this.options_ = options || {};

  this.registry_ = {};
};

/**
 * Registers a source.
 * 
 * @param  {!AutoMan.sources.AbstractSource} source
 * @return {!Boolean} returns true if registers, false otherwise.
 */
AutoMan.sources.Factory.prototype.register = function(source) {
  if (this.isRegistered(source)) {
    return false;
  }

  this.registry_[source.getName()] = source;

  return true;
};

/**
 * Unregisters a source.
 * 
 * @param  {!AutoMan.sources.AbstractSource} source
 * @return {!Boolean} returns true if able to unregister, false otherwise.
 */
AutoMan.sources.Factory.prototype.unregister = function(source) {
  if(this.isRegistered(source)) {
    delete this.registry_[source.getName()];

    return true;
  }

  return false;
};

/**
 * Creates instance of source and returns if exists.
 * 
 * @param  {!String} name
 * @param  {!Object} options
 * @return {?AutoMan.sources.AbstractSource}
 */
AutoMan.sources.Factory.prototype.create = function(name, options) {
  if(this.isNameRegistered(name)) {
    return new this.registry_[name](options);
  }

  return;
};

/**
 * Determines if a source name has been registered.
 * 
 * @param  {!String}  name
 * @return {!Boolean}
 */
AutoMan.sources.Factory.prototype.isNameRegistered = function(name) {
  return goog.isDefAndNotNull(this.registry_[name]);
};

/**
 * Determines if type is registered.
 * 
 * @param  {!AutoMan.sources.AbstractSource}  source
 * @return {!Boolean}
 */
AutoMan.sources.Factory.prototype.isRegistered = function(source) {
  return this.validate_(source) && this.isNameRegistered(source.getName());
};

/**
 * Validates a source.
 * 
 * @param  {!AutoMan.sources.AbstractSource} source
 * @return {!Boolean} True if source is a valid source, otherwise false.
 */
AutoMan.sources.Factory.prototype.validate_ = function(source) {
  return goog.isDefAndNotNull(source.getName);
};