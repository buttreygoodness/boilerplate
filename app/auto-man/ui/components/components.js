goog.provide('AutoMan.ui.components');
goog.provide('AutoMan.ui.components.factory');

goog.require('AutoMan.ui.components.Factory');
goog.require('AutoMan.ui.components.AbstractComponent');

goog.require('AutoMan.ui.components.Anchor');
goog.require('AutoMan.ui.components.Carousel');
goog.require('AutoMan.ui.components.Div');
goog.require('AutoMan.ui.components.Heading');
goog.require('AutoMan.ui.components.Heading2');
goog.require('AutoMan.ui.components.Image');
goog.require('AutoMan.ui.components.LineItem');
goog.require('AutoMan.ui.components.ListOrdered');
goog.require('AutoMan.ui.components.ListUnordered');
goog.require('AutoMan.ui.components.Page');
goog.require('AutoMan.ui.components.Paragraph');
goog.require('AutoMan.ui.components.Section');
goog.require('AutoMan.ui.components.Root');
goog.require('AutoMan.ui.components.Title');
goog.require('AutoMan.ui.components.Script');

AutoMan.ui.components.factory = new AutoMan.ui.components.Factory();

AutoMan.ui.components.factory.register(AutoMan.ui.components.Anchor);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Carousel);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Div);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Heading);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Heading2);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Image);
AutoMan.ui.components.factory.register(AutoMan.ui.components.LineItem);
AutoMan.ui.components.factory.register(AutoMan.ui.components.ListOrdered);
AutoMan.ui.components.factory.register(AutoMan.ui.components.ListUnordered);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Page);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Paragraph);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Section);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Root);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Title);
AutoMan.ui.components.factory.register(AutoMan.ui.components.Script);