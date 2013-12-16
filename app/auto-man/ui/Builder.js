goog.provide('AutoMan.ui.Builder');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.structs.Map');
goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');

goog.require('AutoMan.common.Error');

/**
 * @class Handles content to component building and its lifecycle.
 *
 * @extends {goog.events.EventTarget}
 * 
 * @param {!AutoMan.collections.Content} content
 * @param {!AutoMan.ui.components.Factory} factory
 */
AutoMan.ui.Builder = function(content, factory) {
  goog.base(this);

  this.factory_ = factory;

  this.content_ = content;

  this.building_ = false;

  this.components_ = [];

  this.contentMap_ = {};
};

goog.inherits(AutoMan.ui.Builder, goog.events.EventTarget);

/**
 * Enum of event types for the Buildr function
 *
 * @enum {String}
 */
AutoMan.ui.Builder.Events = {
  'BuildComplete' : 'Build.Complete',
  'BuildError'    : 'Build.Error',
  'BuildStart'    : 'Build.Start'
};

/**
 * Error types.
 *
 * @enum {String}
 */
AutoMan.ui.Builder.Errors = {
  'ElementNodeError' : 'ElementNodeError'
};

/**
 * Async Build Content
 */
AutoMan.ui.Builder.prototype.build = function() {
  if(!this.building_) {
    this.building_ = true;

    this.bindBuildEvents_();

    setTimeout(goog.bind(this.build_, this), 1);
  }
};

/**
 * Returns Buildd component.
 * 
 * @return {?AutoMan.ui.components.Abstractcomponent}
 */
AutoMan.ui.Builder.prototype.getComponents = function() {
  return this.components_;
};

/**
 * Emits events and starts Build.
 *
 * @private
 */
AutoMan.ui.Builder.prototype.build_ = function() {
  this.dispatchEvent(new goog.events.Event(this.Events.BuildStart, this));

  try {
    this.components_ = this.buildRecursive_(this.content_, this.factory_);

    this.dispatchEvent(new goog.events.Event(this.Events.BuildComplete, this));
  } catch (e) {
    this.dispatchEvent(new goog.events.Event(this.Events.BuildError, this));
  }
};

/**
 * Recursive Build self.
 *
 * @private
 * @param  {!AutoMan.collections.Content} content
 * @param  {!AutoMan.ui.components.Factory} factory
 * @param  {?AutoMan.ui.components.AbstractComponent} node
 * @return {!AutoMan.ui.components.AbstractComponent}
 */
AutoMan.ui.Builder.prototype.buildRecursive_ = function(content, factory, node) {
  var elementNode = factory.create(content.getType(), content);

  goog.asserts.assert(elementNode, this.Errors.ElementNodeError);

  this.contentMap_[content.getId()] = elementNode;

  this.bindContentEvents_(content);

  if(!node) {
    node = elementNode;
  } else {
    node.addChild(elementNode, true);
  }

  content.forEachChild(function(child) {
    this.buildRecursive_(child, factory, elementNode);
  }.bind(this));

  return node;
};

/**
 * Binds internal events.
 *
 * @private
 */
AutoMan.ui.Builder.prototype.bindBuildEvents_ = function() {
  this.listenOnce(this.Events.BuildComplete, goog.bind(this.handleBuildComplete_, this));
  this.listenOnce(this.Events.BuildError, goog.bind(this.handleBuildError_, this));
};

/**
 * Handels Build complete. Unlocks Build.
 *
 * @private
 */
AutoMan.ui.Builder.prototype.handleBuildComplete_ = function() {
  this.building_ = false;
};

/**
 * Handels Build error. Unlocks Build.
 *
 * @private
 */
AutoMan.ui.Builder.prototype.handleBuildError_ = function() {
  this.building_ = false;
};


/**
 * Binds all content model based events.
 *
 * @private
 * @param  {!AutoMan.collections.Content} content
 */
AutoMan.ui.Builder.prototype.bindContentEvents_ = function(content) {
  content.getEventTarget().addEventListener(content.Events.ContentAdded, this.handleContentAdd_.bind(this));
  content.getEventTarget().addEventListener(content.Events.ContentMoved, this.handleContentMove_.bind(this));
  content.getEventTarget().addEventListener(content.Events.ContentRemoved, this.handleContentRemove_.bind(this));
};

/**
 * Handles any added content nodes by rebuilding node.
 *
 * @private
 * @param  {!goog.events.Event} e
 */
AutoMan.ui.Builder.prototype.handleContentAdd_ = function(e) {
  this.buildRecursive_(e.target, this.factory_, this.contentMap_[e.target.getParent().getId()]);
};

/**
 * Handles content relocation.
 *
 * @private
 * @param  {!goog.events.Event} e
 */
AutoMan.ui.Builder.prototype.handleContentMove_ = function(e) {
  this.handleContentRemove_(e);

  this.handleContentAdd_(e);
};

/**
 * Handles any removed content by disposing of the component.
 *
 * @private
 * @param  {!goog.events.Event} e
 */
AutoMan.ui.Builder.prototype.handleContentRemove_ = function(e) {
  var id = e.target.getId();

  if(!this.contentMap_[id]) {
    return;
  }

  this.contentMap_[id].dispose();

  delete(this.contentMap_[id]);
};

/**
 * Allows easier 'this' access to error Enum.
 *
 * @type {Object}
 */
AutoMan.ui.Builder.prototype.Errors = AutoMan.ui.Builder.Errors;

/**
 * Allows easier 'this' access to event Enum.
 *
 * @type {Object}
 */
AutoMan.ui.Builder.prototype.Events = AutoMan.ui.Builder.Events;