goog.provide('AutoMan.ui.components.Heading2');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Heading Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.Heading2 = function(options) {
  goog.base(this, options);
};

goog.object.extend(AutoMan.ui.components.Heading2, AutoMan.ui.components.AbstractComponent);

goog.inherits(AutoMan.ui.components.Heading2, AutoMan.ui.components.AbstractComponent);

AutoMan.ui.components.Heading2.supportedContent = function() {
  return 'h2';
};

AutoMan.ui.components.Heading2.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('Heading'));
};