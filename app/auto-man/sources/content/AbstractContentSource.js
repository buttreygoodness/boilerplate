goog.provide('AutoMan.sources.content.AbstractContentSource');

goog.require('AutoMan.collections.Content');

/**
 * @constructor
 * 
 * @param {!*} source
 * @param {!Object} options
 */
AutoMan.sources.content.AbstractContentSource = function(source, options) {
	this.content_ = source;

	this.options_ = options || {};
};

/**
 * Does the calculations on the provided content and returns a AutoMan.collections.Content object.
 *
 * @return {!AutoMan.collections.Content}
 */
AutoMan.sources.content.AbstractContentSource.prototype.resolve = goog.abstractMethod;