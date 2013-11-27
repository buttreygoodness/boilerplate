goog.provide('AutoMan.tests.fixtures.ui.components.TestComponent');

goog.require('AutoMan.ui.components.AbstractComponent');

AutoMan.tests.fixtures.ui.components.TestComponent = function(options) {
  goog.base(this, options);
};

goog.object.extend(AutoMan.tests.fixtures.ui.components.TestComponent, AutoMan.ui.components.AbstractComponent);

goog.inherits(AutoMan.tests.fixtures.ui.components.TestComponent, AutoMan.ui.components.AbstractComponent);

AutoMan.tests.fixtures.ui.components.TestComponent.supportedContent = function() {
  return 'div';
};

AutoMan.tests.fixtures.ui.components.TestComponent.tag = function() {
  return 'div';
};