goog.provide('AutoMan.collections.Content');

goog.require('goog.structs.TreeNode');

/**
 * @constructor
 * 
 * @extends {goog.structs.TreeNode}
 * 
 * @param {?*} key_Node Key, if one is not provided a guid for this object is used instead.
 * @param {!Object} value Node data.
 */
AutoMan.collections.Content = function(key, value) {
	goog.base(this, key, value);

	this.key_ = this.key_ || goog.getUid(this);
}

goog.inherits(AutoMan.collections.Content, goog.structs.TreeNode);
