goog.provide('AutoMan.tests.fixtures.ui.components');
goog.provide('AutoMan.tests.fixtures.ui.components.factory');

goog.require('AutoMan.ui.components.Factory');

goog.require('AutoMan.tests.fixtures.ui.components.TestComponent');

AutoMan.tests.fixtures.ui.components.factory = new AutoMan.ui.components.Factory();

AutoMan.tests.fixtures.ui.components.factory.register(AutoMan.tests.fixtures.ui.components.TestComponent);