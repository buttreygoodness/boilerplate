goog.provide('AutoMan.ui.components.FactoryEvents.RegistrationError');

goog.require('goog.events.Event');

AutoMan.ui.components.FactoryEvents.RegistrationError = function(parameters, target) {
	goog.base(this, AutoMan.ui.components.FactoryEvents.RegistrationError.getType(), target);

	this.parameters_ = parameters || {};
}

goog.inherits(AutoMan.ui.components.FactoryEvents.RegistrationError, goog.events.Event);

AutoMan.ui.components.FactoryEvents.RegistrationError.getType = function() {
	return 'Registration.Error';
}