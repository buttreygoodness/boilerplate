goog.provide('AutoMan.ui.components.Factory');

goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');

/**
 * @class Managages UI components.
 * 
 * @extends {goog.events.EventTarget}
 * 
 * @param {?Options} options
 */
AutoMan.ui.components.Factory = function(options) {
  goog.base(this);

  this.registery_ = {};

  this.options_ = options || {};

  this.genericContentType_ = this.options_.genericContentType || AutoMan.ui.components.Factory.GenericContentType;
};

goog.inherits(AutoMan.ui.components.Factory, goog.events.EventTarget);

/**
 * Content type that should be treated as a generic type.
 * 
 * @const
 * @type {String}
 */
AutoMan.ui.components.Factory.GenericContentType = '*';

/**
 * Granular Events.
 * 
 * @enum {String}
 */
AutoMan.ui.components.Factory.Events = {
  'Registered'          : 'Registration.Success',
  'RegistrationError'   : 'Registration.Error',
  'Unregisted'          : 'Unregistration.Success',
  'UnregistrationError' : 'Unregistration.Error',
  'CreationError'       : 'Creation.Error'
};

/**
 * Registers a component if its type isnt already registered.
 * 
 * @param  {!AutoMan.ui.components.AbstractComponent} component This is the constructor of the component.
 * @return {!Boolean} Returns true if registers, false otherwise.
 */
AutoMan.ui.components.Factory.prototype.register = function(component) {
  var eventContext = new goog.events.Event({
    component: component
  });

  if(this.isRegistered(component)) {
    this.dispatchEvent(this.Events.RegistrationError, eventContext);

    return false;
  }

  this.registery_[component.supportedContent()] = component;

  this.dispatchEvent(this.Events.Registered, eventContext);

  return true;
};

/**
 * Removes a component from registry.
 * 
 * @param  {!AutoMan.ui.components.AbstractComponent} component This is the constructor of the component.
 * @return {!Boolean} Returns true if unregisters, false otherwise.
 */
AutoMan.ui.components.Factory.prototype.unregister = function(component) {
  var eventContext = new goog.events.Event({
    component: component
  });

  if(this.isRegistered(component)) {
    delete this.registery_[component.supportedContent()];

    this.dispatchEvent(this.Events.Unregisted, eventContext);

    return true;
  }

  this.dispatchEvent(this.Events.UnregistrationError, eventContext);
  
  return false;
};

/**
 * Unregisters a component by its type.
 * 
 * @param  {!String} type
 * @return {!Boolean} Returns true if unregisters, false otherwise.
 */
AutoMan.ui.components.Factory.prototype.unregisterType = function(type) {
  if(!this.isTypeSupported(type)) {
    this.dispatchEvent(this.Events.UnregistrationError, {
      type: type
    });

    return false;
  }

  return this.unregister(this.registery_[type]);
};

/**
 * Returns a list of supported types.
 * 
 * @return {!Array<String>}
 */
AutoMan.ui.components.Factory.prototype.getSupportedTypes = function() {
  return goog.object.getKeys(this.registery_);
};

/**
 * Determines if a component is registered.
 * 
 * @param  {!AutoMan.ui.components.AbstractComponent}  component This is the constructor of the component.
 * @return {!Boolean} True if registered, false otherwise.
 */
AutoMan.ui.components.Factory.prototype.isRegistered = function(component) {
  var supportedContent = component.supportedContent();

  return goog.isDefAndNotNull(this.registery_[supportedContent]);
};

/**
 * Determines if a media type is supported by this factory.
 * 
 * @param  {!String}  type 
 * @return {!Boolean} True if supported, false if not.
 */
AutoMan.ui.components.Factory.prototype.isTypeSupported = function(type) {
  return goog.isDefAndNotNull(this.registery_[type]);
};

/**
 * Determines if a generic type has been registered.
 * 
 * @return {Boolean}
 */
AutoMan.ui.components.Factory.prototype.isGenericRegistered = function() {
  return this.isTypeSupported(this.genericContentType_);
};

/**
 * Creates a component if its type is registered.
 * 
 * @param  {!String} type
 * @param  {!AutoMan.collections.Content} content
 * @return {?AutoMan.ui.components.AbstractComponent}
 */
AutoMan.ui.components.Factory.prototype.create = function(type, content) {
  if(this.isTypeSupported(type)) {
    return new this.registery_[type](content);
  } else if(this.isGenericRegistered()) {
    return new this.registery_[this.genericContentType_](content);
  }

  this.dispatchEvent(new goog.events.Event(this.Events.CreationError, {
    type: type,
    content: content
  }));
};

/**
 * Allows instance scope access to Event types.
 * 
 * @type {!Object}
 */
AutoMan.ui.components.Factory.prototype.Events = AutoMan.ui.components.Factory.Events;