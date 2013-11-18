goog.provide('AutoMan.ui.components.Heading2');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Heading2 Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.Heading2 = function(options) {
  goog.base(this, options);
};

goog.object.extend(AutoMan.ui.components.Heading2, AutoMan.ui.components.AbstractComponent);

goog.inherits(AutoMan.ui.components.Heading2, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'heading2'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Heading2.supportedContent = function() {
  return 'heading2';
};

AutoMan.ui.components.Heading2.tag = function() {
  return 'h3';
};