goog.provide('AutoMan.ui.components.Title');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Title Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.Title = function(options) {
  goog.base(this, options);
};

goog.object.extend(AutoMan.ui.components.Title, AutoMan.ui.components.AbstractComponent);

goog.inherits(AutoMan.ui.components.Title, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'title'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Title.supportedContent = function() {
  return 'title';
};

/**
 * Defines the createDom method for this component.
 * 
 * @override
 */
AutoMan.ui.components.Title.tag = function() {
  return 'h1';
};