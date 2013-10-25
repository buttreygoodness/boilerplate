goog.provide('AutoMan.components.Factory');

/**
 * [Factory description]
 */
AutoMan.components.Factory = function(options) {
	this.registery_ = {};

	this.options_ = options || {};
}

/**
 * Registers a component if its type isnt already registered.
 * 
 * @param  {!AutoMan.components.AbstractComponent} component This is the constructor of the component.
 * @return {!Boolean}	Returns true if registers, false otherwise.
 */
AutoMan.component.Factory.prototype.register = function(component) {
	var supportedContent = component.supportedContent();

	if(this.isRegistered(component)) {
		return false;
	}

	this.registery_[supportedContent] = component;

	return true;
}

/**
 * Removes a component from registry.
 * 
 * @param  {!AutoMan.components.AbstractComponent} component This is the constructor of the component.
 * @return {!Boolean}	Returns true if unregisters, false otherwise.
 */
AutoMan.component.Factory.prototype.unregister = function(component) {
	var supportedContent = component.supportedContent();

	if(this.isRegistered(component)) {
		delete this.registery_[supportedContent];

		return true;
	}
	
	return false;
}

/**
 * Unregisters a component by its type.
 * 
 * @param  {!String} type
 * @return {!Boolean} Returns true if unregisters, false otherwise.
 */
AutoMan.component.Factory.prototype.unregisterType = function(type) {
	if(!this.isTypeSupported(type)) {
		return false;
	}

	return this.unregister(this.registery_['type']);
}

/**
 * Determines if a component is registered.
 * 
 * @param  {!AutoMan.components.AbstractComponent}  component This is the constructor of the component.
 * @return {!Boolean}	True if registered, false otherwise.
 */
AutoMan.component.Factory.prototype.isRegistered = function(component) {
	var supportedContent = component.supportedContent();

	return goog.isdefandnotnull(registery_[supportedContent]);
}

/**
 * Determines if a media type is supported by this factory.
 * 
 * @param  {!String}  type 
 * @return {!Boolean}	True if supported, false if not.
 */
AutoMan.component.Factory.prototype.isTypeSupported = function(type) {
	return goog.isdefandnotnull(this.registery_[type]);
}

/**
 * Creates a component if its type is registered.
 * 
 * @param  {!String} type
 * @param  {!Object=} options
 * @return {?AutoMan.components.AbstractComponent}
 */
AutoMan.component.Factory.prototype.create = function(type, options) {
	if(!this.isTypeSupported(type)) {
		return;
	}

	return new this.registery_[type](options || {});
}