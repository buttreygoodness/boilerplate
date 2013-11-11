goog.provide('AutoMan.ui.components.Script');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Script Component
 * 
 * @param {!Object} options
 */
AutoMan.ui.components.Script = function(options) {
  goog.base(this, options);
};

goog.object.extend(AutoMan.ui.components.Script, AutoMan.ui.components.AbstractComponent);

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
AutoMan.ui.components.Script.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('script'));
};