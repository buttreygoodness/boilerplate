goog.provide('AutoMan.ui.components.FactoryEvents.UnregistrationError');

goog.require('goog.events.Event');

AutoMan.ui.components.FactoryEvents.UnregistrationError = function(parameters, target) {
  goog.base(this, AutoMan.ui.components.FactoryEvents.UnregistrationError.getType(), target);

  this.parameters_ = parameters || {};
};

goog.inherits(AutoMan.ui.components.FactoryEvents.UnregistrationError, goog.events.Event);

AutoMan.ui.components.FactoryEvents.UnregistrationError.getType = function() {
  return 'Unregistration.Error';
};