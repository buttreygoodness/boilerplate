goog.provide('AutoMan.ui.components.Script');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Script Component
 * 
 * @param {!Object} content
 */
AutoMan.ui.components.Script = function(content, domHelper) {
  goog.base(this, content, domHelper);
};

goog.inherits(AutoMan.ui.components.Script, AutoMan.ui.components.AbstractComponent);

/**
 * Returns 'Script'
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.Script.supportedContent = function() {
  return 'script';
};

/**
 * Defines the createDom method for this component.
 * 
 * @override
 */
AutoMan.ui.components.Script.type = function() {
  return 'script';
};