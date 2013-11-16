goog.provide('AutoMan.ui.components.Div');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Div Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.Div = function(options) {
  goog.base(this, options);
};

goog.object.extend(AutoMan.ui.components.Div, AutoMan.ui.components.AbstractComponent);

goog.inherits(AutoMan.ui.components.Div, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'div'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Div.supportedContent = function() {
  return 'div';
};

AutoMan.ui.components.Div.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('div'));
};