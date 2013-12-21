goog.provide('AutoMan.common.AbstractFactory');

goog.require('goog.object');
goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');

/**
 * @class Provides base factory functionality.
 *
 * @extends {goog.events.EventTarget}
 * 
 * @abstract
 * @param {?Object<string, *>} options
 */
AutoMan.common.AbstractFactory = function(options) {
  goog.base(this);

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

goog.inherits(AutoMan.common.AbstractFactory, goog.events.EventTarget);

/**
 * Events supported by factory.
 * 
 * @enum
 */
AutoMan.common.AbstractFactory.Events = {
  'Registered'          : 'Registration.Success', /** on registration of a new item **/
  'RegistrationError'   : 'Registration.Error', /** on failure to register new item **/
  'Unregisted'          : 'Unregistration.Success', /** on unregistration of an item **/
  'UnregistrationError' : 'Unregistration.Error', /** on failure to unregister an item **/
  'Created'             : 'Creation.Success', /** on creation of new item **/
  'CreationError'       : 'Creation.Error' /** on creation error **/
};

/**
 * Determines how this item should be resolved as a unique key.
 *
 * @abstract
 * @protected
 * @param {!T<>} item    
 * @return {!String}
 */
AutoMan.common.AbstractFactory.prototype.getItemId_ = goog.abstractMethod;

/**
 * Registers an item if not registered.
 * 
 * @param  {!T<>} item
 * @return {!Boolean} success
 */
AutoMan.common.AbstractFactory.prototype.register = function(item) {
  var event = new goog.events.Event(item);

  if(this.isRegistered(item)) {
    this.dispatchEvent(this.Events.RegistrationError, event);

    return false;
  }

  this.registry_[this.getItemId_(item)] = item;

  this.dispatchEvent(this.Events.Registered, event);

  return true;
};

/**
 * Trys to unregister item.
 * 
 * @param  {!T<>} item
 * @return {!Boolean} success
 */
AutoMan.common.AbstractFactory.prototype.unregister = function(item) {
  return this.unregisterId(this.getItemId_(item));
};

/**
 * Trys to unregister item by its id.
 * 
 * @param  {!String} itemId
 * @return {!Boolean} success
 */
AutoMan.common.AbstractFactory.prototype.unregisterId = function(itemId) {
  var event = new goog.events.Event(itemId);

  if(!this.isIdRegistered(itemId)) {
    this.dispatchEvent(this.Events.UnregistrationError, event);

    return false;
  }

  delete this.registry_[itemId];

  this.dispatchEvent(this.Events.Unregisted, event);

  return true;
};

/**
 * Creates an item  by its id. Will append any extra arguments provided to item on creation.
 * 
 * @param  {!String} itemId
 * @param {...*} Any extra arguments to pass.
 * @return {?T<>}
 */
AutoMan.common.AbstractFactory.prototype.create = function(itemId) {
  if(!this.isIdRegistered(itemId)) {
    this.dispatchEvent(this.Events.CreationError, new goog.events.Event(itemId));

    return;
  }

  var itemArguments, newItem, item;

  item = this.registry_[itemId];

  itemArguments = Array.prototype.slice.call(arguments, 1);

  newItem = Object.create(item.prototype);

  item.apply(newItem, itemArguments);

  this.dispatchEvent(this.Events.Created, new goog.events.Event(newItem));

  return newItem;
};

/**
 * Determines if an item is registered,
 * 
 * @param  {!T<>}  item
 * @return {!Boolean}
 */
AutoMan.common.AbstractFactory.prototype.isRegistered = function(item) {
  return this.isIdRegistered(this.getItemId_(item));
};

/**
 * Determined if an items id has been registered.
 * 
 * @param  {!String}  itemId
 * @return {!Boolean}
 */
AutoMan.common.AbstractFactory.prototype.isIdRegistered = function(itemId) {
  return goog.isDefAndNotNull(this.registry_[itemId]);
};

/**
 * Returns a list of registered item Ids;
 * 
 * @return {!Array<String>}
 */
AutoMan.common.AbstractFactory.prototype.getRegisteredItems = function() {
  return goog.object.getkeys(this.registry_);
};

/**
 * Easy 'this' access to events.
 * 
 * @type {Object}
 */
AutoMan.common.AbstractFactory.prototype.Events = AutoMan.common.AbstractFactory.Events;