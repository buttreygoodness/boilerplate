/**
 * @namespace AutoMan.ui.components
 */

goog.provide('AutoMan.ui.components');
goog.provide('AutoMan.ui.components.factory');

goog.require('AutoMan.ui.components.Factory');

goog.require('AutoMan.ui.components.Generic');
goog.require('AutoMan.ui.components.Root');
goog.require('AutoMan.ui.components.Image');
goog.require('AutoMan.ui.components.Carousel');

AutoMan.ui.components.factory = new AutoMan.ui.components.Factory();

AutoMan.ui.components.factory.register(AutoMan.ui.components.Generic);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Root);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Image);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Carousel);