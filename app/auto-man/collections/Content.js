goog.provide('AutoMan.collections.Content');

goog.require('goog.structs.TreeNode');
goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');

/**
 * @constructor
 * 
 * @extends {goog.structs.TreeNode}
 * 
 * @param {?*} key_Node Key, if one is not provided a guid for this object is used instead.
 * @param {!Object} data Node data.
 */
AutoMan.collections.Content = function(content) {
  var id = goog.getUid(this);

  if(content && goog.isDefAndNotNull(content.id)) {
    id = content.id;
  }

  goog.base(this, id, content || {});

  this.eventTarget_ = new goog.events.EventTarget();

  this.updateData(this.getData(), true);
};

goog.inherits(AutoMan.collections.Content, goog.structs.TreeNode);

/**
 * Events Supported by Content.
 * 
 * @type {Object}
 */
AutoMan.collections.Content.Events = {
  'ContentChange'   : 'Content.Change',
  'ContentAdded'    : 'Content.Added',
  'ContentRemoved'  : 'Content.Removed',
  'ContentMoved'    : 'Content.Moved'
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
 * @param  {?Boolean]} fire Should we fire change events even when data is equivalent?
 */
AutoMan.collections.Content.prototype.updateData = function(data, fire) {
  if(!data) {
    return;
  } else if(data === this.getData() && !fire) {
    return;
  }

  this.value_.data = data;

  this.dispatchEvent_(new goog.events.Event(this.Events.ContentChange, this));
};

/**
 * Augments super addChildAt to allow notification of listeners.
 * 
 * @param {!AutoMan.collections.Content} child
 * @param {!Number} index
 */
AutoMan.collections.Content.prototype.addChildAt = function(child, index) {
  goog.base(this, 'addChildAt', child, index);

  this.dispatchEvent_(new goog.events.Event(this.Events.ContentAdded, child));
};

/**
 * Augments super setParent to allow notifications of listeners.
 * 
 * @param {!AutoMan.collections.Content} parent
 */
AutoMan.collections.Content.prototype.setParent = function(parent) {
  goog.base(this, 'setParent', parent);

  if(this.isOrphan()) {
    this.dispatchEvent_(new goog.events.Event(this.Events.ContentRemoved, this));
  } else {
    this.dispatchEvent_(new goog.events.Event(this.Events.ContentMoved, this));
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
 * @param  {!goog.events.Event} event
 */
AutoMan.collections.Content.prototype.dispatchEvent_ = function(event) {
  this.getEventTarget().dispatchEvent(event);
};

/**
 * Allows 'this' access of Events.
 * 
 * @type {Object}
 */
AutoMan.collections.Content.prototype.Events = AutoMan.collections.Content.Events;