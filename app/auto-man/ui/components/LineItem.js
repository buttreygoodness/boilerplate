goog.provide('AutoMan.ui.components.LineItem');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * LineItem Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.LineItem = function(options) {
  goog.base(this, options);
};

goog.inherits(AutoMan.ui.components.LineItem, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'lineitem'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.LineItem.supportedContent = function() {
  return 'lineitem';
};

AutoMan.ui.components.LineItem.tag = function() {
  return 'li';
};