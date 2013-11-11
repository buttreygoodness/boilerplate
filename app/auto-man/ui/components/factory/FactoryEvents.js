goog.provide('AutoMan.ui.components.FactoryEvents');
goog.provide('AutoMan.ui.components.FactoryEvents.types');

goog.require('AutoMan.ui.components.FactoryEvents.CreationError');
goog.require('AutoMan.ui.components.FactoryEvents.UnregistrationError');
goog.require('AutoMan.ui.components.FactoryEvents.RegistrationError');

AutoMan.ui.components.FactoryEvents.types = {
  'CreationError'       : AutoMan.ui.components.FactoryEvents.CreationError.getType(),
  'UnregistrationError' : AutoMan.ui.components.FactoryEvents.UnregistrationError.getType(),
  'RegistrationError'   : AutoMan.ui.components.FactoryEvents.RegistrationError.getType()
};