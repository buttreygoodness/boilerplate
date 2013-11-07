goog.provide('AutoMan.ui.components.Factory');

/**
 * [Factory description]
 */
AutoMan.ui.components.Factory = function(options) {
	this.registery_ = {};

	this.options_ = options || {};
};

/**
 * Registers a component if its type isnt already registered.
 * 
 * @param  {!AutoMan.ui.components.AbstractComponent} component This is the constructor of the component.
 * @return {!Boolean}	Returns true if registers, false otherwise.
 */
AutoMan.ui.components.Factory.prototype.register = function(component) {
	if(!component.supportedContent) {
		return false;
	}
	
	var supportedContent = component.supportedContent();

	if(this.isRegistered(component)) {
		return false;
	}

	this.registery_[supportedContent] = component;

	return true;
};

/**
 * Removes a component from registry.
 * 
 * @param  {!AutoMan.ui.components.AbstractComponent} component This is the constructor of the component.
 * @return {!Boolean}	Returns true if unregisters, false otherwise.
 */
AutoMan.ui.components.Factory.prototype.unregister = function(component) {
	var supportedContent = component.supportedContent();

	if(this.isRegistered(component)) {
		delete this.registery_[supportedContent];

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
 * Determines if a component is registered.
 * 
 * @param  {!AutoMan.ui.components.AbstractComponent}  component This is the constructor of the component.
 * @return {!Boolean}	True if registered, false otherwise.
 */
AutoMan.ui.components.Factory.prototype.isRegistered = function(component) {
	var supportedContent = component.supportedContent();

	return goog.isDefAndNotNull(this.registery_[supportedContent]);
};

/**
 * Determines if a media type is supported by this factory.
 * 
 * @param  {!String}  type 
 * @return {!Boolean}	True if supported, false if not.
 */
AutoMan.ui.components.Factory.prototype.isTypeSupported = function(type) {
	return goog.isDefAndNotNull(this.registery_[type]);
};

/**
 * Creates a component if its type is registered.
 * 
 * @param  {!String} type
 * @param  {!Object=} options
 * @return {?AutoMan.ui.components.AbstractComponent}
 */
AutoMan.ui.components.Factory.prototype.create = function(type, options) {
	if(!this.isTypeSupported(type)) {
		return;
	}

	return new this.registery_[type](options || {});
};