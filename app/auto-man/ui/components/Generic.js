goog.provide('AutoMan.ui.components.Generic');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Generic component. This will create a component as with tag of content type.
 *
 * @implements {AutoMan.ui.components.AbstractComponent}
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
 * @return {!String}
 */
AutoMan.ui.components.Generic.supportedContent = function() {
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