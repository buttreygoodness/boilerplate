goog.provide('AutoMan.ui.Builder');

goog.require('goog.events.EventTarget');
goog.require('goog.array');

goog.require('AutoMan.common.Error');

/**
 * @constructor
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
};

goog.inherits(AutoMan.ui.Builder, goog.events.EventTarget);

/**
 * Async Build Content
 */
AutoMan.ui.Builder.prototype.build = function() {
  if(!this.building_) {
    this.building_ = true;

    this.bindEvents_();

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
 */
AutoMan.ui.Builder.prototype.build_ = function() {
  this.dispatchEvent(AutoMan.ui.Builder.EventTypes.BuildStart);

  try {
    this.components_ = this.buildRecursive_(this.content_, this.factory_);

    this.dispatchEvent(AutoMan.ui.Builder.EventTypes.BuildComplete);
  } catch (e) {
    this.dispatchEvent(AutoMan.ui.Builder.EventTypes.BuildError);
  }
};

/**
 * Recursive Build self.
 * 
 * @param  {!AutoMan.collections.Content} content
 * @param  {!AutoMan.ui.components.Factory} factory
 * @param  {?AutoMan.ui.components.AbstractComponent} node
 * @return {!AutoMan.ui.components.AbstractComponent}
 */
AutoMan.ui.Builder.prototype.buildRecursive_ = function(content, factory, node) {
  var self = this;

  var nodeValue = content.getValue();

  var nodeElement = factory.create(nodeValue.type, nodeValue);

  self.assert_(nodeElement);

  if(!node) {
    node = nodeElement;
  } else {
    node.addChild(nodeElement, true);
  }

  content.forEachChild(function(child) {
    self.buildRecursive_(child, factory, nodeElement);
  }.bind(self));

  return node;
};

/**
 * Binds internal events.
 */
AutoMan.ui.Builder.prototype.bindEvents_ = function() {
  this.listenOnce(AutoMan.ui.Builder.EventTypes.BuildComplete, goog.bind(this.handleBuildComplete_, this));
  this.listenOnce(AutoMan.ui.Builder.EventTypes.BuildError, goog.bind(this.handleBuildError_, this));
};

/**
 * Handels Build complete. Unlocks Build.
 */
AutoMan.ui.Builder.prototype.handleBuildComplete_ = function() {
  this.building_ = false;
};

/**
 * Handels Build error. Unlocks Build.
 */
AutoMan.ui.Builder.prototype.handleBuildError_ = function() {
  this.building_ = false;
};

/**
 * Asserts a condition or blows up. 
 * 
 * @param  {!Boolean} condition [description]
 * @return {?this} Used to chain assertions.
 */
AutoMan.ui.Builder.prototype.assert_ = function(condition) {
  if(!condition) {
    throw new AutoMan.common.Error(AutoMan.ui.Builder.Errors.AssertFailed);
  }

  return this;
};

/**
 * Enum of event types for the Buildr function
 *
 * @type {Object}
 */
AutoMan.ui.Builder.EventTypes = {
  'BuildComplete' : 'Build.Complete',
  'BuildError'    : 'Build.Error',
  'BuildStart'    : 'Build.Start'
};

/**
 * Error types.
 * 
 * @type {Object}
 */
AutoMan.ui.Builder.Errors = {
  'AssertFailed' : 'Assert.Failed'
};