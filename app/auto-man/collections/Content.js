goog.provide('AutoMan.collections.Content');

goog.require('goog.structs.TreeNode');
goog.require('goog.events.EventTarget');

/**
 * @constructor
 * 
 * @extends {goog.structs.TreeNode}
 * 
 * @param {?*} key_Node Key, if one is not provided a guid for this object is used instead.
 * @param {!Object} data Node data.
 */
AutoMan.collections.Content = function(id, data) {
  goog.base(this, id, data);

  this.eventTarget_ = new goog.events.EventTarget();

  this.key_ = this.key_ || goog.getUid(this);

  this.value_ = this.value_ || {};

  this.updateData(this.getData(), true);
};

goog.inherits(AutoMan.collections.Content, goog.structs.TreeNode);

/**
 * Returns data node of content. 
 * 
 * @return {!Object}
 */
AutoMan.collections.Content.prototype.getData = function() {
  return this.getValue().data || {};
};

/**
 * Returns type of content.
 * 
 * @return {!String}
 */
AutoMan.collections.Content.prototype.getType = function() {
  return this.getValue().type || '';
};

/**
 * Returns event target used by instance to allow external event binding.
 * 
 * @return {!goog.events.EventTarget}
 */
AutoMan.collections.Content.prototype.getEventTarget = function() {
  return this.eventTarget_;
};

/**
 * Updates internal data.
 * 
 * @param  {!Object} data
 * @param  {?Boolean]} fire Should we fire change events even when data is equivalent?
 */
AutoMan.collections.Content.prototype.updateData = function(data, fire) {
  if(!data) {
    return;
  } else if(data === this.getData() && !fire) {
    return;
  }

  this.value_.data = data;

  this.getEventTarget().dispatchEvent(AutoMan.collections.Content.Events.ContentChange);
};

/**
 * Events Supported by Content.
 * 
 * @type {Object}
 */
AutoMan.collections.Content.Events = {
  'ContentChange': 'Content.Change'
};