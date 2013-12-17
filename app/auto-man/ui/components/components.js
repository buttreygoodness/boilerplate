/**
 * @namespace AutoMan.ui.components
 */

goog.provide('AutoMan.ui.components');
goog.provide('AutoMan.ui.components.factory');

goog.require('AutoMan.ui.components.Factory');
goog.require('AutoMan.ui.components.AbstractComponent');

goog.require('AutoMan.ui.components.Carousel');
goog.require('AutoMan.ui.components.Img');
goog.require('AutoMan.ui.components.Root');
goog.require('AutoMan.ui.components.Generic');

AutoMan.ui.components.factory = new AutoMan.ui.components.Factory();

AutoMan.ui.components.factory.register(AutoMan.ui.components.Carousel);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Img);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Root);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Generic);