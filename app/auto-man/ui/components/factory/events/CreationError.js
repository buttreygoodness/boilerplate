goog.provide('AutoMan.ui.components.FactoryEvents.CreationError');

goog.require('goog.events.Event');

AutoMan.ui.components.FactoryEvents.CreationError = function(parameters, target) {
  goog.base(this, AutoMan.ui.components.FactoryEvents.CreationError.getType(), target);

  this.parameters_ = parameters || {};
};

goog.inherits(AutoMan.ui.components.FactoryEvents.CreationError, goog.events.Event);

AutoMan.ui.components.FactoryEvents.CreationError.getType = function() {
  return 'Creation.Error';
};