goog.provide('AutoMan.ui.components.ListUnordered');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Heading Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.ListUnordered = function(options) {
  goog.base(this, options);
};

goog.object.extend(AutoMan.ui.components.ListUnordered, AutoMan.ui.components.AbstractComponent);

goog.inherits(AutoMan.ui.components.ListUnordered, AutoMan.ui.components.AbstractComponent);

AutoMan.ui.components.ListUnordered.supportedContent = function() {
  return 'list-unordered';
};

AutoMan.ui.components.ListUnordered.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('p'));
};