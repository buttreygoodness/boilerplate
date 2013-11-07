goog.provide('AutoMan.ui.components.Paragraph');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Paragraph Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.Paragraph = function(options) {
  goog.base(this, options);
};

goog.object.extend(AutoMan.ui.components.Paragraph, AutoMan.ui.components.AbstractComponent);

goog.inherits(AutoMan.ui.components.Paragraph, AutoMan.ui.components.AbstractComponent);

AutoMan.ui.components.Paragraph.supportedContent = function() {
  return 'p';
};

AutoMan.ui.components.Paragraph.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('p'));
};