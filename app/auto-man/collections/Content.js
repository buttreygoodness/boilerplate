goog.provide('AutoMan.collections.Content');

goog.require('goog.structs.TreeNode');
goog.require('goog.events.EventTarget');

goog.require('AutoMan.common');

/**
 * @class Content node class that allows for tree like handling of content.
 * 
 * @extends {goog.structs.TreeNode}
 *
 * @param {?Object} content
 */
AutoMan.collections.Content = function(content) {
  var content_ = content || {};

  var id_ = content_.id || AutoMan.common.generateUUID();

  goog.base(this, id_, content_);

  /**
   * Event target bound to content.
   *
   * @private
   * @type {goog.events.EventTarget}
   */
  this.eventTarget_ = new goog.events.EventTarget();

  this.updateData(this.getData());
};

goog.inherits(AutoMan.collections.Content, goog.structs.TreeNode);

/**
 * Events Supported by Content.
 * 
 * @enum {String}
 */
AutoMan.collections.Content.Events = {
  'ContentChange'   : 'Content.Change',
  'ContentAdded'    : 'Content.Added',
  'ContentRemoved'  : 'Content.Removed'
};

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
 * Returns key of node.
 * 
 * @return {!*}
 */
AutoMan.collections.Content.prototype.getId = function() {
  return this.getKey();
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
 */
AutoMan.collections.Content.prototype.updateData = function(data) {
  this.value_.data = data;

  this.dispatchEvent_(new AutoMan.common.Event(this.Events.ContentChange, this));
};

/**
 * Augments super addChildAt to allow notification of listeners.
 *
 * @param {!AutoMan.collections.Content} child
 * @param {!Number} index
 */
AutoMan.collections.Content.prototype.addChildAt = function(child, index) {
  goog.base(this, 'addChildAt', child, index);

  this.dispatchEvent_(new AutoMan.common.Event(this.Events.ContentAdded, this, {child: child}));
};

/**
 * Augments super setParent to allow notifications of listeners.
 *
 * @param {!AutoMan.collections.Content} parent
 */
AutoMan.collections.Content.prototype.setParent = function(parent) {
  var wasOrphan, oldParent;

  wasOrphan = this.isOrphan();

  oldParent = this.getParent();

  goog.base(this, 'setParent', parent);

  if(this.isOrphan()) {
    return this.dispatchEvent_(new AutoMan.common.Event(this.Events.ContentRemoved, this));
  } else if(!wasOrphan) {
    oldParent.removeChild(this);

    parent.addChild(this);
  }
};

/**
 * Determines if this node has a parent.
 *
 * @return {!Boolean}
 */
AutoMan.collections.Content.prototype.isOrphan = function() {
  return !this.getParent();
};

/**
 * Convienence method that just saves on typing.
 *
 * @protected
 * @param  {!goog.events.Event} event
 */
AutoMan.collections.Content.prototype.dispatchEvent_ = function(event) {
  this.getEventTarget().dispatchEvent(event);
};

/**
 * Allows 'this' access to super prototype.
 *
 * @private
 * @alias AutoMan.collections.Content.superClass_
 */
AutoMan.collections.Content.prototype.super_ = AutoMan.collections.Content.superClass_;

/**
 * Allows 'this' access of Events.
 *
 * @alias AutoMan.collections.Content.Events
 */
AutoMan.collections.Content.prototype.Events = AutoMan.collections.Content.Events;