goog.provide('AutoMan.ui.components.Image');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Image Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.Image = function(options) {
  goog.base(this, options);
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