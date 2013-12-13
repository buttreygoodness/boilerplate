goog.provide('AutoMan.ui.components.Img');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Image Component
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

AutoMan.ui.components.Img.tag = function() {
  return 'img';
};

AutoMan.ui.components.Img.prototype.decorateInternalContent_ = function() {};