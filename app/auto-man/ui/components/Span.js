goog.provide('AutoMan.ui.components.Span');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Span Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.Span = function(options) {
  goog.base(this, options);
};

goog.object.extend(AutoMan.ui.components.Span, AutoMan.ui.components.AbstractComponent);

goog.inherits(AutoMan.ui.components.Span, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'span'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Span.supportedContent = function() {
  return 'span';
};

AutoMan.ui.components.Span.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('span'));
};