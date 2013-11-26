goog.provide('AutoMan.ui.components.ListOrdered');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * ListOrdered Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.ListOrdered = function(options) {
  goog.base(this, options);
};

goog.inherits(AutoMan.ui.components.ListOrdered, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'list-ordered'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.ListOrdered.supportedContent = function() {
  return 'list-ordered';
};

AutoMan.ui.components.ListOrdered.tag = function() {
  return 'ol';
};