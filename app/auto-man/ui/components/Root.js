goog.provide('AutoMan.ui.components.Root');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * @class Container for all contenet.
 * 
 * @extends {AutoMan.ui.components.AbstractComponent}
 * 
 * @param {?Object} content
 * @param {?goog.dom.DomHelper} domHelper
 */
AutoMan.ui.components.Root = function(content, domHelper) {
  goog.base(this, content, domHelper);
};

goog.inherits(AutoMan.ui.components.Root, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'root'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Root.supportedContent = function() {
  return 'root';
};

/**
 * Returns 'div'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Root.tag = function() {
  return 'div';
};