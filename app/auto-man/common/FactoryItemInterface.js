goog.provide('AutoMan.common.FactoryItemInterface');

/**
 * All objects used in factories should implemenet this interface.
 * 
 * @interface
 */
AutoMan.common.FactoryItemInterface = function() {};

/**
 * Returns a unique distinguesher for an object.
 * 
 * @static
 * @return {!String}
 */
AutoMan.common.FactoryItemInterface.getItemId = function() {};