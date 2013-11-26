goog.provide('AutoMan.ui.components.Carousel');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Carousel Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.Carousel = function(options) {
  goog.base(this, options);
};

goog.inherits(AutoMan.ui.components.Carousel, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'carousel'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Carousel.supportedContent = function() {
  return 'carousel';
};

AutoMan.ui.components.Carousel.tag = function() {
  return "div";
};

AutoMan.ui.components.Carousel.prototype.enterDocument = function() {
  $(this.element_)['carousel']();
};