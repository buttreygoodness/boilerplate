goog.provide('AutoMan.ui.components.Factory');

goog.require('goog.events.Event');

goog.require('AutoMan.common.Factory');

/**
 * @class Managages UI components.
 * 
 * @extends {goog.events.EventTarget}
 * 
 * @param {?Options} options
 */
AutoMan.ui.components.Factory = function(options) {
  goog.base(this, options);

  this.genericContentType_ = this.options_.genericContentType || AutoMan.ui.components.Factory.GenericContentType;
};

goog.inherits(AutoMan.ui.components.Factory, AutoMan.common.Factory);

/**
 * Content type that should be treated as a generic type.
 * 
 * @const
 * @type {String}
 */
AutoMan.ui.components.Factory.GenericContentType = '*';


/**
 * Returns a list of supported types. 
 *
 * @alias AutoMan.ui.components.Factory.getRegisteredItems;
 * @return {!Array<String>}
 */
AutoMan.ui.components.Factory.prototype.getSupportedTypes = function() {
  return this.getRegisteredItems();
};

/**
 * Determines if a generic type has been registered.
 * 
 * @return {Boolean}
 */
AutoMan.ui.components.Factory.prototype.isGenericRegistered = function() {
  return this.isIdRegistered(this.GenericContentType);
};

/**
 * Trys to create a component.
 *
 * @override
 * @param  {!String} itemId  [description]
 * @param  {!AutoMan.collections.Content} content
 * @return {?AutoMan.collections.Content}
 */
AutoMan.ui.components.Factory.prototype.create = function(itemId, content) {
  var item, event, eventType;

  if(this.isIdRegistered(itemId)) {
    item = goog.base(this, 'create', itemId, content);
  } else if(this.isGenericRegistered()) {
    item = goog.base(this, 'create', this.GenericContentType, content);
  }

  eventType = item ? this.Events.Created : this.Events.CreationError;

  event = item ? new goog.events.Event(item) :  new goog.events.Event(itemId);
  
  this.dispatchEvent(eventType, event);

  return item;
};

/**
 * Easy 'this' access to generic content type.
 * 
 * @type {String}
 */
AutoMan.ui.components.Factory.prototype.GenericContentType = AutoMan.ui.components.Factory.GenericContentType;