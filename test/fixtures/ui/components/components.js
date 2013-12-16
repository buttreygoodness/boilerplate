goog.provide('AutoMan.test.fixtures.ui.components');
goog.provide('AutoMan.test.fixtures.ui.components.factory');

goog.require('AutoMan.ui.components.Factory');

goog.require('AutoMan.test.fixtures.ui.components.Component');

AutoMan.test.fixtures.ui.components.factory = new AutoMan.ui.components.Factory();

AutoMan.test.fixtures.ui.components.factory.register(AutoMan.test.fixtures.ui.components.Component);