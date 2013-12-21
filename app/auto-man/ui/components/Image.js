goog.provide('AutoMan.ui.components.Image');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * @class Image
 *
 * @augments {AutoMan.ui.components.AbstractComponent}
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

/**
 * Returns 'Image'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Image.tag = function() {
  return 'img';
};

/**
 * Nops out decorate internal content since images dont support inner nodes.
 *
 * @protected
 */
AutoMan.ui.components.Image.prototype.decorateInternalContent_ = function() {};