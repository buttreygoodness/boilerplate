goog.provide('AutoMan.ui.components.Anchor');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Anchor Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.Anchor = function(options) {
  goog.base(this, options);
};

goog.object.extend(AutoMan.ui.components.Anchor, AutoMan.ui.components.AbstractComponent);

goog.inherits(AutoMan.ui.components.Anchor, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'list-ordered'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Anchor.supportedContent = function() {
  return 'anchor';
};

AutoMan.ui.components.Anchor.tag = function() {
  return 'a';
};