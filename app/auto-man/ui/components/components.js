goog.provide('AutoMan.ui.components');

goog.require('AutoMan.ui.components.Factory');
goog.require('AutoMan.ui.components.AbstractComponent');

goog.require('AutoMan.ui.components.Root');
goog.require('AutoMan.ui.components.Paragraph');
goog.require('AutoMan.ui.components.Heading2');
goog.require('AutoMan.ui.components.Section');

AutoMan.ui.components.factory = new AutoMan.ui.components.Factory();

AutoMan.ui.components.factory.register(AutoMan.ui.components.Root);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Paragraph);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Heading2);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Section);