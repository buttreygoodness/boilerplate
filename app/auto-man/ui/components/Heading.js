goog.provide('AutoMan.ui.components.Heading');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Heading Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.Heading = function(options) {
  goog.base(this, options);
};

goog.object.extend(AutoMan.ui.components.Heading, AutoMan.ui.components.AbstractComponent);

goog.inherits(AutoMan.ui.components.Heading, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'heading'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Heading.supportedContent = function() {
  return 'heading';
};

AutoMan.ui.components.Heading.tag = function() {
  return 'h2';
};