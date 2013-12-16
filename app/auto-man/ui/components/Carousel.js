goog.provide('AutoMan.ui.components.Carousel');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * @class Carousel component.
 *
 * @augments {AutoMan.ui.components.AbstractComponent}
 * 
 * @param {!Object} content
 */
AutoMan.ui.components.Carousel = function(content, domHelper) {
  goog.base(this, content, domHelper);
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

/**
 * Returns 'div'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Carousel.tag = function() {
  return 'div';
};

/**
 * Handles document viewable.
 */
AutoMan.ui.components.Carousel.prototype.enterDocument = function() {
  $(this.element_)['carousel']();
};