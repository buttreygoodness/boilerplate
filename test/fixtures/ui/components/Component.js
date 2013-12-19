goog.provide('AutoMan.test.fixtures.ui.components.Component');

goog.require('AutoMan.ui.components.Generic');

AutoMan.test.fixtures.ui.components.Component = function(content) {
  goog.base(this, content);
};

goog.inherits(AutoMan.test.fixtures.ui.components.Component, AutoMan.ui.components.Generic);

AutoMan.test.fixtures.ui.components.Component.supportedContent = function() {
  return "*";
};