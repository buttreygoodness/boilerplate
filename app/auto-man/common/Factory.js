goog.provide('AutoMan.common.Factory');

goog.require('goog.object');
goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');

/**
 * @class Provides base factory functionality.
 *
 * @extends {goog.events.EventTarget}
 *
 * @param {?Object} options
 */
AutoMan.common.Factory = function(options) {
  goog.base(this);

  this.options_ = options || {};

  this.registry_ = {};
};

goog.inherits(AutoMan.common.Factory, goog.events.EventTarget);

/**
 * Events supported by factory.
 * 
 * @enum
 */
AutoMan.common.Factory.Events = {
  'Registered'          : 'Registration.Success', /** on registration of a new item **/
  'RegistrationError'   : 'Registration.Error', /** on failure to register new item **/
  'Unregisted'          : 'Unregistration.Success', /** on unregistration of an item **/
  'UnregistrationError' : 'Unregistration.Error', /** on failure to unregister an item **/
  'Created'             : 'Creation.Success', /** on creation of new item **/
  'CreationError'       : 'Creation.Error' /** on creation error **/
};

/**
 * Registers an item if not registered.
 * 
 * @param  {!Object} item
 * @return {!Boolean} success
 */
AutoMan.common.Factory.prototype.register = function(item) {
  var event = new goog.events.Event(item);

  if(this.isRegistered(item)) {
    this.dispatchEvent(this.Events.RegistrationError, event);

    return false;
  }

  this.registry_[item.getItemId()] = item;

  this.dispatchEvent(this.Events.Registered, event);

  return true;
};

/**
 * Trys to unregister item.
 * 
 * @param  {!Object} item
 * @return {!Boolean} success
 */
AutoMan.common.Factory.prototype.unregister = function(item) {
  return this.unregisterId(item.getItemId());
};

/**
 * Trys to unregister item by its id.
 * 
 * @param  {!String} itemId
 * @return {!Boolean} success
 */
AutoMan.common.Factory.prototype.unregisterId = function(itemId) {
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
 * @return {?Object}
 */
AutoMan.common.Factory.prototype.create = function(itemId) {
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
 * @param  {!Object}  item
 * @return {Boolean}
 */
AutoMan.common.Factory.prototype.isRegistered = function(item) {
  return this.isIdRegistered(item.getItemId(item));
};

/**
 * Determined if an items id has been registered.
 * 
 * @param  {!String}  itemId
 * @return {Boolean}
 */
AutoMan.common.Factory.prototype.isIdRegistered = function(itemId) {
  return goog.isDefAndNotNull(this.registry_[itemId]);
};

/**
 * Returns a list of registered item Ids;
 * 
 * @return {!Array<String>}
 */
AutoMan.common.Factory.prototype.getRegisteredItems = function() {
  return goog.object.getkeys(this.registry_);
};

/**
 * Easy 'this' access to events.
 * 
 * @type {Object}
 */
AutoMan.common.Factory.prototype.Events = AutoMan.common.Factory.Events;