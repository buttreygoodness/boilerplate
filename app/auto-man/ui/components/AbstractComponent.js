goog.provide('AutoMan.ui.components.AbstractComponent');

goog.require('goog.ui.Control');

/**
 * Abstract Component that all components must implement.
 * 
 * @param {?Object} options
 * @param {?goog.dom.DomHelper} domHelper
 */
AutoMan.ui.components.AbstractComponent = function(options, domHelper) {
  goog.base(this, domHelper);

  this.options_ = options.data || {};

  this.content_ = this.options_ || "";

  this.classes_ = this.options_.classes || [];

  this.attributes_ = this.options_.attributes || {};

  this.style_ = this.options_.styles || {};

  this.setAutoStates(255, false);
};

goog.inherits(AutoMan.ui.components.AbstractComponent, goog.ui.Control);

/**
 * Determines what content type is supported by this component.
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.AbstractComponent.supportedContent = goog.abstractMethod;

/**
 * Sets internal states of element.
 * 
 * @override
 */
AutoMan.ui.components.AbstractComponent.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
  
  this.decorateInternalContent_();

  this.decorateInternalClasses_();

  this.decorateInternalAttributes_();

  this.decorateInternalStyles_();
};

/**
 * Decorates content.
 *
 * @private
 */
AutoMan.ui.components.AbstractComponent.prototype.decorateInternalContent_ = function() {
  this.getElement().innerText = this.content_.text || '';
};

/**
 * Decoractes a elemenets classes.
 *
 * @private
 */
AutoMan.ui.components.AbstractComponent.prototype.decorateInternalClasses_ = function() {
  goog.array.forEach(this.classes_, goog.bind(function(class_) {
    this.getElement().classList.add(class_);
  }, this));
};

/**
 * Decorates internal attributes of element.
 * 
 * @private
 */
AutoMan.ui.components.AbstractComponent.prototype.decorateInternalAttributes_ = function() {
  goog.object.forEach(this.attributes_, goog.bind(function(value, key) {
    this.getElement().setAttribute(key, value);
  }, this));
};

/**
 * Decoractes inline styles of element.
 *
 * @private
 */
AutoMan.ui.components.AbstractComponent.prototype.decorateInternalStyles_ = function() {
  goog.object.forEach(this.style_, goog.bind(function(value, key) {
    this.getElement().style.setProperty(key, value);
  }, this));
};