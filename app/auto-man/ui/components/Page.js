goog.provide('AutoMan.ui.components.Page');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Page Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.Page = function(options) {
  goog.base(this, options);
};

goog.inherits(AutoMan.ui.components.Page, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'page'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Page.supportedContent = function() {
  return 'page';
};

AutoMan.ui.components.Page.tag = function() {
  return 'section';
};
