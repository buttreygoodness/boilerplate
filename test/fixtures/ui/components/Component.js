goog.provide('AutoMan.test.fixtures.ui.components.Component');

goog.require('AutoMan.ui.components.AbstractComponent');

AutoMan.test.fixtures.ui.components.Component = function(content) {
  goog.base(this, content);
};

goog.inherits(AutoMan.test.fixtures.ui.components.Component, AutoMan.ui.components.AbstractComponent);

AutoMan.test.fixtures.ui.components.Component.supportedContent = function() {
  return 'div';
};

AutoMan.test.fixtures.ui.components.Component.tag = function() {
  return 'div';
};