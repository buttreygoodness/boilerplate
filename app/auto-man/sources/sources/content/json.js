goog.provide('AutoMan.sources.content.json');

goog.require('AutoMan.sources.content.AbstractContentSource');

/**
 * @constructor
 * 
 * @param  {String=} content
 * @param  {Options=} options
 */
AutoMan.sources.content.json = function(content, options) {
	this.content_ = content || "";

	this.options_ = options || {};
};

goog.inherits(AutoMan.sources.content.json, AutoMan.sources.content.json);