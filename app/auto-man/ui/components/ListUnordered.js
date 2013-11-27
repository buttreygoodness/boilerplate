goog.provide('AutoMan.ui.components.ListUnordered');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * ListUnordered Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.ListUnordered = function(options) {
  goog.base(this, options);
};

goog.inherits(AutoMan.ui.components.ListUnordered, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'list-unordered'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.ListUnordered.supportedContent = function() {
  return 'list-unordered';
};

AutoMan.ui.components.ListUnordered.tag = function() {
  return 'ul';
};