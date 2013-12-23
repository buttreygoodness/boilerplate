/**
 * @namespace AutoMan.parser.content
 */

goog.provide('AutoMan.parser.content');
goog.provide('AutoMan.parser.content.factory');

goog.require('AutoMan.parser.Factory');

goog.require('AutoMan.parser.content.Html');
goog.require('AutoMan.parser.content.Json');
goog.require('AutoMan.parser.content.Object');

AutoMan.parser.content.factory = new AutoMan.parser.Factory();

AutoMan.parser.content.factory.register(AutoMan.parser.content.Html);
AutoMan.parser.content.factory.register(AutoMan.parser.content.Json);
AutoMan.parser.content.factory.register(AutoMan.parser.content.Object);