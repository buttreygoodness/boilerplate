goog.provide('AutoMan.common.patterns.Factory');

goog.require('goog.object');

/**
 * @class Provides base factory functionality.
 * 
 * @abstract
 * @param {?Object<string, *>} options
 */
AutoMan.common.patterns.Factory = function(options) {

  /**
   * Any options assigned.
   *
   * @protected
   * @type {Oject<string, *>}
   */
  this.options_ = options || {};

  /**
   * Contains all registered elements.
   * 
   * @type {Object<string, *>}
   */
  this.registry_ = {};
};

/**
 * Determines how this item should be resolved as a unique key.
 *
 * @abstract
 * @protected
 * @param {!constructor} item    
 * @return {!String}
 */
AutoMan.common.patterns.Factory.prototype.getItemId_ = goog.abstractMethod;

/**
 * Registers an item if not registered.
 * 
 * @param  {!constructor} item
 * @return {!Boolean} success
 */
AutoMan.common.patterns.Factory.prototype.register = function(item) {
  if(this.isRegistered(item)) {
    return false;
  }

  this.registry_[this.getItemId_(item)] = item;

  return true;
};

/**
 * Trys to unregister item.
 * 
 * @param  {!constructor} item
 * @return {!Boolean} success
 */
AutoMan.common.patterns.Factory.prototype.unregister = function(item) {
  return this.unregisterId(this.getItemId_(item));
};

/**
 * Trys to unregister item by its id.
 * 
 * @param  {!String} itemId
 * @return {!Boolean} success
 */
AutoMan.common.patterns.Factory.prototype.unregisterId = function(itemId) {
  if(!this.isIdRegistered(itemId)) {
    return false;
  }

  delete this.registry_[itemId];

  return true;
};

/**
 * Creates an item  by its id. Will append any extra arguments provided to item on creation.
 * 
 * @param  {!String} itemId
 * @param {...*} Any extra arguments to pass.
 * @return {?constructor}
 */
AutoMan.common.patterns.Factory.prototype.create = function(itemId) {
  if(!this.isIdRegistered(itemId)) {
    return;
  }

  var itemArguments, newItem, item;

  item = this.registry_[itemId];

  itemArguments = Array.prototype.slice.call(arguments, 1);

  newItem = Object.create(item.prototype);

  item.apply(newItem, itemArguments);

  return newItem;
};

/**
 * Determines if an item is registered,
 * 
 * @param  {!constructor}  item
 * @return {!Boolean}
 */
AutoMan.common.patterns.Factory.prototype.isRegistered = function(item) {
  return this.isIdRegistered(this.getItemId_(item));
};

/**
 * Determined if an items id has been registered.
 * 
 * @param  {!String}  itemId
 * @return {!Boolean}
 */
AutoMan.common.patterns.Factory.prototype.isIdRegistered = function(itemId) {
  return goog.isDefAndNotNull(this.registry_[itemId]);
};

/**
 * Returns a list of registered item Ids;
 * 
 * @return {!Array<String>}
 */
AutoMan.common.patterns.Factory.prototype.getRegisteredItems = function() {
  return goog.object.getKeys(this.registry_);
};