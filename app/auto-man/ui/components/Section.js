goog.provide('AutoMan.ui.components.Section');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Section Component
 * 
 * @param {?Object} options
 */ 
AutoMan.ui.components.Section = function(options) {
  goog.base(this, options);
};

goog.inherits(AutoMan.ui.components.Section, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'section'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Section.supportedContent = function() {
  return 'section';
};

AutoMan.ui.components.Section.tag = function() {
  return 'section';
};