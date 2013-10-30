goog.provide('AutoMan.ui.components.AbstractComponent');

goog.require('goog.ui.Component');

/**
 * Abstract Component that all components must implement.
 * 
 * @param {?Object} options
 * @param {?goog.dom.DomHelper} domHelper
 */
AutoMan.ui.components.AbstractComponent = function(options, domHelper) {
	goog.base(this, domHelper);
};

goog.inherits(AutoMan.ui.components.AbstractComponent, goog.ui.Component);

/**
 * Determines what content type is supported by this component.
 * 
 * @static
 * @return {!String}
 */
AutoMan.ui.components.AbstractComponent.supportedContent = goog.abstractMethod;