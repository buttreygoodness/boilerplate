goog.provide('AutoMan.ui.components.Generic');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * @class Generic component. Handles all dom elelments that are not explicitly defined.
 * 
 * @augments {AutoMan.ui.components.AbstractComponent}
 * 
 * @param {!AutoMan.collections.Content} content
 * @param {?goog.dom.DomHelper} domHelper
 */
AutoMan.ui.components.Generic = function(content, domHelper) {
  goog.base(this, content, domHelper);
};

goog.inherits(AutoMan.ui.components.Generic, AutoMan.ui.components.AbstractComponent);

/**
 * Supports all content types.
 *
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Generic.supportedContent = function() {
  return '*';
};

/**
 * Supports all tag types.
 *
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Generic.tag = function() {
  return '*';
};

/**
 * Determines tag by content type.
 * 
 * @return {!String}
 */
AutoMan.ui.components.Generic.prototype.tag = function() {
  return this.getModel().getType();
};