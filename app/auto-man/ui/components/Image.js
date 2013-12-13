goog.provide('AutoMan.ui.components.Image');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Image Component
 * 
 * @param {!Object} content
 */
AutoMan.ui.components.Image = function(content, domHelper) {
  goog.base(this, content, domHelper);
};

goog.inherits(AutoMan.ui.components.Image, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'image'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Image.supportedContent = function() {
  return 'image';
};

AutoMan.ui.components.Image.tag = function() {
  return 'img';
};

AutoMan.ui.components.Image.prototype.decorateInternalContent_ = function() {};