goog.provide('AutoMan.sources.content.AbstractContentSource');

goog.require('AutoMan.collections.Content');

/**
 * @constructor
 * 
 * @param {!*} content
 * @param {!Object} options
 */
AutoMan.sources.content.AbstractContentSource = function(content, options) {
	this.content_ = content;

	this.options_ = options || {};
}

/**
 * Does the calculations on the provided content and returns a AutoMan.collections.Content object.
 *
 * @return {!AutoMan.collections.Content}
 */
AutoMan.sources.content.AbstractContentSource.prototype.resolve = goog.abstractMethod;