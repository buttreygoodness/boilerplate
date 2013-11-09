goog.provide('AutoMan.ui.components.Page');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Heading Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.Page = function(options) {
  goog.base(this, options);
};

goog.object.extend(AutoMan.ui.components.Page, AutoMan.ui.components.AbstractComponent);

goog.inherits(AutoMan.ui.components.Page, AutoMan.ui.components.AbstractComponent);

AutoMan.ui.components.Page.supportedContent = function() {
  return 'page';
};

AutoMan.ui.components.Page.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('section'));
};
