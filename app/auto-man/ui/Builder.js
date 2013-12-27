goog.provide('AutoMan.ui.Builder');

goog.require('goog.array');
goog.require('goog.labs.Promise');
goog.require('goog.events.EventTarget');

goog.require('AutoMan.common');

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

  /**
   * Instance Factory
   *
   * @private
   * @type {AutoMan.ui.components.Factory}
   */
  this.factory_ = factory;

  /**
   * Builder content to parse.
   *
   * @private
   * @type {AutoMan.collections.Content}
   */
  this.content_ = content;

  /**
   * Look up table that contains a map of content IDs to Components.
   *
   * @private
   * @type {Object<String, AutoMan.ui.components.AbstractComponent>}
   */
  this.contentMap_ = {};
};

goog.inherits(AutoMan.ui.Builder, goog.events.EventTarget);

/**
 * Enum of event types for the Buildr function
 *
 * @enum {String}
 */
AutoMan.ui.Builder.Events = {
  'BuildError'    : 'Build.Error' /** fires on build fail **/,
};

/**
 * Async Build Content
 */
AutoMan.ui.Builder.prototype.build = function() {
  var components;

  return new goog.labs.Promise(function(fulfilled, rejected) {
    try {
      components = this.build_(this.content_, this.factory_);
    } catch (buildFailed) {
      this.dispatchEvent(new AutoMan.common.Event(this.Events.BuildError, this));

      return rejected(buildFailed);
    }

    fulfilled(components);
  }, this);
};

/**
 * Recursive Build self.
 *
 * @private
 * @param  {!AutoMan.collections.Content} content
 * @param  {!AutoMan.ui.components.Factory} factory
 * @param  {?AutoMan.ui.components.AbstractComponent} node
 */
AutoMan.ui.Builder.prototype.build_ = function(content, factory, node) {
  var elementNode = factory.create(content.getType(), content);

  this.contentMap_[content.getId()] = elementNode;

  this.bindContentEvents_(content);

  if(node) {
    node.addChild(elementNode, true);
  } else {
    node = elementNode;
  }

  content.forEachChild(function(child) {
    this.build_(child, factory, elementNode);
  }.bind(this));

  return node;
};

/**
 * Binds all content model based events.
 *
 * @private
 * @param  {!AutoMan.collections.Content} content
 */
AutoMan.ui.Builder.prototype.bindContentEvents_ = function(content) {
  content.getEventTarget().addEventListener(content.Events.ContentAdded, this.handleContentAdd_.bind(this));
  content.getEventTarget().addEventListener(content.Events.ContentRemoved, this.handleContentRemove_.bind(this));
};

/**
 * Handles any added content nodes by rebuilding node.
 *
 * @private
 * @param  {!AutoMan.common.Event} event
 */
AutoMan.ui.Builder.prototype.handleContentAdd_ = function(event) {
  var target, child;

  target = event.target;

  child = event.getData().child;
  
  try {
    this.build_(child, this.factory_, this.contentMap_[child.getParent().getId()]);
  } catch (buildError) {
    this.dispatchEvent(new AutoMan.common.Event(this.Events.BuildError, this, {
      Error: buildError
    }));
  }
};

/**
 * Handles any removed content by disposing of the component.
 *
 * @private
 * @param  {!AutoMan.common.Event} event
 */
AutoMan.ui.Builder.prototype.handleContentRemove_ = function(event) {
  var target, component;

  target = event.target;

  component = this.contentMap_[target.getId()];
  
  if(!component) {
    return;
  }

  component.getParent().removeChild(component);

  delete(this.contentMap_[target.getId()]);
};

/**
 * Allows easier 'this' access to event Enum.
 *
 * @alias AutoMan.ui.Builder.Events
 */
AutoMan.ui.Builder.prototype.Events = AutoMan.ui.Builder.Events;