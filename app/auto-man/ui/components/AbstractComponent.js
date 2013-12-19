goog.provide('AutoMan.ui.components.AbstractComponent');

goog.require('goog.ui.Control');

goog.require('AutoMan.collections.Content');

/**
 * @class Base ui component.
 * 
 * @extends {goog.ui.Control}
 * 
 * @param {!AutoMan.collections.Content} content
 * @param {?goog.dom.DomHelper} domHelper
 */
AutoMan.ui.components.AbstractComponent = function(content, domHelper) {
  goog.base(this, domHelper);

  this.setModel(content);
};

goog.inherits(AutoMan.ui.components.AbstractComponent, goog.ui.Control);

/**
 * Determines what content type is supported by this component.
 * 
 * @static
 * @abstract
 * @return {!String}
 */
AutoMan.ui.components.AbstractComponent.supportedContent = goog.abstractMethod;

/**
 * Determines tag supported by this element.
 *
 * @static
 * @abstract
 * @type {!String}
 */
AutoMan.ui.components.AbstractComponent.tag = goog.abstractMethod;

/**
 * Unbinds events and model bindings.
 */
AutoMan.ui.components.AbstractComponent.prototype.disposeInternal = function() {
  this.removeAllListeners();

  goog.base(this, 'disposeInternal');
};

/**
 * Returns supported content type. Should be same as static.
 *
 * @return {!String}
 */
AutoMan.ui.components.AbstractComponent.prototype.supportedContent = function() {
  return this.constructor.supportedContent();
};

/**
 * Returns element tag type that will be decorated.
 *
 * @override
 * @type {!String}
 */
AutoMan.ui.components.AbstractComponent.prototype.tag = function() {
  return this.constructor.tag();
};

/**
 * Creates dom element of type {this.tag}
 *
 * @override
 */
AutoMan.ui.components.AbstractComponent.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement(this.tag()));
};

/**
 * Sets internal states of element.
 * 
 * @override
 */
AutoMan.ui.components.AbstractComponent.prototype.decorateInternal = function(element) {
  element.dataset.idKey = this.model_.key_;
  this.setElementInternal(element);

  this.decorateInternal_();
};

/**
 * Decorates self based of model.
 *
 * @protected
 */
AutoMan.ui.components.AbstractComponent.prototype.decorateInternal_ = function() {
  this.decorateInternalContent_();

  this.decorateInternalClasses_();

  this.decorateInternalAttributes_();

  this.decorateInternalStyles_();
};

/**
 * Decorates content.
 *
 * @protected
 */
AutoMan.ui.components.AbstractComponent.prototype.decorateInternalContent_ = function() {
  this.getElement().textContent = this.getModel().getData().text || '';
};

/**
 * Decoractes a elemenets classes.
 *
 * @protected
 */
AutoMan.ui.components.AbstractComponent.prototype.decorateInternalClasses_ = function() {
  var classes = this.getModel().getData().classes || [];

  goog.array.forEach(classes, goog.bind(function(class_) {
    this.getElement().classList.add(class_);
  }, this));
};

/**
 * Decorates internal attributes of element.
 * 
 * @protected
 */
AutoMan.ui.components.AbstractComponent.prototype.decorateInternalAttributes_ = function() {
  var attributes = this.getModel().getData().attributes || {};

  goog.object.forEach(attributes, goog.bind(function(value, key) {
    this.getElement().setAttribute(key, value);
  }, this));
};

/**
 * Decoractes inline styles of element.
 *
 * @protected
 */
AutoMan.ui.components.AbstractComponent.prototype.decorateInternalStyles_ = function() {
  var styles = this.getModel().getData().styles || {};

  goog.object.forEach(styles, goog.bind(function(value, key) {
    this.getElement().style.setProperty(key, value);
  }, this));
};

/**
 * Destorys any decorations.
 *
 * @protected
 */
AutoMan.ui.components.AbstractComponent.prototype.destroyInternal_ = function() {
  if(!this.isInDocument()) {
    return;
  }

  var attributes = this.getElement().attributes;

  goog.array.forEach(attributes, function(attribute) {
    this.getElement().removeAttribute(attribute);
  }.bind(this));
};

/**
 * Sets model and binds change events to self.
 *
 * @param {!AutoMan.collections.Content} model
 */
AutoMan.ui.components.AbstractComponent.prototype.setModel = function(model) {
  goog.base(this, 'setModel', model);

  this.getModel().getEventTarget().addEventListener(AutoMan.collections.Content.Events.ContentChange, this.handleModelChange_.bind(this));
};

/**
 * Handles any model updates and by redorating self.
 *
 * @protected
 */
AutoMan.ui.components.AbstractComponent.prototype.handleModelChange_ = function() {
  this.destroyInternal_();

  this.decorateInternal_();
};