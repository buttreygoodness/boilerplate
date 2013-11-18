goog.provide('AutoMan.ui.components.Root');

goog.require('AutoMan.ui.components.AbstractComponent');

/**
 * Root component that does nothing but acts like a container for other components.
 * 
 * @param {?Object} options
 * @param {?goog.dom.DomHelper} domHelper
 */
AutoMan.ui.components.Root = function(options, domHelper) {
	goog.base(this, domHelper);
};

goog.object.extend(AutoMan.ui.components.Root, AutoMan.ui.components.AbstractComponent);

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

AutoMan.ui.components.Root.tag = function() {
	return 'div';
};