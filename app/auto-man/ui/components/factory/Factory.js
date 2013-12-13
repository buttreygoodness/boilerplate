goog.provide('AutoMan.ui.components.Factory');

goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');

goog.require('AutoMan.ui.components.FactoryEvents');
goog.require('AutoMan.ui.components.FactoryEvents.types');

/**
 * [Factory description]
 */
AutoMan.ui.components.Factory = function(options) {
  goog.base(this);

  this.registery_ = {};

  this.options_ = options || {};

  this.genericContentType_ = this.options_.genericContentType || AutoMan.ui.components.Factory.GenericContentType;

  this.bindEvents_();
};

goog.inherits(AutoMan.ui.components.Factory, goog.events.EventTarget);

/**
 * Content type that should be treated as a generic type.
 * 
 * @type {String}
 */
AutoMan.ui.components.Factory.GenericContentType = '*';

/**
 * Granular Events.
 * 
 * @type {Object}
 */
AutoMan.ui.components.Factory.GranularEvents = {
  TypeUnsupported: 'Type.Unsupported'
};

/**
 * Registers a component if its type isnt already registered.
 * 
 * @param  {!AutoMan.ui.components.AbstractComponent} component This is the constructor of the component.
 * @return {!Boolean} Returns true if registers, false otherwise.
 */
AutoMan.ui.components.Factory.prototype.register = function(component) {
  if(!component.supportedContent) {
    return false;
  } else if(this.isRegistered(component)) {
    return false;
  }

  this.registery_[component.supportedContent()] = component;

  return true;
};

/**
 * Removes a component from registry.
 * 
 * @param  {!AutoMan.ui.components.AbstractComponent} component This is the constructor of the component.
 * @return {!Boolean} Returns true if unregisters, false otherwise.
 */
AutoMan.ui.components.Factory.prototype.unregister = function(component) {
  if(this.isRegistered(component)) {
    delete this.registery_[component.supportedContent()];

    return true;
  }
  
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

  this.dispatchEvent(new AutoMan.ui.components.FactoryEvents.CreationError({
    granularEventType: AutoMan.ui.components.Factory.GranularEvents.TypeUnsupported,
    type: type,
    content: content
  }, this));
};

/**
 * Binds internal events.
 */
AutoMan.ui.components.Factory.prototype.bindEvents_ = function() {
  this.addEventListener(AutoMan.ui.components.FactoryEvents.types.RegistrationError, goog.bind(this.handleRegistrationError_, this));
  this.addEventListener(AutoMan.ui.components.FactoryEvents.types.UnregistrationError, goog.bind(this.handleUnregistrationError_, this));
  this.addEventListener(AutoMan.ui.components.FactoryEvents.types.CreationError, goog.bind(this.handleCreationError_, this));
};

/*
 * Handle registration errors
 */
AutoMan.ui.components.Factory.prototype.handleRegistrationError_ = function () {};

/*
 * Handle unregistration errors
 */
AutoMan.ui.components.Factory.prototype.handleUnregistrationError_ = function () {};

/*
 * Handle creation errors
 */
AutoMan.ui.components.Factory.prototype.handleCreationError_ = function () {};