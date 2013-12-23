/**
 * @namespace AutoMan.parsers.content
 */

goog.provide('AutoMan.parsers.content');
goog.provide('AutoMan.parsers.content.factory');

goog.require('AutoMan.parsers.Factory');

goog.require('AutoMan.parsers.content.Html');
goog.require('AutoMan.parsers.content.Json');
goog.require('AutoMan.parsers.content.Object');

AutoMan.parsers.content.factory = new AutoMan.parsers.Factory();

AutoMan.parsers.content.factory.register(AutoMan.parsers.content.Html);
AutoMan.parsers.content.factory.register(AutoMan.parsers.content.Json);
AutoMan.parsers.content.factory.register(AutoMan.parsers.content.Object);