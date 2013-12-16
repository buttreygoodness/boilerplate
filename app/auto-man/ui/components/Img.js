goog.provide('AutoMan.ui.components.Img');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * @class Image
 *
 * @augments {AutoMan.ui.components.AbstractComponent}
 * 
 * @param {!Object} content
 */
AutoMan.ui.components.Img = function(content, domHelper) {
  goog.base(this, content, domHelper);
};

goog.inherits(AutoMan.ui.components.Img, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'image'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Img.supportedContent = function() {
  return 'img';
};

/**
 * Returns 'img'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Img.tag = function() {
  return 'img';
};

/**
 * Nops out decorate internal content.
 *
 * @protected
 */
AutoMan.ui.components.Img.prototype.decorateInternalContent_ = function() {};